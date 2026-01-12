<?php
/**
 * =====================================================
 * VERIFY RAZORPAY PAYMENT ENDPOINT
 * =====================================================
 * 
 * This endpoint verifies Razorpay payment signature.
 * 
 * SECURITY: This is the ONLY reliable way to confirm payment.
 * NEVER trust frontend success callbacks - always verify on backend.
 * 
 * Flow:
 * 1. Receive Razorpay payment response from frontend
 * 2. Verify signature using key_secret
 * 3. Update order status in database
 * 4. Return verification result
 * 
 * Location: /home/username/public_html/api/verify-payment.php
 * 
 * Method: POST
 * Content-Type: application/json
 * 
 * Request Body:
 * {
 *   "razorpay_order_id": "order_xxxxxxxxxx",
 *   "razorpay_payment_id": "pay_xxxxxxxxxx",
 *   "razorpay_signature": "xxxxxxxxxxxxxxxx"
 * }
 * 
 * Response (Success):
 * {
 *   "success": true,
 *   "message": "Payment verified successfully",
 *   "payment_id": "pay_xxxxxxxxxx",
 *   "redirect_url": "/dashboard"
 * }
 * 
 * Response (Failure):
 * {
 *   "success": false,
 *   "error": "Payment verification failed"
 * }
 */

// Load dependencies
require_once __DIR__ . '/db.php';
require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Razorpay\Api\Api;
use Razorpay\Api\Errors\SignatureVerificationError;

// Handle CORS
handleCors();

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse([
        'success' => false,
        'error'   => 'Method not allowed. Use POST.'
    ], 405);
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if ($input === null) {
    jsonResponse([
        'success' => false,
        'error'   => 'Invalid JSON input'
    ], 400);
}

// Validate required fields
$requiredFields = [
    'razorpay_order_id',
    'razorpay_payment_id',
    'razorpay_signature'
];

$missing = validateRequired($input, $requiredFields);

if ($missing !== null) {
    jsonResponse([
        'success' => false,
        'error'   => 'Missing required payment data',
        'missing' => $missing
    ], 400);
}

// Extract payment data
$orderId   = $input['razorpay_order_id'];
$paymentId = $input['razorpay_payment_id'];
$signature = $input['razorpay_signature'];

// Get configuration
$config = getConfig();
$rzpConfig = $config['razorpay'];

try {
    // Get database connection
    $pdo = getDbConnection();
    
    // First, check if order exists in our database
    $stmt = $pdo->prepare("
        SELECT id, order_id, status, amount, customer_email 
        FROM orders 
        WHERE order_id = :order_id
    ");
    $stmt->execute([':order_id' => $orderId]);
    $order = $stmt->fetch();
    
    if (!$order) {
        jsonResponse([
            'success' => false,
            'error'   => 'Order not found'
        ], 404);
    }
    
    // Check if already verified
    if ($order['status'] === 'paid') {
        jsonResponse([
            'success'      => true,
            'message'      => 'Payment already verified',
            'payment_id'   => $paymentId,
            'redirect_url' => '/dashboard'
        ]);
    }
    
    // =====================================================
    // SIGNATURE VERIFICATION - THE CRITICAL SECURITY STEP
    // =====================================================
    // 
    // Razorpay signature is generated using:
    // HMAC-SHA256(order_id + "|" + payment_id, key_secret)
    // 
    // We must verify this to ensure the payment is genuine
    // and not spoofed by a malicious actor.
    
    $api = new Api($rzpConfig['key_id'], $rzpConfig['key_secret']);
    
    // Prepare attributes for verification
    $attributes = [
        'razorpay_order_id'   => $orderId,
        'razorpay_payment_id' => $paymentId,
        'razorpay_signature'  => $signature,
    ];
    
    try {
        // This will throw an exception if signature is invalid
        $api->utility->verifyPaymentSignature($attributes);
        
        // Signature is valid - payment is genuine!
        
        // Fetch payment details from Razorpay for additional verification
        $payment = $api->payment->fetch($paymentId);
        
        // Update order status in database
        $stmt = $pdo->prepare("
            UPDATE orders 
            SET 
                status = 'paid',
                payment_id = :payment_id,
                payment_method = :payment_method,
                paid_at = NOW(),
                updated_at = NOW()
            WHERE order_id = :order_id
        ");
        
        $stmt->execute([
            ':payment_id'     => $paymentId,
            ':payment_method' => $payment['method'] ?? 'unknown',
            ':order_id'       => $orderId,
        ]);
        
        // Log successful payment
        error_log("PostersReady Payment Success: Order $orderId, Payment $paymentId");
        
        // Optional: Create user subscription record
        createSubscription($pdo, $order, $paymentId);
        
        // Return success response
        jsonResponse([
            'success'      => true,
            'message'      => 'Payment verified successfully',
            'payment_id'   => $paymentId,
            'order_id'     => $orderId,
            'redirect_url' => '/dashboard',
        ]);
        
    } catch (SignatureVerificationError $e) {
        // Signature verification failed - possible fraud attempt!
        
        // Log the failed attempt for security monitoring
        error_log("PostersReady SECURITY: Signature verification failed for Order $orderId. " . 
                  "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
        
        // Update order status to failed
        $stmt = $pdo->prepare("
            UPDATE orders 
            SET 
                status = 'failed',
                failure_reason = 'Signature verification failed',
                updated_at = NOW()
            WHERE order_id = :order_id
        ");
        $stmt->execute([':order_id' => $orderId]);
        
        jsonResponse([
            'success' => false,
            'error'   => 'Payment verification failed. Please contact support if amount was deducted.'
        ], 400);
    }
    
} catch (Exception $e) {
    // Log the error
    error_log("PostersReady Verify Payment Error: " . $e->getMessage());
    
    jsonResponse([
        'success' => false,
        'error'   => 'Payment verification error. Please contact support.'
    ], 500);
}

/**
 * Create subscription record after successful payment
 * 
 * @param PDO $pdo Database connection
 * @param array $order Order details
 * @param string $paymentId Razorpay payment ID
 */
function createSubscription(PDO $pdo, array $order, string $paymentId): void
{
    try {
        // Check if subscriptions table exists
        $stmt = $pdo->prepare("
            SELECT COUNT(*) as count 
            FROM information_schema.tables 
            WHERE table_schema = DATABASE() 
            AND table_name = 'subscriptions'
        ");
        $stmt->execute();
        $result = $stmt->fetch();
        
        if ($result['count'] == 0) {
            return; // Table doesn't exist, skip
        }
        
        // Calculate subscription end date (30 days from now)
        $startDate = date('Y-m-d H:i:s');
        $endDate = date('Y-m-d H:i:s', strtotime('+30 days'));
        
        $stmt = $pdo->prepare("
            INSERT INTO subscriptions (
                order_id,
                payment_id,
                customer_email,
                plan_id,
                status,
                starts_at,
                expires_at,
                created_at
            ) VALUES (
                :order_id,
                :payment_id,
                :customer_email,
                :plan_id,
                'active',
                :starts_at,
                :expires_at,
                NOW()
            )
        ");
        
        $stmt->execute([
            ':order_id'       => $order['order_id'],
            ':payment_id'     => $paymentId,
            ':customer_email' => $order['customer_email'],
            ':plan_id'        => $order['plan_id'] ?? 'unknown',
            ':starts_at'      => $startDate,
            ':expires_at'     => $endDate,
        ]);
        
    } catch (Exception $e) {
        // Log but don't fail the main transaction
        error_log("PostersReady Create Subscription Error: " . $e->getMessage());
    }
}
