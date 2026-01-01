import { Search } from 'lucide-react';
import { useState } from 'react';

interface HeroSectionProps {
  onSecureAccess: () => void;
}

export default function HeroSection({ onSecureAccess }: HeroSectionProps) {
  const [url, setUrl] = useState('');

  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen bg-gradient-to-br from-lime-400 via-green-400 to-emerald-400">
      <div className="max-w-7xl mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[85vh]">
          <div className="space-y-8 max-w-xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Your Brand. Your Concept. Posters Ready in Minutes.
            </h1>

            <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-medium">
              Turn your website URL into stunning, Instagram-ready posters in 180 seconds. Not hours.
            </p>

            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-1.5">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter your website URL to create your branding"
                    className="w-full pl-12 pr-4 py-4 bg-white/90 rounded-xl border-none outline-none text-gray-800 placeholder-gray-500 font-medium"
                  />
                </div>
                <button className="bg-white text-lime-600 px-6 py-4 rounded-xl font-bold hover:bg-white/95 transition-all duration-200 flex items-center gap-2">
                  <Search size={20} />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={onSecureAccess}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105 transition-all duration-200 text-lg"
              >
                Secure Business Access
              </button>
            </div>
          </div>

          <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
            <div className="relative w-full h-full">


              {/* Fashion Poster - MAIN CARD (TOP LAYER) - FAR LEFT */}
              <div
                className="absolute w-64 lg:w-80 transition-all duration-500 hover:scale-105 z-50"
                style={{ left: '2%', top: '10%', transform: 'rotate(-5deg)', animation: 'float-gentle 5s ease-in-out infinite 1s' }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.4)] hover:shadow-[0_35px_90px_rgba(0,0,0,0.5)] transition-shadow duration-300 border-4 border-white">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 via-white to-gray-50 p-6 flex flex-col justify-between relative">
                    <div className="absolute top-4 right-4 bg-black text-white text-xs px-2 py-1 rounded">NEW</div>

                    <div>
                      <div className="text-xs text-gray-500 mb-1">FUSION</div>
                      <div className="text-2xl font-black text-gray-900 leading-tight">Fashion<br />Brand</div>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-32 h-48 bg-gradient-to-br from-orange-200 to-pink-300 rounded-lg shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 text-white text-xs font-bold">STYLE</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-800">Premium Collection</div>
                      <button className="bg-black text-white px-4 py-2 rounded-lg text-xs font-bold mt-2 w-full">
                        SHOP NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pongal Poster - SECONDARY (MIDDLE LAYER) - PEEKING RIGHT */}
              <div
                className="absolute w-64 lg:w-80 transition-all duration-500 hover:scale-105 z-30"
                style={{ left: '18%', top: '12%', transform: 'rotate(-3deg)', animation: 'float-slow 7s ease-in-out infinite 0.5s' }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.35)] hover:shadow-[0_35px_90px_rgba(0,0,0,0.45)] transition-shadow duration-300 border-4 border-white">
                  <div className="aspect-[3/4] bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 p-6 flex flex-col justify-between relative">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-8 left-8 w-24 h-24 bg-yellow-300 rounded-full blur-2xl"></div>
                      <div className="absolute bottom-8 right-8 w-32 h-32 bg-orange-600 rounded-full blur-2xl"></div>
                    </div>

                    <div className="relative z-10">
                      <div className="text-sm font-bold text-orange-950 mb-2">பொங்கல்</div>

                      <div className="text-center mt-8">
                        <div className="text-3xl font-black text-orange-950 mb-2 leading-tight">பொங்கல்<br />நல்வாழ்த்துக்கள்</div>
                        <div className="text-lg font-bold text-orange-900 mt-4">Happy Pongal</div>
                        <div className="text-sm text-orange-900 font-semibold mt-1">TamilAutoBrand</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coffee Poster - BACK CARD (BOTTOM LAYER) - FURTHEST RIGHT */}
              <div
                className="absolute w-64 lg:w-80 transition-all duration-500 hover:scale-105 z-10"
                style={{ left: '34%', top: '14%', transform: 'rotate(-1deg)', animation: 'float 6s ease-in-out infinite' }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-shadow duration-300 border-4 border-white">
                  <div className="aspect-[3/4] bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 p-6 flex flex-col justify-between relative">
                    <div className="text-sm font-bold text-gray-800 mb-2">London Coffee Co.</div>

                    <div className="flex-1 flex items-center justify-center">
                      <div className="bg-white w-32 h-32 rounded-2xl shadow-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl mb-1">☕</div>
                          <div className="text-xs font-bold text-gray-800">Premium</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-2xl font-black text-gray-900 mb-1">Product Launch</div>
                      <div className="text-sm text-gray-700 font-semibold">Satisfy your palate with 3 builds<br />with unmatched precision.</div>
                      <button className="bg-black text-white px-4 py-2 rounded-lg text-xs font-bold mt-3 inline-block">
                        ORDER NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
