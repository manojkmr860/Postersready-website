import { Clock, Zap } from 'lucide-react';

export default function ComparisonSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/40 mb-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 mb-4">
              Value Comparison: The Smart Choice
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              See how AI agents transform your design workflow
            </p>
          </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">The Old Way</h3>
                <span className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
                  Manual
                </span>
              </div>

              <div className="aspect-video bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-4 left-4 right-4 h-8 bg-gray-500 rounded"></div>
                  <div className="absolute top-16 left-4 right-4 bottom-4 grid grid-cols-3 gap-2">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="bg-gray-500 rounded"></div>
                    ))}
                  </div>
                </div>
                <div className="relative text-center text-gray-600">
                  <div className="text-sm font-medium mb-1">Complex Design Tools</div>
                  <div className="text-xs opacity-75">Steep learning curve</div>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                <Clock className="text-gray-600" size={32} />
                <div>
                  <div className="text-3xl font-bold text-gray-800">180 min</div>
                  <div className="text-sm text-gray-600">Average time per poster</div>
                </div>
              </div>

              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  <span>Requires design expertise</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  <span>Manual brand matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  <span>Time-consuming iterations</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-lime-400 via-emerald-500 to-green-600 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-300/30 via-transparent to-transparent"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-lime-300/20 rounded-full blur-3xl"></div>

            <div className="relative space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Posters Ready</h3>
                <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                  AI-Powered
                </span>
              </div>

              <div className="aspect-video bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center p-6">
                  <div className="text-4xl font-bold text-emerald-900 mb-2">Your Brand</div>
                  <div className="text-xl text-emerald-700 mb-4">Instant Recognition</div>
                  <div className="flex justify-center gap-2">
                    <div className="w-3 h-3 bg-lime-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 shadow-lg">
                <Zap className="text-emerald-600" size={32} />
                <div>
                  <div className="text-3xl font-bold text-emerald-900">3 min</div>
                  <div className="text-sm text-emerald-700">Average time per poster</div>
                </div>
              </div>

              <ul className="space-y-3 text-white">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-lime-300 rounded-full"></span>
                  <span>Zero design skills needed</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-lime-300 rounded-full"></span>
                  <span>Automatic brand extraction</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-lime-300 rounded-full"></span>
                  <span>Instant professional results</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
