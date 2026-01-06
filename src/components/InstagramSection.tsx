import { TrendingUp, Camera, Zap, ChevronLeft, Instagram } from 'lucide-react';
import { CometCard } from '@/components/ui/comet-card';

export default function InstagramSection() {
  return (
    <section className="py-40 px-5 sm:px-7 lg:px-9 relative" aria-label="Instagram optimization features" id="features">
      {/* Smooth Blend to Next Section (Bottom) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) calc(100% - 128px), rgba(255,255,255,0) 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative justify-center items-center z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center self-center justify-center">

          {/* Left Column: Features */}
          <div className="space-y-14 justify-center items-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-950 leading-[1.1] tracking-tight">
              Built for the Feed.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-emerald-600">
                Optimized for Growth.
              </span>
            </h2>

            <div className="space-y-10">
              {/* Feature 1 */}
              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-300 to-lime-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-lime-200 group-hover:scale-110 transition-transform duration-300">
                  <Camera className="text-white fill-white/20" size={32} strokeWidth={2} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">Visual-First Content</h3>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-sm">
                    Every poster is designed for maximum engagement on Instagram's visual platform
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-400 to-emerald-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="text-white fill-white/20" size={32} strokeWidth={2} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">Data-Driven Timing</h3>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-sm">
                    AI suggests optimal posting times based on your audience engagement patterns
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-300 to-lime-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-lime-200 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="text-white fill-white/20" size={32} strokeWidth={2} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">Accelerated Engagement</h3>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-sm">
                    Professional-quality content that stops the scroll and drives action
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-300 to-lime-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-lime-200 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="text-white fill-white/20" size={32} strokeWidth={2} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">Accelerated Engagement</h3>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-sm">
                    Professional-quality content that stops the scroll and drives action
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Phone Mockup */}
          <CometCard className="relative flex justify-center items-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-lime-400/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* iPhone Frame */}
            <div className=" hero-pulse-btn relative w-[340px] h-[680px] bg-gray-900 rounded-[50px] shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25),0_30px_60px_-30px_rgba(0,0,0,0.3)] border-[8px] border-gray-900 overflow-hidden ring-4 ring-gray-100 z-10 transform hover:scale-[1.02] transition-transform duration-500">
              {/* Notch & Status Bar Area */}
              <div className="absolute top-0 w-full h-14 bg-white z-20 flex justify-between items-end px-6 pb-2">
                <span className="text-xs font-bold text-gray-900">9:41</span>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-32 bg-gray-900 rounded-b-2xl"></div>
                <div className="flex gap-1.5 grayscale opacity-80">
                  <div className="w-4 h-2.5 bg-gray-900 rounded-[1px]"></div>
                  <div className="w-4 h-2.5 bg-gray-900 rounded-[1px]"></div>
                </div>
              </div>

              {/* App Header */}
              <div className="absolute top-14 w-full h-12 bg-white z-20 flex items-center px-4 border-b border-gray-50">
                <ChevronLeft className="text-gray-900" size={24} />
                <span className="flex-1 text-center font-bold text-gray-900 text-sm mr-6">Posters Ready</span>
              </div>

              {/* Screen Content - Scrollable Area */}
              <div className="absolute inset-0 pt-26 bg-gray-50 overflow-hidden">
                <div className="px-4 pt-16 mt-6 pb-4">
                  {/* The Post Card */}
                  <div className="bg-white rounded-2xl shadow-sm p-3 mb-4">
                    <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 relative">
                      <img
                        src="/assets/pongal-festival.jpg"
                        alt="Happy Pongal Poster"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2 px-1">
                      <p className="text-sm text-gray-800 leading-snug">
                        <span className="font-semibold">Celebrate the harvest festival with joy! 🌾☀️</span> #Pongal #Festival #Tradition
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-5 h-5 rounded-full bg-gray-200"></div>
                        <div className="h-2 w-20 bg-gray-100 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Stats / Timing Pill */}
                  <div className="bg-emerald-100/50 border border-emerald-200 rounded-xl p-3 flex items-center justify-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Best time to post: 6:45 PM</span>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transform active:scale-95 transition-all">
                    <Instagram size={18} />
                    Share to Instagram
                  </button>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full z-30"></div>
            </div>
          </CometCard>

        </div>
      </div>
    </section>
  );
}
