<?php
/**
 * =====================================================
 * RAZORPAY WEBHOOK ENDPOINT
 * =====================================================
 * 
 * This endpoint handles Razorpay webhook events.
 * Webhooks are server-to-server notifications that
 * Razorpay sends when payment events occur.
 * 
 * IMPORTANT: Configure this URL in your Razorpay Dashboard:
 * Dashboard > Settings > Webhooks > Add New Webhook
 * URL: https://yourdomain.com/api/webhook.php
 * 
 * Events to subscribe:
 * - payment.captured
 * - payment.failed
 * - refund.created
 * - order.paid
 * 
 * Location: /home/username/public_html/api/webhook.php
 */

// Load dependencies
require_once __DIR__ . '/db.php';
require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Razorpay\Api\Api;

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

// Get raw POST data
$payload = file_get_contents('php://input');

if (empty($payload)) {
    http_response_code(400);
    exit('Empty payload');
}

// Get configuration
$config = getConfig();
$rzpConfig = $config['razorpay'];

// Get webhook signature from headers
$webhookSignature = $_SERVER['HTTP_X_RAZORPAY_SIGNATURE'] ?? '';

if (empty($webhookSignature)) {
    error_log("PostersReady Webhook: Missing signature header");
    http_response_code(400);
    exit('Missing signature');
}

// Verify webhook signature
// The webhook secret is set in Razorpay Dashboard when creating webhook
$webhookSecret = $rzpConfig['webhook_secret'] ?? $rzpConfig['key_secret'];

try {
    $api = new Api($rzpConfig['key_id'], $rzpConfig['key_secret']);
    
    // Verify signature
    $api->utility->verifyWebhookSignature($payload, $webhookSignature, $webhookSecret);
    
} catch (Exception $e) {
    error_log("PostersReady Webhook: Signature verification failed - " . $e->getMessage());
    http_response_code(400);
    exit('Invalid signature');
}

// Parse the webhook payload
$event = json_decode($payload, true);

if (!$event || !isset($event['event'])) {
    http_response_code(400);
    exit('Invalid payload');
}

$eventType = $event['event'];
$eventPayload = $event['payload'] ?? [];

// Log the event
error_log("PostersReady Webhook: Received event - $eventType");

