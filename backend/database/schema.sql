-- =====================================================
-- POSTERSREADY DATABASE SCHEMA
-- =====================================================
-- 
-- Run this SQL in your MySQL database to create
-- the required tables for the payment system.
-- 
-- Instructions:
-- 1. Log into your hosting control panel (cPanel, Plesk, etc.)
-- 2. Open phpMyAdmin or MySQL console
-- 3. Select your database
-- 4. Run this SQL script
-- =====================================================

-- Set character encoding
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- =====================================================
-- ORDERS TABLE
-- =====================================================
-- Stores all payment orders created via Razorpay

CREATE TABLE IF NOT EXISTS `orders` (
    -- Primary key
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    
    -- Razorpay order ID (e.g., order_xxxxxxxxxx)
    `order_id` VARCHAR(50) NOT NULL UNIQUE,
    
    -- Our internal receipt ID
    `receipt_id` VARCHAR(50) NOT NULL,
    
    -- Plan information
    `plan_id` VARCHAR(50) NOT NULL,
    `plan_name` VARCHAR(100) NOT NULL,
    
    -- Payment amount in smallest currency unit (paise for INR)
    `amount` INT UNSIGNED NOT NULL,
    `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
    
    -- Customer details
    `customer_name` VARCHAR(255) NOT NULL,
    `customer_email` VARCHAR(255) NOT NULL,
    `customer_phone` VARCHAR(20) NULL,
    
    -- Razorpay payment ID (filled after successful payment)
    `payment_id` VARCHAR(50) NULL,
    
    -- Payment method (card, upi, netbanking, etc.)
    `payment_method` VARCHAR(50) NULL,
    
    -- Order status: created, paid, failed, refunded
    `status` ENUM('created', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'created',
    
    -- Failure reason if payment failed
    `failure_reason` VARCHAR(500) NULL,
    
    -- Timestamps
    `created_at` DATETIME NOT NULL,
    `paid_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    
    -- Indexes for faster queries
    INDEX `idx_order_id` (`order_id`),
    INDEX `idx_status` (`status`),
    INDEX `idx_customer_email` (`customer_email`),
    INDEX `idx_created_at` (`created_at`)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- SUBSCRIPTIONS TABLE
-- =====================================================
-- Stores active subscriptions after successful payment

CREATE TABLE IF NOT EXISTS `subscriptions` (
    -- Primary key
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    
    -- Link to order
    `order_id` VARCHAR(50) NOT NULL,
    
    -- Razorpay payment ID
    `payment_id` VARCHAR(50) NOT NULL,
    
    -- Customer email (for quick lookup)
    `customer_email` VARCHAR(255) NOT NULL,
    
    -- Plan ID
    `plan_id` VARCHAR(50) NOT NULL,
    
    -- Subscription status: active, expired, cancelled
    `status` ENUM('active', 'expired', 'cancelled') NOT NULL DEFAULT 'active',
    
    -- Subscription period
    `starts_at` DATETIME NOT NULL,
    `expires_at` DATETIME NOT NULL,
    
    -- Timestamps
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NULL,
    
    -- Indexes
    INDEX `idx_customer_email` (`customer_email`),
    INDEX `idx_status` (`status`),
    INDEX `idx_expires_at` (`expires_at`),
    
    -- Foreign key constraint
    CONSTRAINT `fk_subscriptions_order` 
        FOREIGN KEY (`order_id`) 
        REFERENCES `orders`(`order_id`)
        ON DELETE CASCADE
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PAYMENT LOGS TABLE (Optional - for debugging)
-- =====================================================
-- Stores raw payment events for debugging and auditing

CREATE TABLE IF NOT EXISTS `payment_logs` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    
    `order_id` VARCHAR(50) NULL,
    `payment_id` VARCHAR(50) NULL,
    
    -- Event type: order_created, payment_attempted, payment_success, payment_failed
    `event_type` VARCHAR(50) NOT NULL,
    
    -- Raw JSON data from Razorpay
    `raw_data` TEXT NULL,
    
    -- Client IP address
    `ip_address` VARCHAR(45) NULL,
    
    `created_at` DATETIME NOT NULL,
    
    INDEX `idx_order_id` (`order_id`),
    INDEX `idx_event_type` (`event_type`)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- SAMPLE DATA (for testing - remove in production)
-- =====================================================
-- Uncomment to insert test data

-- INSERT INTO orders (order_id, receipt_id, plan_id, plan_name, amount, currency, customer_name, customer_email, status, created_at)
-- VALUES 
--   ('order_test123', 'RCPT_test123', 'starter', 'Starter Business', 75900, 'INR', 'Test User', 'test@example.com', 'created', NOW());

-- =====================================================
-- USEFUL QUERIES
-- =====================================================

-- Get all successful payments
-- SELECT * FROM orders WHERE status = 'paid' ORDER BY paid_at DESC;

-- Get active subscriptions
-- SELECT * FROM subscriptions WHERE status = 'active' AND expires_at > NOW();

-- Get revenue by plan
-- SELECT plan_id, plan_name, COUNT(*) as count, SUM(amount)/100 as total_revenue 
-- FROM orders WHERE status = 'paid' GROUP BY plan_id, plan_name;

-- Get daily revenue
-- SELECT DATE(paid_at) as date, COUNT(*) as transactions, SUM(amount)/100 as revenue 
-- FROM orders WHERE status = 'paid' GROUP BY DATE(paid_at) ORDER BY date DESC;
