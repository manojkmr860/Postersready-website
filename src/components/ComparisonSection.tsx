

export default function ComparisonSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 mb-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 mb-5">
              PostersReady vs. Traditional Methods: <br/><span className="text-xl sm:text-2xl lg:text-3xl text-emerald-800 font-semibold">Save Hours in a designing each poster</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Compare manual Instagram design workflows with Posters Ready's AI-powered automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="/assets/comparison-old-way.jpg"
                alt="Traditional manual Instagram design process: time-consuming, expensive, inconsistent branding"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Posters Ready - New Way */}
            <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-2xl hover:shadow-orange-500/50  hover:scale-[1.05] transition-all duration-300">
              <img
                src="/assets/comparison-new-way.jpg"
                alt="Posters Ready AI-powered design: fast, affordable, brand-consistent Instagram posts in 180 seconds"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Blend to Next Section (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50/50 to-transparent pointer-events-none z-0"></div>
    </section>
  );
}
