import { Copy, X, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type ConfettiFn = (options: Record<string, unknown>) => void;

let confettiLoader: Promise<ConfettiFn | null> | null = null;

async function loadConfettiFromCdn(): Promise<ConfettiFn | null> {
  if (typeof window === 'undefined') return null;

  const w = window as unknown as { confetti?: unknown };
  if (typeof w.confetti === 'function') {
    return w.confetti as ConfettiFn;
  }

  if (confettiLoader) return confettiLoader;

  confettiLoader = new Promise<ConfettiFn | null>((resolve) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-tsparticles-confetti="true"]'
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        const w2 = window as unknown as { confetti?: unknown };
        resolve(typeof w2.confetti === 'function' ? (w2.confetti as ConfettiFn) : null);
      });
      existingScript.addEventListener('error', () => resolve(null));
      return;
    }

    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js';
    script.async = true;
    script.defer = true;
    script.dataset.tsparticlesConfetti = 'true';
    script.onload = () => {
      const w2 = window as unknown as { confetti?: unknown };
      resolve(typeof w2.confetti === 'function' ? (w2.confetti as ConfettiFn) : null);
    };
    script.onerror = () => resolve(null);

    document.head.appendChild(script);
  });

  return confettiLoader;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const [copied, setCopied] = useState(false);
  const queuePosition = 45;
  const invitesCount = 0;
  const invitesTarget = 5;
  const referralLink = 'https://postersready.com/ref/ABC123XYZ';
  const progressPercentage = (invitesCount / invitesTarget) * 100;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!isOpen) return;

    // Respect user's reduced motion preference
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;

    loadConfettiFromCdn()
      .then((confetti) => {
        if (cancelled || !confetti) return;

        const confettiFn = confetti;
        const count = 200;
        const defaults = {
          origin: { y: 0.7 },
          // Ensure confetti is above the modal overlay (z-50)
          zIndex: 60,
        };

        function fire(particleRatio: number, opts: Record<string, unknown>) {
          confettiFn(
            Object.assign({}, defaults, opts, {
              particleCount: Math.floor(count * particleRatio),
            })
          );
        }

        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        });

        fire(0.2, {
          spread: 60,
        });

        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
        });

        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
        });

        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        });
      })
      .catch(() => {
        // If the CDN fails to load, fail silently (modal should still work)
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="text-gray-500" size={24} />
        </button>

        <div className="p-8 sm:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Share2 className="text-white" size={40} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-3">
              You're on the list!
            </h2>
            <p className="text-xl text-emerald-700 font-semibold">
              #{queuePosition} in line for Business Access
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-lime-50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-emerald-900 mb-4">
              Share your referral link
            </h3>
            <div className="bg-white rounded-xl p-4 flex items-center gap-3 mb-4">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-transparent border-none outline-none text-gray-700 text-sm"
              />
              <button
                onClick={handleCopy}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Copy size={18} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-emerald-900">
                  Unlock Premium Templates
                </span>
                <span className="text-sm font-bold text-emerald-700">
                  {invitesCount}/{invitesTarget} invited
                </span>
              </div>
              <div className="w-full bg-emerald-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-lime-500 to-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Invite 5 business owners to unlock Premium Templates
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-emerald-900 text-center">
              Share on social media
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
                <Share2 size={18} />
                WhatsApp
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
                <Share2 size={18} />
                LinkedIn
              </button>
              <button className="bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
                <Share2 size={18} />
                Twitter
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
                <Share2 size={18} />
                Facebook
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-xl">
            <p className="text-sm text-orange-900 text-center">
              <span className="font-semibold">Founding Member Benefit:</span> Your $9 or $20/month
              price is locked in forever, even as we raise prices for new customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
