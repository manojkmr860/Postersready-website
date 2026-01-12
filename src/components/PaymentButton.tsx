/**
 * =====================================================
 * PAYMENT BUTTON COMPONENT
 * =====================================================
 * 
 * Reusable payment button that triggers Razorpay checkout.
 * Collects customer information before initiating payment.
 */

import { useState } from 'react';
import { useRazorpay } from '../hooks/useRazorpay';
import type { PlanId } from '../types/razorpay';

interface PaymentButtonProps {
  planId: PlanId;
  buttonText?: string;
  className?: string;
  onSuccess?: (paymentId: string) => void;
  onFailure?: (error: string) => void;
  // Pre-filled customer info (optional)
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

export function PaymentButton({
  planId,
  buttonText = 'Pay Now',
  className = '',
  onSuccess,
  onFailure,
  customerName: initialName = '',
  customerEmail: initialEmail = '',
  customerPhone: initialPhone = '',
}: PaymentButtonProps) {
  const { isLoading, error, isScriptLoaded, initiatePayment, clearError } = useRazorpay(
    onSuccess,
    onFailure
  );

  // Customer info state
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [formError, setFormError] = useState('');

  // Handle button click
  const handleClick = () => {
    // If we have all required info, proceed directly
    if (initialName && initialEmail) {
      initiatePayment(planId, {
        name: initialName,
        email: initialEmail,
        phone: initialPhone,
      });
    } else {
      // Show form to collect info
      setShowForm(true);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setFormError('');

    // Validate
    if (!name.trim()) {
      setFormError('Please enter your name');
      return;
    }

    if (!email.trim()) {
      setFormError('Please enter your email');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address');
      return;
    }

    // Initiate payment
    initiatePayment(planId, { name, email, phone });
  };

  // Close form modal
  const handleClose = () => {
    setShowForm(false);
    setFormError('');
    clearError();
  };

  // Default button styles
  const defaultButtonStyles =
    'px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <>
      {/* Main Payment Button */}
      <button
        onClick={handleClick}
        disabled={isLoading || !isScriptLoaded}
        className={className || defaultButtonStyles}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : !isScriptLoaded ? (
          'Loading...'
        ) : (
          buttonText
        )}
      </button>

      {/* Error Display */}
      {error && !showForm && (
        <div className="mt-2 text-red-600 text-sm">{error}</div>
      )}

      {/* Customer Info Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Complete Your Purchase
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="payment-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name *
                </label>
                <input
                  id="payment-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="payment-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address *
                </label>
                <input
                  id="payment-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Phone Field (Optional) */}
              <div>
                <label
                  htmlFor="payment-phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number (Optional)
                </label>
                <input
                  id="payment-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Error Message */}
              {(formError || error) && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {formError || error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Proceed to Payment'
                )}
              </button>

              {/* Security Note */}
              <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Secured by Razorpay • 100% Safe
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
