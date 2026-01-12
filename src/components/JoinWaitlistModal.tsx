import { X } from 'lucide-react';
import { useState } from 'react';
import { useRazorpay } from '../hooks/useRazorpay';
import type { PlanId } from '../types/razorpay';

interface JoinWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess?: (paymentId: string) => void;
  // Default plan for waitlist signup
  planId?: PlanId;
}

export interface WaitlistFormData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  category: 'founder' | 'designer' | 'creator' | 'other' | '';
}

const categoryOptions = [
  { value: 'founder', label: 'Founder' },
  { value: 'designer', label: 'Designer' },
  { value: 'creator', label: 'Creator' },
  { value: 'other', label: 'Other' },
] as const;

export default function JoinWaitlistModal({
  isOpen,
  onClose,
  onPaymentSuccess,
  planId = 'starter', // Default to starter plan
}: JoinWaitlistModalProps) {
  const [formData, setFormData] = useState<WaitlistFormData>({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    category: '',
  });

  // Razorpay payment hook
  const { isLoading, error, isScriptLoaded, initiatePayment, clearError } = useRazorpay(
    (paymentId) => {
      // Payment successful
      onClose();
      if (onPaymentSuccess) {
        onPaymentSuccess(paymentId);
      }
    },
    (errorMsg) => {
      // Payment failed - error is displayed by the hook
      console.error('Payment failed:', errorMsg);
    }
  );

  const [touched, setTouched] = useState({
    phoneNumber: false,
    emailAddress: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits, max 12 characters
    const digitsOnly = value.replace(/\D/g, '').slice(0, 12);
    setFormData((prev) => ({ ...prev, phoneNumber: digitsOnly }));
  };

  const handleBlur = (field: 'phoneNumber' | 'emailAddress') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleCategoryChange = (value: WaitlistFormData['category']) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    clearError();
    
    // Initiate Razorpay payment flow
    // This will:
    // 1. Call create-order.php to create a Razorpay order
    // 2. Open Razorpay checkout modal
    // 3. On success, call verify-payment.php to verify
    // 4. Redirect to dashboard on successful verification
    await initiatePayment(planId, {
      name: formData.fullName,
      email: formData.emailAddress,
      phone: `91${formData.phoneNumber}`, // Add country code
    });
  };

  // Validation functions
  const isPhoneValid = (phone: string) => {
    // Phone must be between 10-12 digits
    return phone.length >= 10 && phone.length <= 12;
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const phoneError =
    touched.phoneNumber && formData.phoneNumber && !isPhoneValid(formData.phoneNumber)
      ? "Hmm... this phone no doesn't look right"
      : '';

  const emailError =
    touched.emailAddress && formData.emailAddress && !isEmailValid(formData.emailAddress)
      ? "Hmm... this email doesn't look right"
      : '';

  const isFormValid =
    formData.fullName.trim() &&
    formData.phoneNumber.trim() &&
    isPhoneValid(formData.phoneNumber) &&
    formData.emailAddress.trim() &&
    isEmailValid(formData.emailAddress) &&
    formData.category;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="text-gray-500" size={24} />
        </button>

        <div className="p-8 sm:p-10">
          {/* Thank You Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-900 mb-2">
              Welcome to PostersReady Beta Application!
            </h2>
            <p className="text-lg text-emerald-700">
            Only 100 beta seats are open for Users, who want to experience and truly feels like a co-worker. Apply below to see if you’re one of the 100.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-emerald-900 mb-2"
              >
                Type your Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Type your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-700"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-semibold text-emerald-900 mb-2"
              >
                Mobile Number #
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 py-3 border border-r-0 border-gray-300 rounded-l-xl bg-gray-50 text-gray-700 font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  onBlur={() => handleBlur('phoneNumber')}
                  placeholder="Enter your phone number"
                  maxLength={12}
                  className={`w-full px-4 py-3 border rounded-r-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-700 ${
                    phoneError ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
              </div>
              {phoneError && (
                <p className="mt-1.5 text-sm text-red-500">{phoneError}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="emailAddress"
                className="block text-sm font-semibold text-emerald-900 mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                onBlur={() => handleBlur('emailAddress')}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-700 ${
                  emailError ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {emailError && (
                <p className="mt-1.5 text-sm text-red-500">{emailError}</p>
              )}
            </div>

            {/* Category Selection */}
            <fieldset>
              <legend className="block text-sm font-semibold text-emerald-900 mb-3">
                Which category describes you the best? *
              </legend>
              <div className="flex flex-wrap gap-3">
                {categoryOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleCategoryChange(option.value)}
                    className={`flex-1 min-w-[calc(18%-0.375rem)] px-2 py-1 border-2 rounded-xl cursor-pointer transition-all text-center font-medium ${
                      formData.category === option.value
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Next Button */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading || !isScriptLoaded}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                isFormValid && !isLoading && isScriptLoaded
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:scale-[1.02]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
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
              Secured by Razorpay • 100% Safe Payment
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
