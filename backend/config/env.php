<?php
/**
 * =====================================================
 * ENVIRONMENT CONFIGURATION
 * =====================================================
 * 
 * SECURITY WARNING:
 * - This file MUST be stored OUTSIDE public_html
 * - NEVER commit this file to version control with real credentials
 * - NEVER expose these values to frontend
 * 
 * Location on server: /home/username/config/env.php
 */

return [
    // Database Configuration
    'db' => [
        'host'     => 'localhost',           // Usually 'localhost' on shared hosting
        'name'     => 'your_database_name',  // Your MySQL database name
        'username' => 'your_db_username',    // Your MySQL username
        'password' => 'your_db_password',    // Your MySQL password
        'charset'  => 'utf8mb4',             // Character encoding
    ],

    // Razorpay Configuration
    'razorpay' => [
        'key_id'        => 'rzp_test_S2r9FLSCnrtz71',  // Your Razorpay Key ID
        'key_secret'    => 'kMH4MuEKCphKQ6uqY8ha6siR',   // Your Razorpay Key Secret (NEVER expose)
        'webhook_secret' => 'xxxxxxxxxxxxxxxxxx',  // Webhook secret (set in Razorpay Dashboard)
    ],

    // Application Configuration
    'app' => [
        'name'         => 'PostersReady',
        'environment'  => 'production',  // 'development' or 'production'
        'debug'        => false,         // Set to false in production
        'currency'     => 'INR',         // Default currency
        
        // Allowed origins for CORS (add your domains)
        'allowed_origins' => [
            'https://postersready.com',
            'https://www.postersready.com',
            'http://localhost:5173',  // Vite dev server (remove in production)
        ],
    ],

    // Pricing Plans (amounts in smallest currency unit - paise for INR)
    'plans' => [
        'starter' => [
            'name'        => 'Starter Business',
            'amount'      => 759,   // ₹759 in paise (approx $9)
            'description' => 'Perfect for solopreneurs - 5 posters/day',
        ],
        'visionary' => [
            'name'        => 'Visionary Business',
            'amount'      => 1799,  // ₹1,689 in paise (approx $20)
            'description' => 'Perfect for growing brands - 20 posters/day',
        ],
        'enterprise' => [
            'name'        => 'Enterprise',
            'amount'      => 0,       // Custom pricing
            'description' => 'Custom pricing for large businesses',
        ],
    ],
];
