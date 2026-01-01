interface FinalCTAProps {
  onSecureAccess: () => void;
}

export default function FinalCTA({ onSecureAccess }: FinalCTAProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-lime-500/10 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
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
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-200 shadow-xl"
        >
          Secure Business Access
        </button>

        <div className="mt-8 text-white/60 text-sm">
          Join 73 business owners who've already secured their access
        </div>
      </div>
    </section>
  );
}
