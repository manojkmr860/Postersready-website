import { CheckCircle2 } from 'lucide-react';

interface PricingSectionProps {
  onSecureAccess: () => void;
}

export default function PricingSection({ onSecureAccess }: PricingSectionProps) {
  return (
    <section className="py-30 px-4 sm:px-6 lg:px-12 relative">
      {/* Smooth Blend to Next Section (Bottom) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(249,250,251,0.5) 0%, rgba(249,250,251,0.5) calc(100% - 96px), rgba(249,250,251,0) 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
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

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">

          {/* Starter Business */}
          <div className="bg-[#F6F6F2] rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative border border-transparent">
            <div className="space-y-6">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black text-[#042F1A]">$9</span>
                  <span className="text-xl font-bold text-gray-500">/month</span>
                </div>
                <h3 className="text-2xl font-black text-[#042F1A] mt-2">Starter Business</h3>
                <p className="text-gray-500 font-medium text-lg">Perfect for solopreneurs</p>
              </div>

              <ul className="space-y-5">
                {[
                  "5 posters per day",
                  "2 Google Nano Banana edits",
                  "1 user",
                  "Basic support"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="rounded-full flex-shrink-0 mt-1">
                      <CheckCircle2 className="text-[#048C76]" size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-[#042F1A] text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-8">
                <button
                  onClick={onSecureAccess}
                  className="w-full bg-white border-2 border-[#042F1A] text-[#042F1A] py-4 rounded-xl font-bold text-lg hover:bg-[#042F1A] hover:text-white transition-colors duration-200"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Visionary Business */}
          <div className="bg-[#F6F6F2] rounded-[32px] p-1 shadow-[0_0_40px_rgba(132,204,22,0.3)] relative transform hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 rounded-[32px] ring-4 ring-[#A3E635] shadow-[0_0_20px_rgba(163,230,53,0.5)] z-0 pointer-events-none"></div>
            <div className="bg-[#F6F6F2] rounded-[28px] p-7 h-full relative z-10 flex flex-col">
              <div className="absolute -top-5 right-6 bg-[#042F1A] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <span>🔥</span> BEST FOR GROWTH
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black text-[#042F1A]">$20</span>
                    <span className="text-xl font-bold text-gray-500">/month</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#042F1A] mt-2">Visionary Business</h3>
                  <p className="text-gray-500 font-medium text-lg">Perfect for growing brands</p>
                </div>

                <ul className="space-y-5">
                  {[
                    "20 posters per day",
                    "10 Google Nano Banana edits",
                    "Unlimited users",
                    "Priority support",
                    "Analytics dashboard"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="rounded-full flex-shrink-0 mt-1">
                        <CheckCircle2 className="text-[#84CC16] fill-[#84CC16] text-white" size={24} strokeWidth={2.5} />
                      </div>
                      <span className="text-[#042F1A] text-lg font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={onSecureAccess}
                  className="w-full bg-gradient-to-r from-[#84CC16] to-[#65A30D] text-[#042F1A] py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.04] transition-all duration-200"
                >
                  Lock in Business Rate
                </button>
              </div>
            </div>
          </div>

          {/* Enterprise */}
          <div className="bg-[#0B1525] rounded-[32px] p-1 shadow-2xl relative transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 rounded-[32px] ring-2 ring-[#B48128] z-0 pointer-events-none"></div>
            <div className="bg-[#0B1525] rounded-[28px] p-7 h-full relative z-10 flex flex-col">
              <div className="absolute -top-5 right-6 bg-[#D4AF37] text-[#0B1525] px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                ENTERPRISE
              </div>

              <div className="space-y-6 flex-1 text-center pt-4">
                <div>
                  <h3 className="text-5xl font-black text-[#D4AF37] mb-2">Let's Talk</h3>
                  <p className="text-[#9CA3AF] text-sm mb-6">Custom pricing for your needs</p>
                  <h4 className="text-2xl font-black text-[#D4AF37]">Enterprise</h4>
                  <p className="text-[#6B7280] font-medium text-lg">For agencies & large businesses</p>
                </div>

                <ul className="space-y-5 text-left pl-2">
                  {[
                    "Unlimited posters per day",
                    "Unlimited Nano Banana edits",
                    "Unlimited users & brands",
                    "Dedicated account manager",
                    "API access",
                    "White-label options"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="rounded-full flex-shrink-0 mt-1">
                        <CheckCircle2 className="text-[#D4AF37]" size={24} strokeWidth={2.5} />
                      </div>
                      <span className="text-[#E5E7EB] text-lg font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={onSecureAccess}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B48128] text-[#0B1525] py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-[#D4AF37]/20 hover:scale-[1.02] transition-all duration-200"
                >
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
