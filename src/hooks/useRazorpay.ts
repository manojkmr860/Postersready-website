/**
 * =====================================================
 * RAZORPAY PAYMENT HOOK (Simplified)
 * =====================================================
 * 
 * Simple redirect to Razorpay Payment Link.
 * No SDK loading, no backend API calls - just redirects
 * to the payment page with prefilled customer details.
 */

import { useState, useCallback } from 'react';

// Razorpay Payment Link URL
const RAZORPAY_PAYMENT_LINK = 'https://rzp.io/rzp/AI8bz5e';

export type PlanId = 'starter' | 'visionary' | 'enterprise';

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
  _onSuccess?: (paymentId: string) => void,
  onFailure?: (error: string) => void
): UseRazorpayReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Main payment initiation function - just redirects to Payment Link
  const initiatePayment = useCallback(
    async (
      _planId: PlanId,
      customerInfo: { name: string; email: string; phone?: string }
    ) => {
      // Validate inputs
      if (!customerInfo.name || !customerInfo.email) {
        setError('Name and email are required');
        if (onFailure) {
          onFailure('Name and email are required');
        }
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Build URL with prefilled customer details
        const params = new URLSearchParams();
        if (customerInfo.name) params.set('name', customerInfo.name);
        if (customerInfo.email) params.set('email', customerInfo.email);
        if (customerInfo.phone) params.set('contact', customerInfo.phone);

        // Construct the full URL
        const fullUrl = params.toString()
          ? `${RAZORPAY_PAYMENT_LINK}?${params.toString()}`
          : RAZORPAY_PAYMENT_LINK;

        // Redirect to Razorpay Payment Link
        window.location.assign(fullUrl);
        
        // Note: onSuccess won't be called since we're redirecting
        // The success handling happens on the Razorpay thank you page
        
      } catch (err) {
        setIsLoading(false);
        const errorMessage = err instanceof Error ? err.message : 'Payment failed';
        setError(errorMessage);
        if (onFailure) {
          onFailure(errorMessage);
        }
      }
    },
    [onFailure]
  );

  return {
    isLoading,
    error,
    isScriptLoaded: true, // Always ready since no SDK needed
    initiatePayment,
    clearError,
  };
}