try {
    $pdo = getDbConnection();
    
    // Handle different event types
    switch ($eventType) {
        
        // Payment was successfully captured
        case 'payment.captured':
            handlePaymentCaptured($pdo, $eventPayload);
            break;
            
        // Payment failed
        case 'payment.failed':
            handlePaymentFailed($pdo, $eventPayload);
            break;
            
        // Order was paid (alternative to payment.captured)
        case 'order.paid':
            handleOrderPaid($pdo, $eventPayload);
            break;
            
        // Refund was created
        case 'refund.created':
            handleRefundCreated($pdo, $eventPayload);
            break;
            
        default:
            // Log unhandled events for debugging
            error_log("PostersReady Webhook: Unhandled event type - $eventType");
    }
    
    // Log the webhook event
    logWebhookEvent($pdo, $eventType, $payload);
    
    // Return success
    http_response_code(200);
    echo json_encode(['status' => 'ok']);
    
} catch (Exception $e) {
    error_log("PostersReady Webhook Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Internal error']);
}

/**
 * Handle payment.captured event
 */
function handlePaymentCaptured(PDO $pdo, array $payload): void
{
    $payment = $payload['payment']['entity'] ?? [];
    
    if (empty($payment)) {
        return;
    }
    
    $paymentId = $payment['id'] ?? '';
    $orderId = $payment['order_id'] ?? '';
    $method = $payment['method'] ?? 'unknown';
    
    if (empty($orderId)) {
        return;
    }
    
    // Update order status
    $stmt = $pdo->prepare("
        UPDATE orders 
        SET 
            status = 'paid',
            payment_id = :payment_id,
            payment_method = :payment_method,
            paid_at = NOW(),
            updated_at = NOW()
        WHERE order_id = :order_id
        AND status != 'paid'
    ");
    
    $stmt->execute([
        ':payment_id' => $paymentId,
        ':payment_method' => $method,
        ':order_id' => $orderId,
    ]);
    
    error_log("PostersReady Webhook: Payment captured - Order $orderId, Payment $paymentId");
}

/**
 * Handle payment.failed event
 */
function handlePaymentFailed(PDO $pdo, array $payload): void
{
    $payment = $payload['payment']['entity'] ?? [];
    
    if (empty($payment)) {
        return;
    }
    
    $orderId = $payment['order_id'] ?? '';
    $errorCode = $payment['error_code'] ?? '';
    $errorDescription = $payment['error_description'] ?? 'Payment failed';
    
    if (empty($orderId)) {
        return;
    }
    
    // Update order status
    $stmt = $pdo->prepare("
        UPDATE orders 
        SET 
            status = 'failed',
            failure_reason = :reason,
            updated_at = NOW()
        WHERE order_id = :order_id
        AND status = 'created'
    ");
    
    $stmt->execute([
        ':reason' => "$errorCode: $errorDescription",
        ':order_id' => $orderId,
    ]);
    
    error_log("PostersReady Webhook: Payment failed - Order $orderId, Reason: $errorDescription");
}

/**
 * Handle order.paid event
 */
function handleOrderPaid(PDO $pdo, array $payload): void
{
    $order = $payload['order']['entity'] ?? [];
    $payment = $payload['payment']['entity'] ?? [];
    
    if (empty($order)) {
        return;
    }
    
    $orderId = $order['id'] ?? '';
    $paymentId = $payment['id'] ?? '';
    
    if (empty($orderId)) {
        return;
    }
    
    // Update order status (similar to payment.captured)
    $stmt = $pdo->prepare("
        UPDATE orders 
        SET 
            status = 'paid',
            payment_id = :payment_id,
            paid_at = NOW(),
            updated_at = NOW()
        WHERE order_id = :order_id
        AND status != 'paid'
    ");
    
    $stmt->execute([
        ':payment_id' => $paymentId,
        ':order_id' => $orderId,
    ]);
    
    error_log("PostersReady Webhook: Order paid - $orderId");
}

/**
 * Handle refund.created event
 */
function handleRefundCreated(PDO $pdo, array $payload): void
{
    $refund = $payload['refund']['entity'] ?? [];
    
    if (empty($refund)) {
        return;
    }
    
    $refundId = $refund['id'] ?? '';
    $paymentId = $refund['payment_id'] ?? '';
    $amount = $refund['amount'] ?? 0;
    
    if (empty($paymentId)) {
        return;
    }
    
    // Update order status to refunded
    $stmt = $pdo->prepare("
        UPDATE orders 
        SET 
            status = 'refunded',
            updated_at = NOW()
        WHERE payment_id = :payment_id
    ");
    
    $stmt->execute([':payment_id' => $paymentId]);
    
    // Also update subscription if exists
    $stmt = $pdo->prepare("
        UPDATE subscriptions 
        SET 
            status = 'cancelled',
            updated_at = NOW()
        WHERE payment_id = :payment_id
    ");
    
    $stmt->execute([':payment_id' => $paymentId]);
    
    error_log("PostersReady Webhook: Refund created - Refund $refundId, Payment $paymentId, Amount $amount");
}

/**
 * Log webhook event for debugging
 */
function logWebhookEvent(PDO $pdo, string $eventType, string $rawData): void
{
    try {
        // Check if payment_logs table exists
        $stmt = $pdo->prepare("
            SELECT COUNT(*) as count 
            FROM information_schema.tables 
            WHERE table_schema = DATABASE() 
            AND table_name = 'payment_logs'
        ");
        $stmt->execute();
        $result = $stmt->fetch();
        
        if ($result['count'] == 0) {
            return; // Table doesn't exist
        }
        
        $decoded = json_decode($rawData, true);
        $orderId = null;
        $paymentId = null;
        
        // Extract IDs from payload
        if (isset($decoded['payload']['payment']['entity'])) {
            $payment = $decoded['payload']['payment']['entity'];
            $paymentId = $payment['id'] ?? null;
            $orderId = $payment['order_id'] ?? null;
        }
        
        if (isset($decoded['payload']['order']['entity'])) {
            $order = $decoded['payload']['order']['entity'];
            $orderId = $order['id'] ?? $orderId;
        }
        
        $stmt = $pdo->prepare("
            INSERT INTO payment_logs (
                order_id,
                payment_id,
                event_type,
                raw_data,
                ip_address,
                created_at
            ) VALUES (
                :order_id,
                :payment_id,
                :event_type,
                :raw_data,
                :ip_address,
                NOW()
            )
        ");
        
        $stmt->execute([
            ':order_id' => $orderId,
            ':payment_id' => $paymentId,
            ':event_type' => $eventType,
            ':raw_data' => $rawData,
            ':ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
        ]);
        
    } catch (Exception $e) {
        // Don't fail the webhook if logging fails
        error_log("PostersReady Webhook Log Error: " . $e->getMessage());
    }
}
