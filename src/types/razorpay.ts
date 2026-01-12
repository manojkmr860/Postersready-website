/**
 * =====================================================
 * RAZORPAY TYPE DEFINITIONS
 * =====================================================
 * 
 * TypeScript types for Razorpay Checkout integration.
 * These types ensure type safety when working with
 * Razorpay's JavaScript SDK.
 */

// Razorpay Checkout options
export interface RazorpayOptions {
  key: string;                    // Razorpay Key ID (public)
  amount: number;                 // Amount in smallest currency unit (paise)
  currency: string;               // Currency code (INR, USD, etc.)
  name: string;                   // Business name displayed in checkout
  description?: string;           // Payment description
  image?: string;                 // Logo URL
  order_id: string;               // Razorpay order ID from backend
  handler: (response: RazorpayPaymentResponse) => void;  // Success callback
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
    backdrop_color?: string;
  };
  modal?: {
    ondismiss?: () => void;       // Called when user closes modal
    escape?: boolean;             // Allow closing with ESC key
    animation?: boolean;
    confirm_close?: boolean;      // Show confirmation on close
  };
}

// Response from Razorpay after successful payment
export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Razorpay Checkout instance
export interface RazorpayCheckout {
  open: () => void;
  close: () => void;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
}

// Razorpay constructor
export interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayCheckout;
}

// Global Razorpay object
declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}

// API response types
export interface CreateOrderRequest {
  plan_id: 'starter' | 'visionary' | 'enterprise';
  name: string;
  email: string;
  phone?: string;
}

/**
 * Response from create-order.php
 * 
 * Razorpay order response structure:
 * {
 *   "id": "order_IluGWxBm9U8zJ8",
 *   "entity": "order",
 *   "amount": 50000,
 *   "amount_paid": 0,
 *   "amount_due": 50000,
 *   "currency": "INR",
 *   "receipt": "rcptid_11",
 *   "offer_id": null,
 *   "status": "created",
 *   "attempts": 0,
 *   "notes": [],
 *   "created_at": 1642662092
 * }
 */
export interface CreateOrderResponse {
  success: boolean;
  
  // Razorpay order details
  order_id?: string;           // e.g., "order_IluGWxBm9U8zJ8"
  key_id?: string;             // Public key (rzp_test_xxx or rzp_live_xxx)
  amount?: number;             // Amount in paise (e.g., 50000 = ₹500)
  amount_due?: number;         // Amount due in paise
  currency?: string;           // Currency code (INR, USD, etc.)
  receipt?: string;            // Receipt ID
  status?: string;             // Order status ("created")
  
  // Display info
  name?: string;               // Business name
  description?: string;        // Plan description
  
  // Prefill customer details
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  
  // Theme customization
  theme?: {
    color?: string;
  };
  
  // Error (if success is false)
  error?: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message?: string;
  payment_id?: string;
  order_id?: string;
  redirect_url?: string;
  error?: string;
}

// Plan types
export type PlanId = 'starter' | 'visionary' | 'enterprise';

export interface PricingPlan {
  id: PlanId;
  name: string;
  price: number;           // Display price in dollars
  priceINR: number;        // Amount in paise for Razorpay
  description: string;
  features: string[];
  popular?: boolean;
  enterprise?: boolean;
}
