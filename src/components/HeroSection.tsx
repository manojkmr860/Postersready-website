import { Search } from 'lucide-react';
import { useState } from 'react';

interface HeroSectionProps {
  onSecureAccess: () => void;
}

export default function HeroSection({ onSecureAccess }: HeroSectionProps) {
  const [url, setUrl] = useState('');

  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-2 lg:px-8 overflow-hidden min-h-screen bg-gradient-to-br from-lime-400 via-green-400 to-emerald-400" aria-label="Hero section - AI Instagram Post Designer">
      <div className="max-w-7xl mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[85vh]">
          <div className="space-y-8 max-w-xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Your Brand. Your Concept.
              <span className="text-transparent bg-clip-text text-emerald-950 bg-gradient-to-r from-lime-600 to-emerald-600">
               Posters Ready
              </span> in Minutes.
            </h1>

            <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-medium">
              Create stunning, brand-consistent <strong>Instagram posts</strong> in 180 seconds with our <strong>AI design agent</strong>. Perfect for <em>small businesses</em> and <em>social media agencies</em>.
            </p>

            <div className="hero-search-attn bg-white/20 backdrop-blur-md rounded-2xl p-1.5">
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

            <div className="flex flex-col sm:flex-row gap-4 pt-2 p-1.5">
              <button
                onClick={onSecureAccess}
                className="hero-matrix-btn hero-pulse-btn bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 border-2 border-transparent hover:border-lime-300 text-white hover:text-white hover:text-lime-300 px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-20 text-lg"
              >
                <span className="hero-matrix-btn__rain" aria-hidden="true" />
                <span className="relative z-10">Secure Business Access</span>
              </button>
            </div>
          </div>

          <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
            <div className="relative w-full h-full">


              {/* Coffee Brand - MAIN CARD (TOP LAYER) - FAR LEFT - FIRST */}
              <div
                className="absolute w-64 lg:w-80 transition-all duration-500 hover:scale-105 z-40 hover:z-55 hover:z-59"
                style={{ left: '5%', top: '10%', transform: 'rotate(-5deg)', animation: 'float-gentle 5s ease-in-out infinite 1s' }}
              >
                <div className="rounded-xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.4),0_0_30px_rgba(132,204,22,0.6),0_0_60px_rgba(132,204,22,0.3)] hover:shadow-[0_35px_90px_rgba(0,0,0,0.5),0_0_40px_rgba(132,204,22,0.8)] transition-shadow duration-300 border-4 border-lime-400">
                  <img
                    src="/assets/coffee-brand.png"
                    alt="AI-generated Instagram post design for coffee brand showing professional branding"
                    className="w-full h-full object-cover aspect-[3/4]"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Pongal Poster - SECONDARY (MIDDLE LAYER) - PEEKING RIGHT - SECOND */}
              <div
                className="absolute w-64 lg:w-80 transition-all duration-500 hover:scale-105 z-30 hover:z-50"
                style={{ left: '30%', top: '12%', animation: 'float-gentle 7s ease-in-out infinite 0.5s hover:z-50' }}
              >
                <div className="rounded-xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.35),0_0_25px_rgba(132,204,22,0.5),0_0_50px_rgba(132,204,22,0.3)] hover:shadow-[0_35px_90px_rgba(0,0,0,0.45),0_0_35px_rgba(132,204,22,0.7)] transition-shadow duration-300 border-4 border-lime-400">
                  <img
                    src="/assets/pongal-festival.jpg"
                    alt="AI-created festival social media post for Pongal celebration with traditional branding"
                    className="w-full h-full object-cover aspect-[3/4]"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Event Planner - BACK CARD (BOTTOM LAYER) - FURTHEST RIGHT - THIRD */}
              <div
                className="absolute w-64 lg:w-80 transition-all duration-500 hover:scale-105 z-10 hover:z-50"
                style={{ left: '55%', top: '14%', transform: 'rotate(1deg)', animation: 'float 6s ease-in-out infinite hover:z-50' }}
              >
                <div className="rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_20px_rgba(132,204,22,0.5),0_0_40px_rgba(132,204,22,0.3)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.4),0_0_30px_rgba(132,204,22,0.7)] transition-shadow duration-300 border-4 border-lime-400">
                  <img
                    src="/assets/event-planner.jpg"
                    alt="Professional event planner Instagram post created with AI design automation"
                    className="w-full h-full object-cover aspect-[3/4]"
                    loading="eager"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* Smooth Blend to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
    </section >
  );
}
