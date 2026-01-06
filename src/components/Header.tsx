import { useState, useEffect } from 'react';

interface HeaderProps {
  onSecureAccess: () => void;
}

export default function Header({ onSecureAccess }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 backdrop-blur-sm shadow-lg'
        : 'bg-white/50 backdrop-blur-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5">
        <div className="flex items-center justify-between h-20 sm:h-20">
          <div className="flex items-center gap-4">
            <img
              src="/assets/posters-ready-logo.png"
              alt="Posters Ready Logo"
              className="h-12 sm:h-12 w-10 sm:w-12 rounded-xl object-cover"
            />
            <span className="text-2xl sm:text-3xl font-bold text-emerald-950">
              PostersReady
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            {/* <button className="text-emerald-900 hover:text-emerald-700 transition-colors font-medium text-sm sm:text-base">
              Login
            </button> */}
            <button
              onClick={onSecureAccess}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105 transition-all duration-200 text-sm sm:text-base whitespace-nowrap"
            >
              Secure Business Access
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
