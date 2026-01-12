/**
 * =====================================================
 * PRICING SECTION WITH INTEGRATED PAYMENTS
 * =====================================================
 * 
 * This component displays pricing plans and handles
 * Razorpay payment integration. Use this instead of
 * the original PricingSection when payments are enabled.
 * 
 * Features:
 * - Three pricing tiers (Starter, Visionary, Enterprise)
 * - Integrated payment flow
 * - Success/failure handling
 */

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PaymentButton } from './PaymentButton';
import type { PlanId } from '../types/razorpay';

interface PricingSectionWithPaymentProps {
  // Optional: pre-filled customer info from previous form
  customerInfo?: {
    name: string;
    email: string;
    phone?: string;
  };
  // Fallback to waitlist mode (for pre-launch)
  onSecureAccess?: () => void;
  // Enable/disable payment (use waitlist if false)
  paymentsEnabled?: boolean;
}

interface PlanConfig {
  id: PlanId;
  name: string;
  price: string;
  priceLabel: string;
  tagline: string;
  features: string[];
  buttonText: string;
  variant: 'default' | 'popular' | 'enterprise';
  badge?: string;
}

const PLANS: PlanConfig[] = [
  {
    id: 'starter',
    name: 'Starter Business',
    price: '$9',
    priceLabel: '/month',
    tagline: 'Perfect for solopreneurs',
    features: [
      '5 posters per day',
      '2 Google Nano Banana edits',
      '1 user',
      'Basic support',
    ],
    buttonText: 'Get Started',
    variant: 'default',
  },
  {
    id: 'visionary',
    name: 'Visionary Business',
    price: '$20',
    priceLabel: '/month',
    tagline: 'Perfect for growing brands',
    features: [
      '20 posters per day',
      '10 Google Nano Banana edits',
      'Unlimited users',
      'Priority support',
      'Analytics dashboard',
    ],
    buttonText: 'Lock in Business Rate',
    variant: 'popular',
    badge: '🔥 BEST FOR GROWTH',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: "Let's Talk",
    priceLabel: '',
    tagline: 'For agencies & large businesses',
    features: [
      'Unlimited posters per day',
      'Unlimited Nano Banana edits',
      'Unlimited users & brands',
      'Dedicated account manager',
      'API access',
      'White-label options',
    ],
    buttonText: 'Schedule Demo',
    variant: 'enterprise',
    badge: 'ENTERPRISE',
  },
];

