/**
 * =====================================================
 * RAZORPAY PAYMENT HOOK
 * =====================================================
 * 
 * Custom React hook for handling Razorpay payments.
 * Manages the complete payment flow:
 * 1. Loading Razorpay SDK
 * 2. Creating order via backend
 * 3. Opening checkout modal
 * 4. Verifying payment via backend
 * 
 * SECURITY: No secrets are stored in this file.
 * All sensitive operations happen on the backend.
 */

import { useState, useCallback, useEffect } from 'react';
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
  RazorpayPaymentResponse,
  PlanId,
} from '../types/razorpay';

// API base URL - set VITE_API_URL in .env.local when backend is deployed
// Example: VITE_API_URL=https://yourdomain.com/api
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Check if backend API is configured
const isBackendConfigured = (): boolean => {
  return Boolean(API_BASE_URL && API_BASE_URL !== '' && !API_BASE_URL.includes('yourdomain.com'));
};

// Razorpay SDK script URL
const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

interface UseRazorpayReturn {
  isLoading: boolean;
  error: string | null;
  isScriptLoaded: boolean;
  initiatePayment: (
    planId: PlanId,
    customerInfo: { name: string; email: string; phone?: string }
  ) => Promise<void>;
  clearError: () => void;
}

export function useRazorpay(
  onSuccess?: (paymentId: string) => void,
  onFailure?: (error: string) => void
): UseRazorpayReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Load Razorpay SDK script
  useEffect(() => {
    // Check if already loaded
    if (window.Razorpay) {
      setIsScriptLoaded(true);
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector(
      `script[src="${RAZORPAY_SCRIPT_URL}"]`
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => setIsScriptLoaded(true));
      return;
    }

    // Create and load script
    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    
    script.onerror = () => {
      setError('Failed to load payment gateway. Please refresh the page.');
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup not needed as script should persist
    };
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Create order via backend
  const createOrder = async (
    request: CreateOrderRequest
  ): Promise<CreateOrderResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/create-order.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create order');
      }

      return data;
    } catch (err) {
      // Provide more helpful error messages
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        throw new Error(
          'Unable to connect to payment server. Please check your internet connection or try again later.'
        );
      }
      throw err;
    }
  };

  // Verify payment via backend
  const verifyPayment = async (
    request: VerifyPaymentRequest
  ): Promise<VerifyPaymentResponse> => {
    const response = await fetch(`${API_BASE_URL}/verify-payment.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Payment verification failed');
    }

    return data;
  };

  // Main payment initiation function
  const initiatePayment = useCallback(
    async (
      planId: PlanId,
      customerInfo: { name: string; email: string; phone?: string }
    ) => {
      // Validate inputs
      if (!planId) {
        setError('Please select a plan');
        return;
      }

      if (!customerInfo.name || !customerInfo.email) {
        setError('Name and email are required');
        return;
      }

      // =========================================================
      // FALLBACK: If backend API is not configured, use Razorpay Payment Link
      // =========================================================
      // 
      // When VITE_API_URL is not set, redirect to Razorpay Payment Link
      // This allows payments to work without deploying the PHP backend
      // =========================================================
      if (!isBackendConfigured()) {
        console.log('Backend API not configured. Redirecting to Razorpay Payment Link...');
        
        // Your Razorpay Payment Link URL
        // Get this from: Razorpay Dashboard > Payment Links > Create Link
        const RAZORPAY_PAYMENT_LINK = 'https://rzp.io/rzp/GnTwFXCo';
        
        // Build URL with prefilled customer details
        // Razorpay Payment Links support these prefill parameters
        const params = new URLSearchParams();
        if (customerInfo.name) params.set('name', customerInfo.name);
        if (customerInfo.email) params.set('email', customerInfo.email);
        if (customerInfo.phone) params.set('contact', customerInfo.phone);
        
        // Construct the full URL
        const fullUrl = params.toString() 
          ? `${RAZORPAY_PAYMENT_LINK}?${params.toString()}`
          : RAZORPAY_PAYMENT_LINK;
        
        console.log('Redirecting to:', fullUrl);
        
        // Use location.assign for cleaner redirect (allows back button)
        window.location.assign(fullUrl);
        return;
      }

      // Check if Razorpay is loaded
      if (!isScriptLoaded || !window.Razorpay) {
        setError('Payment gateway not loaded. Please refresh the page.');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Step 1: Create order via backend
        const orderData = await createOrder({
          plan_id: planId,
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
        });

        // =========================================================
        // Step 2: Open Razorpay Checkout
        // =========================================================
        // 
        // Razorpay Checkout Options:
        // const rzp = new Razorpay({
        //     key: "rzp_test_xxx",           // Key ID from backend
        //     amount: 50000,                  // Amount in paise
        //     currency: "INR",
        //     order_id: "order_IluGWxBm9U8zJ8",
        //     name: "PostersReady",
        //     description: "Starter Business Plan",
        //     prefill: { name, email, contact },
        //     theme: { color: "#042F1A" }
        // });
        // =========================================================
        
        const options = {
          key: orderData.key_id!,           // Public key from backend
          amount: orderData.amount!,         // Amount in paise
          currency: orderData.currency!,     // Currency (INR, USD, etc.)
          name: orderData.name!,             // Business name
          description: orderData.description!,
          order_id: orderData.order_id!,     // Razorpay order ID
          prefill: orderData.prefill,        // Pre-fill customer details
          theme: orderData.theme || {        // Use theme from backend or default
            color: '#042F1A',
          },
          modal: {
            ondismiss: () => {
              setIsLoading(false);
              // User closed the modal without completing payment
            },
            escape: true,
            confirm_close: true,
          },
          handler: async (response: RazorpayPaymentResponse) => {
            // Step 3: Verify payment via backend
            try {
              const verifyData = await verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              // Payment verified successfully
              setIsLoading(false);

              if (onSuccess) {
                onSuccess(response.razorpay_payment_id);
              }

              // Redirect to dashboard
              if (verifyData.redirect_url) {
                window.location.href = verifyData.redirect_url;
              }
            } catch (verifyError) {
              // Verification failed
              setIsLoading(false);
              const errorMessage =
                verifyError instanceof Error
                  ? verifyError.message
                  : 'Payment verification failed';
              setError(errorMessage);
              
              if (onFailure) {
                onFailure(errorMessage);
              }
            }
          },
        };

        const razorpay = new window.Razorpay(options);

        // Handle payment failures
        razorpay.on('payment.failed', (response: {
          error: { description: string; reason: string };
        }) => {
          setIsLoading(false);
          const errorMessage = response.error.description || 'Payment failed';
          setError(errorMessage);
          
          if (onFailure) {
            onFailure(errorMessage);
          }
        });

        razorpay.open();
      } catch (err) {
        setIsLoading(false);
        const errorMessage =
          err instanceof Error ? err.message : 'Payment initialization failed';
        setError(errorMessage);
        
        if (onFailure) {
          onFailure(errorMessage);
        }
      }
    },
    [isScriptLoaded, onSuccess, onFailure]
  );

  return {
    isLoading,
    error,
    isScriptLoaded,
    initiatePayment,
    clearError,
  };
}
