import { Check } from 'lucide-react';

interface PricingSectionProps {
  onSecureAccess: () => void;
}

export default function PricingSection({ onSecureAccess }: PricingSectionProps) {
  const spotsRemaining = 27;
  const totalSpots = 100;
  const spotsClaimed = totalSpots - spotsRemaining;
  const progressPercentage = (spotsClaimed / totalSpots) * 100;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 mb-4">
            SMB Growth Plans
          </h2>
          <p className="text-xl text-emerald-800 font-semibold">
            Enterprise Power. Small Business Price.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-white/60">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-emerald-950 mb-2">Starter Business</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-emerald-950">$9</span>
                  <span className="text-gray-700">/month</span>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">5 posters per day</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">2 Google Nano Banana edits</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">1 user</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Basic support</span>
                </li>
              </ul>

              <button
                onClick={onSecureAccess}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-full font-bold hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105 transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-lime-400 via-emerald-500 to-green-600 rounded-3xl p-8 shadow-2xl transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              POPULAR
            </div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-lime-300/20 rounded-full blur-3xl"></div>

            <div className="relative space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Visionary Business</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$20</span>
                  <span className="text-white/80">/month</span>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="text-lime-200 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-white">20 posters per day</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-lime-200 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-white">10 Google Nano Banana edits</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-lime-200 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-white">Unlimited users</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-lime-200 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-white">Priority support</span>
                </li>
              </ul>

              <button
                onClick={onSecureAccess}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-full font-bold hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-105 transition-all duration-200"
              >
                Secure This Plan
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-orange-900 font-semibold">Limited Early Access</span>
              <span className="text-orange-600 font-bold">{spotsRemaining} spots remaining</span>
            </div>
            <div className="w-full bg-orange-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-center mt-2 text-sm text-gray-600">
              {spotsClaimed}/{totalSpots} spots claimed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