export default function PricingSectionWithPayment({
  customerInfo,
  onSecureAccess,
  paymentsEnabled = true,
}: PricingSectionWithPaymentProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handlePaymentSuccess = (paymentId: string) => {
    setSuccessMessage(`Payment successful! ID: ${paymentId}`);
    // Redirect will happen automatically from the hook
  };

  const handlePaymentFailure = (error: string) => {
    console.error('Payment failed:', error);
    // Error is displayed by the PaymentButton component
  };

  const renderButton = (plan: PlanConfig) => {
    // Enterprise always goes to contact/waitlist
    if (plan.id === 'enterprise') {
      return (
        <button
          onClick={onSecureAccess}
          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B48128] text-[#0B1525] py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-[#D4AF37]/20 hover:scale-[1.02] transition-all duration-200"
        >
          {plan.buttonText}
        </button>
      );
    }

    // If payments not enabled, use waitlist
    if (!paymentsEnabled || !onSecureAccess === undefined) {
      if (plan.variant === 'popular') {
        return (
          <button
            onClick={onSecureAccess}
            className="w-full bg-gradient-to-r from-[#84CC16] to-[#65A30D] text-[#042F1A] py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.04] transition-all duration-200"
          >
            {plan.buttonText}
          </button>
        );
      }
      return (
        <button
          onClick={onSecureAccess}
          className="w-full bg-white border-2 border-[#042F1A] text-[#042F1A] py-4 rounded-xl font-bold text-lg hover:bg-[#042F1A] hover:text-white transition-colors duration-200"
        >
          {plan.buttonText}
        </button>
      );
    }

    // Payment enabled - use PaymentButton
    if (plan.variant === 'popular') {
      return (
        <PaymentButton
          planId={plan.id}
          buttonText={plan.buttonText}
          className="w-full bg-gradient-to-r from-[#84CC16] to-[#65A30D] text-[#042F1A] py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.04] transition-all duration-200 disabled:opacity-50"
          customerName={customerInfo?.name}
          customerEmail={customerInfo?.email}
          customerPhone={customerInfo?.phone}
          onSuccess={handlePaymentSuccess}
          onFailure={handlePaymentFailure}
        />
      );
    }

    return (
      <PaymentButton
        planId={plan.id}
        buttonText={plan.buttonText}
        className="w-full bg-white border-2 border-[#042F1A] text-[#042F1A] py-4 rounded-xl font-bold text-lg hover:bg-[#042F1A] hover:text-white transition-colors duration-200 disabled:opacity-50"
        customerName={customerInfo?.name}
        customerEmail={customerInfo?.email}
        customerPhone={customerInfo?.phone}
        onSuccess={handlePaymentSuccess}
        onFailure={handlePaymentFailure}
      />
    );
  };

  return (
    <section className="py-30 px-4 sm:px-6 lg:px-12 relative">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(249,250,251,0.5) 0%, rgba(249,250,251,0.5) calc(100% - 96px), rgba(249,250,251,0) 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 mb-4">
            Affordable AI Design Plans for Small Businesses
          </h2>
          <p className="text-3xl sm:text-1xl lg:text-3xl text-emerald-800 font-semibold">
            Enterprise-Level Instagram Content. Small Business Pricing.
          </p>
          <p className="text-base text-black-600 mt-2 max-w-xl mx-auto">
            Professional social media design tools starting at just $9/month
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            {successMessage}
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PLANS.map((plan) => {
            if (plan.variant === 'default') {
              return (
                <div
                  key={plan.id}
                  className="bg-[#F6F6F2] rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative border border-transparent"
                >
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-6xl font-black text-[#042F1A]">
                          {plan.price}
                        </span>
                        <span className="text-xl font-bold text-gray-500">
                          {plan.priceLabel}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-[#042F1A] mt-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-500 font-medium text-lg">
                        {plan.tagline}
                      </p>
                    </div>

                    <ul className="space-y-5">
                      {plan.features.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="rounded-full flex-shrink-0 mt-1">
                            <CheckCircle2
                              className="text-[#048C76]"
                              size={24}
                              strokeWidth={2.5}
                            />
                          </div>
                          <span className="text-[#042F1A] text-lg font-medium">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-8">{renderButton(plan)}</div>
                  </div>
                </div>
              );
            }

            if (plan.variant === 'popular') {
              return (
                <div
                  key={plan.id}
                  className="bg-[#F6F6F2] rounded-[32px] p-1 shadow-[0_0_40px_rgba(132,204,22,0.3)] relative transform hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-[32px] ring-4 ring-[#A3E635] shadow-[0_0_20px_rgba(163,230,53,0.5)] z-0 pointer-events-none" />
                  <div className="bg-[#F6F6F2] rounded-[28px] p-7 h-full relative z-10 flex flex-col">
                    <div className="absolute -top-5 right-6 bg-[#042F1A] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                      <span>{plan.badge}</span>
                    </div>

                    <div className="space-y-6 flex-1">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-6xl font-black text-[#042F1A]">
                            {plan.price}
                          </span>
                          <span className="text-xl font-bold text-gray-500">
                            {plan.priceLabel}
                          </span>
                        </div>
                        <h3 className="text-2xl font-black text-[#042F1A] mt-2">
                          {plan.name}
                        </h3>
                        <p className="text-gray-500 font-medium text-lg">
                          {plan.tagline}
                        </p>
                      </div>

                      <ul className="space-y-5">
                        {plan.features.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="rounded-full flex-shrink-0 mt-1">
                              <CheckCircle2
                                className="text-[#84CC16] fill-[#84CC16] text-white"
                                size={24}
                                strokeWidth={2.5}
                              />
                            </div>
                            <span className="text-[#042F1A] text-lg font-medium">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-8">{renderButton(plan)}</div>
                  </div>
                </div>
              );
            }

            // Enterprise variant
            return (
              <div
                key={plan.id}
                className="bg-[#0B1525] rounded-[32px] p-1 shadow-2xl relative transform hover:-translate-y-2 hover:scale-105 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-[32px] ring-2 ring-[#B48128] z-0 pointer-events-none" />
                <div className="bg-[#0B1525] rounded-[28px] p-7 h-full relative z-10 flex flex-col">
                  <div className="absolute -top-5 right-6 bg-[#D4AF37] text-[#0B1525] px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                    {plan.badge}
                  </div>

                  <div className="space-y-6 flex-1 text-center pt-4">
                    <div>
                      <h3 className="text-5xl font-black text-[#D4AF37] mb-2">
                        {plan.price}
                      </h3>
                      <p className="text-[#9CA3AF] text-sm mb-6">
                        Custom pricing for your needs
                      </p>
                      <h4 className="text-2xl font-black text-[#D4AF37]">
                        {plan.name}
                      </h4>
                      <p className="text-[#6B7280] font-medium text-lg">
                        {plan.tagline}
                      </p>
                    </div>

                    <ul className="space-y-5 text-left pl-2">
                      {plan.features.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="rounded-full flex-shrink-0 mt-1">
                            <CheckCircle2
                              className="text-[#D4AF37]"
                              size={24}
                              strokeWidth={2.5}
                            />
                          </div>
                          <span className="text-[#E5E7EB] text-lg font-medium">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">{renderButton(plan)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
