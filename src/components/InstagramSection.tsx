import { TrendingUp, Target, Zap, Clock } from 'lucide-react';

export default function InstagramSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 leading-tight">
              Built for the Feed.{' '}
              <span className="text-emerald-700">
                Optimized for Growth.
              </span>
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4 items-start group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <Target className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-950 mb-2">Visual-First Content</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Every poster is designed for maximum engagement on Instagram's visual platform
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-950 mb-2">Data-Driven Timing</h3>
                  <p className="text-gray-700 leading-relaxed">
                    AI suggests optimal posting times based on your audience engagement patterns
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <Zap className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-950 mb-2">Accelerated Engagement</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Professional-quality content that stops the scroll and drives action
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="bg-gradient-to-br from-red-100 to-orange-200 p-8 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-900 mb-2">பொங்கல்</div>
                    <div className="text-xl text-red-800 mb-1">விழா விற்பனை</div>
                    <div className="text-lg text-red-700">Boutique Collection</div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-emerald-500"></div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                      <div className="h-2 bg-gray-100 rounded-full w-1/2 mt-2"></div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2">
                    <Clock className="text-emerald-600" size={18} />
                    <span className="text-sm font-semibold text-emerald-800">
                      Best time to post: 6:45 PM
                    </span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                    Share to Instagram
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
