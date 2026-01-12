<?php
/**
 * =====================================================
 * CREATE RAZORPAY ORDER ENDPOINT
 * =====================================================
 * 
 * This endpoint creates a Razorpay order for payment.
 * 
 * Flow:
 * 1. Receive plan selection and user info from frontend
 * 2. Validate the request
 * 3. Create Razorpay order via SDK
 * 4. Store order in database
 * 5. Return order_id and key_id to frontend
 * 
 * Location: /home/username/public_html/api/create-order.php
 * 
 * Method: POST
 * Content-Type: application/json
 * 
 * Request Body:
 * {
 *   "plan_id": "starter" | "visionary",
 *   "name": "Customer Name",
 *   "email": "customer@email.com",
 *   "phone": "9876543210" (optional)
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "order_id": "order_xxxxxxxxxx",
 *   "key_id": "rzp_xxxxx",
 *   "amount": 75900,
 *   "currency": "INR",
 *   "name": "PostersReady",
 *   "description": "Starter Business Plan"
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
$missing = validateRequired($input, ['plan_id', 'name', 'email']);

if ($missing !== null) {
    jsonResponse([
        'success' => false,
        'error'   => 'Missing required fields',
        'missing' => $missing
    ], 400);
}

// Sanitize and validate input
$planId = sanitizeString($input['plan_id']);
$name   = sanitizeString($input['name']);
$email  = sanitizeString($input['email']);
$phone  = isset($input['phone']) ? sanitizeString($input['phone']) : null;

// Validate email format
if (!isValidEmail($email)) {
    jsonResponse([
        'success' => false,
        'error'   => 'Invalid email address'
    ], 400);
}

// Get configuration
$config = getConfig();
$plans  = $config['plans'] ?? [];
$rzpConfig = $config['razorpay'];
$appConfig = $config['app'];

// Validate plan exists
if (!isset($plans[$planId])) {
    jsonResponse([
        'success' => false,
        'error'   => 'Invalid plan selected'
    ], 400);
}

$plan = $plans[$planId];

// Enterprise plan requires custom handling
if ($planId === 'enterprise') {
    jsonResponse([
        'success' => false,
        'error'   => 'Enterprise plan requires custom quote. Please contact sales.'
    ], 400);
}

// Ensure amount is valid
if ($plan['amount'] <= 0) {
    jsonResponse([
        'success' => false,
        'error'   => 'Invalid plan amount'
    ], 400);
}

try {
    // =========================================================
    // RAZORPAY ORDER CREATION
    // =========================================================
    // 
    // Initialize Razorpay API with credentials from config
    // API Reference: https://razorpay.com/docs/api/orders/
    //
    // $api = new Api($key_id, $secret);
    // $api->order->create(array(
    //     'receipt' => '123',
    //     'amount' => 50000,          // Amount in smallest currency unit (paise)
    //     'currency' => 'INR',
    //     'notes' => array('key1' => 'value1', 'key2' => 'value2')
    // ));
    //
    // Razorpay Response:
    // {
    //     "id": "order_IluGWxBm9U8zJ8",
    //     "entity": "order",
    //     "amount": 50000,
    //     "amount_paid": 0,
    //     "amount_due": 50000,
    //     "currency": "INR",
    //     "receipt": "rcptid_11",
    //     "offer_id": null,
    //     "status": "created",
    //     "attempts": 0,
    //     "notes": [],
    //     "created_at": 1642662092
    // }
    // =========================================================
    
    $api = new Api($rzpConfig['key_id'], $rzpConfig['key_secret']);
    
    // Generate unique receipt ID for this order
    $receiptId = generateReferenceId('RCPT');
    
    // Prepare order data for Razorpay
    // Amount must be in smallest currency unit (paise for INR, cents for USD)
    $orderData = array(
        'receipt'  => $receiptId,
        'amount'   => (int) $plan['amount'],  // Amount in paise (e.g., 50000 = ₹500)
        'currency' => $appConfig['currency'] ?? 'INR',
        'notes'    => array(
            'plan_id'        => $planId,
            'plan_name'      => $plan['name'],
            'customer_name'  => $name,
            'customer_email' => $email,
        ),
    );
    
    // Create order via Razorpay API
    $razorpayOrder = $api->order->create($orderData);
    
    // Razorpay returns order object with:
    // - id: "order_xxxxxxxxxx" (use this for checkout)
    // - amount: amount in paise
    // - amount_paid: 0 (initially)
    // - amount_due: same as amount (initially)
    // - status: "created"
    // - attempts: 0
    // - created_at: Unix timestamp
    
    // Get database connection
    $pdo = getDbConnection();
    
    // Store order in database
    $stmt = $pdo->prepare("
        INSERT INTO orders (
            order_id,
            receipt_id,
            plan_id,
            plan_name,
            amount,
            currency,
            customer_name,
            customer_email,
            customer_phone,
            status,
            created_at
        ) VALUES (
            :order_id,
            :receipt_id,
            :plan_id,
            :plan_name,
            :amount,
            :currency,
            :customer_name,
            :customer_email,
            :customer_phone,
            'created',
            NOW()
        )
    ");
    
    $stmt->execute([
        ':order_id'       => $razorpayOrder['id'],
        ':receipt_id'     => $receiptId,
        ':plan_id'        => $planId,
        ':plan_name'      => $plan['name'],
        ':amount'         => $plan['amount'],
        ':currency'       => $appConfig['currency'] ?? 'INR',
        ':customer_name'  => $name,
        ':customer_email' => $email,
        ':customer_phone' => $phone,
    ]);
    
    // =========================================================
    // RETURN SUCCESS RESPONSE TO FRONTEND
    // =========================================================
    // 
    // SECURITY: Only key_id (public) is sent to frontend
    // NEVER send key_secret to frontend!
    //
    // Frontend uses these values to open Razorpay Checkout:
    // const rzp = new Razorpay({
    //     key: response.key_id,
    //     amount: response.amount,
    //     currency: response.currency,
    //     order_id: response.order_id,
    //     ...
    // });
    // =========================================================
    
    jsonResponse([
        'success'     => true,
        
        // Razorpay order details
        'order_id'    => $razorpayOrder['id'],        // e.g., "order_IluGWxBm9U8zJ8"
        'key_id'      => $rzpConfig['key_id'],        // Public key only (rzp_test_xxx or rzp_live_xxx)
        'amount'      => (int) $razorpayOrder['amount'],  // Amount in paise
        'amount_due'  => (int) $razorpayOrder['amount_due'],
        'currency'    => $razorpayOrder['currency'],
        'receipt'     => $receiptId,
        'status'      => $razorpayOrder['status'],    // "created"
        
        // Display info for checkout
        'name'        => $appConfig['name'],          // Business name
        'description' => $plan['description'],        // Plan description
        
        // Prefill customer details in checkout
        'prefill'     => [
            'name'    => $name,
            'email'   => $email,
            'contact' => $phone,
        ],
        
        // Theme customization
        'theme'       => [
            'color' => '#042F1A',  // Your brand color
        ],
    ]);
    
} catch (Exception $e) {
    // Log the actual error for debugging
    error_log("PostersReady Create Order Error: " . $e->getMessage());
    
    // Return generic error to user
    jsonResponse([
        'success' => false,
        'error'   => 'Failed to create order. Please try again.'
    ], 500);
}
