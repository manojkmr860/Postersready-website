# Deployment Guide for PostersReady Payment System

## Overview

This guide covers deploying the Razorpay payment integration to shared hosting (Hostinger, GoDaddy, Bluehost, etc.).

---

## Pre-Deployment Checklist

- [ ] Razorpay account created
- [ ] Razorpay API keys obtained (test mode first)
- [ ] MySQL database created on hosting
- [ ] SSH/FTP access to hosting
- [ ] SSL certificate installed (HTTPS required for payments)

---

## Step 1: Prepare Your Hosting

### 1.1 Create MySQL Database

1. Log into your hosting control panel (cPanel, hPanel, etc.)
2. Go to **MySQL Databases**
3. Create a new database (e.g., `postersready_db`)
4. Create a database user with a strong password
5. Add the user to the database with **ALL PRIVILEGES**
6. Note down:
   - Database name
   - Username
   - Password
   - Host (usually `localhost`)

### 1.2 Run Database Schema

1. Go to **phpMyAdmin** in your control panel
2. Select your database
3. Click **Import** or **SQL**
4. Paste the contents of `database/schema.sql`
5. Click **Go** to execute

---

## Step 2: Upload Backend Files

### 2.1 File Structure on Server

```
/home/username/
├── config/                    <- OUTSIDE public_html
│   ├── env.php
│   └── .htaccess
│
├── public_html/
│   ├── api/
│   │   ├── create-order.php
│   │   ├── verify-payment.php
│   │   ├── webhook.php
│   │   ├── db.php
│   │   └── .htaccess
│   │
│   ├── index.php
│   └── react-build/           <- Your React build
│
└── vendor/                    <- Composer packages
```

### 2.2 Upload Steps

**Option A: Using SSH**

```bash
# Connect to your server
ssh username@yourdomain.com

# Navigate to home directory
cd ~

# Create config directory (IMPORTANT: outside public_html)
mkdir -p config

# Upload files via SCP from your local machine:
# scp -r backend/config/* username@yourdomain.com:~/config/
# scp -r backend/public_html/api/* username@yourdomain.com:~/public_html/api/
```

**Option B: Using FTP/File Manager**

1. Connect to your hosting via FTP or use File Manager
2. Navigate to `/home/username/` (one level above public_html)
3. Create `config` folder
4. Upload `env.php` and `.htaccess` to `config/`
5. Navigate to `/home/username/public_html/`
6. Create `api` folder
7. Upload all API PHP files to `api/`

---

## Step 3: Install Razorpay SDK

### 3.1 Via SSH (Recommended)

```bash
# Navigate to home directory
cd ~

# Install Composer if not available
curl -sS https://getcomposer.org/installer | php

# Install Razorpay SDK
php composer.phar require razorpay/razorpay

# This creates vendor/ folder with the SDK
```

### 3.2 Via Manual Upload

If SSH is not available:

1. On your local machine, run:
   ```bash
   cd backend
   composer install
   ```
2. Upload the entire `vendor/` folder to `/home/username/vendor/`

---

## Step 4: Configure Environment

### 4.1 Edit config/env.php

Update with your actual credentials:

```php
return [
    'db' => [
        'host'     => 'localhost',
        'name'     => 'your_actual_db_name',
        'username' => 'your_actual_db_user',
        'password' => 'your_actual_db_password',
        'charset'  => 'utf8mb4',
    ],
    'razorpay' => [
        'key_id'     => 'rzp_live_xxxxxxxxxx',  // Live key
        'key_secret' => 'xxxxxxxxxxxxxxxxxx',   // Live secret
    ],
    'app' => [
        'name'         => 'PostersReady',
        'environment'  => 'production',
        'debug'        => false,
        'currency'     => 'INR',
        'allowed_origins' => [
            'https://postersready.com',
            'https://www.postersready.com',
        ],
    ],
    // ... rest of config
];
```

### 4.2 Verify Config Security

1. Try accessing `https://yourdomain.com/../config/env.php`
2. You should get a 403 Forbidden error
3. If accessible, check your folder structure!

---

## Step 5: Deploy React Frontend

### 5.1 Build React App

```bash
# In your local project
cd /path/to/Postersready-website

# Create .env.local with production URL
echo "VITE_API_URL=https://yourdomain.com/api" > .env.local

# Build
npm run build
```

### 5.2 Upload Build

1. Upload contents of `dist/` to `public_html/react-build/`
2. Or upload directly to `public_html/` if React is the main site

### 5.3 Configure .htaccess for React Router

If using React Router, add to `public_html/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # Don't rewrite files or directories
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d

    # Don't rewrite API calls
    RewriteCond %{REQUEST_URI} !^/api

    # Rewrite everything else to index.html
    RewriteRule ^ index.html [L]
</IfModule>
```

---

## Step 6: Configure Razorpay Webhooks

### 6.1 In Razorpay Dashboard

1. Go to **Settings > Webhooks**
2. Click **Add New Webhook**
3. URL: `https://yourdomain.com/api/webhook.php`
4. Secret: Generate and save (add to env.php as `webhook_secret`)
5. Select events:
   - `payment.captured`
   - `payment.failed`
   - `refund.created`
   - `order.paid`
6. Click **Create Webhook**

### 6.2 Update env.php

Add webhook secret:

```php
'razorpay' => [
    'key_id'         => 'rzp_live_xxx',
    'key_secret'     => 'xxx',
    'webhook_secret' => 'your_webhook_secret_here',
],
```

---

## Step 7: Test the Integration

### 7.1 Test Mode First

1. Use Razorpay test credentials initially
2. Make a test payment
3. Check database for order record
4. Verify webhook is receiving events

### 7.2 Test Cards (Razorpay Test Mode)

| Card Number | CVV | Expiry | Result |
|-------------|-----|--------|--------|
| 4111 1111 1111 1111 | Any | Any future | Success |
| 4000 0000 0000 0002 | Any | Any future | Decline |

### 7.3 Verify Payment Flow

1. Select a plan
2. Enter customer details
3. Complete payment
4. Check:
   - Order created in database
   - Payment verified
   - Status updated to 'paid'
   - Redirect to dashboard works

---

## Troubleshooting

### Error: "Failed to create order"

- Check database connection in env.php
- Verify Razorpay credentials
- Check PHP error logs

### Error: "Payment verification failed"

- Ensure key_secret is correct
- Check if signature is being sent correctly
- Review error logs

### CORS Errors

- Add your domain to `allowed_origins` in env.php
- Clear browser cache

### Webhook Not Receiving Events

- Verify webhook URL is correct
- Check webhook secret matches
- Review Razorpay webhook logs in dashboard

### 500 Internal Server Error

- Check PHP error logs
- Verify file permissions (644 for files, 755 for directories)
- Ensure vendor autoload path is correct

---

## Security Reminders

1. **NEVER expose key_secret** - It's only used server-side
2. **Always use HTTPS** - Required for payment pages
3. **Keep config outside public_html** - Not web accessible
4. **Regular backups** - Database and files
5. **Monitor logs** - For suspicious activity
6. **Update dependencies** - Keep Razorpay SDK updated

---

## Go Live Checklist

- [ ] Switch to Razorpay live keys
- [ ] Update allowed_origins to production domain only
- [ ] Set debug to false
- [ ] Test complete payment flow
- [ ] Configure webhook for live mode
- [ ] Remove test data from database
- [ ] Enable error logging (not display)

---

## Support

- Razorpay Docs: https://razorpay.com/docs/
- Razorpay Support: https://razorpay.com/support/
