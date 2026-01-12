interface FinalCTAProps {
  onSecureAccess: () => void;
}

export default function FinalCTA({ onSecureAccess }: FinalCTAProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-950 relative overflow-hidden">
      

      {/* Top Wave Design */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden pointer-events-none z-0 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {/* Match FAQSection background (body gradient: from-lime-300 via-emerald-400 to-emerald-800) */}
            <linearGradient id="faqWaveGradient" x1="0%" y1="0%" x2="133%" y2="18%">
              
              <stop offset="6%" stopColor="#3ed697" />
              <stop offset="80%" stopColor="#065f46" />
            </linearGradient>
          </defs>
          <path
            fill="url(#faqWaveGradient)"
            d="M0,256L14.1,218.7C28.2,181,56,107,85,74.7C112.9,43,141,53,169,48C197.6,43,226,21,254,37.3C282.4,53,311,107,339,128C367.1,149,395,139,424,165.3C451.8,192,480,256,508,240C536.5,224,565,128,593,96C621.2,64,649,96,678,128C705.9,160,734,192,762,170.7C790.6,149,819,75,847,42.7C875.3,11,904,21,932,58.7C960,96,988,160,1016,160C1044.7,160,1073,96,1101,101.3C1129.4,107,1158,181,1186,224C1214.1,267,1242,277,1271,245.3C1298.8,213,1327,139,1355,101.3C1383.5,64,1412,64,1426,64L1440,64L1440,0L1425.9,0C1411.8,0,1384,0,1355,0C1327.1,0,1299,0,1271,0C1242.4,0,1214,0,1186,0C1157.6,0,1129,0,1101,0C1072.9,0,1045,0,1016,0C988.2,0,960,0,932,0C903.5,0,875,0,847,0C818.8,0,791,0,762,0C734.1,0,706,0,678,0C649.4,0,621,0,593,0C564.7,0,536,0,508,0C480,0,452,0,424,0C395.3,0,367,0,339,0C310.6,0,282,0,254,0C225.9,0,198,0,169,0C141.2,0,113,0,85,0C56.5,0,28,0,14,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-8 ">
          <img
            src="/assets/posters-ready-logo.png"
            alt="Posters Ready - AI Instagram Post Designer for Small Businesses"
            className="h-20 w-20 rounded-3xl shadow-xl shadow-lime-500/50"
            loading="lazy"
          />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Your customers are waiting.{' '}
          <span className="text-lime-300">What are you waiting for?</span>
        </h2>

        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Secure your early business access today and lock in founding member pricing.
          Don't wait until prices increase for new customers.
        </p>

        <button
          onClick={onSecureAccess}
          className="hero-matrix-btn hero-pulse-btn bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-200 shadow-xl"
        >
          Join Waitlist
        </button>

        <div className="mt-8 text-white/60 text-sm">
          Join 73 business owners who've already secured their access
        </div>
      </div>
    </section>
  );
}
