# PostersReady - PHP Backend for Razorpay Integration

## Folder Structure for Shared Hosting

```
/home/username/
├── config/                      # OUTSIDE public_html - NOT web accessible
│   ├── env.php                  # All secrets stored here
│   └── .htaccess                # Extra protection - deny all
│
├── public_html/                 # Web accessible root
│   ├── api/
│   │   ├── create-order.php    # Creates Razorpay order
│   │   ├── verify-payment.php  # Verifies payment signature
│   │   └── db.php              # Database connection helper
│   │
│   ├── index.php               # Main entry (redirects to React app)
│   └── react-build/            # React production build files
│       ├── index.html
│       └── assets/
│
└── vendor/                      # Composer dependencies (Razorpay SDK)
    └── razorpay/
```

## Setup Instructions

### 1. Install Razorpay SDK via Composer

```bash
# In your hosting SSH or local machine
cd /home/username
composer require razorpay/razorpay
```

### 2. Upload Files

1. Copy `config/` folder to `/home/username/config/`
2. Copy `public_html/api/` folder to `/home/username/public_html/api/`
3. Update `env.php` with your actual credentials

### 3. Create Database Table

Run the SQL in `database/schema.sql` in your MySQL database.

### 4. Configure CORS

Update the allowed origins in the API files to match your domain.

### 5. Test the Integration

1. Test create-order endpoint: POST to `/api/create-order.php`
2. Complete a test payment using Razorpay test mode
3. Verify the payment is recorded in database

## Security Notes

- NEVER commit `env.php` with real credentials to git
- The `config/` folder MUST be outside `public_html`
- All API responses use proper HTTP status codes
- Payment verification happens on backend only

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/create-order.php` | POST | Creates Razorpay order |
| `/api/verify-payment.php` | POST | Verifies payment signature |

## Test Credentials

Use Razorpay test mode credentials for development.
See: https://razorpay.com/docs/payments/dashboard/account-settings/test-mode/
