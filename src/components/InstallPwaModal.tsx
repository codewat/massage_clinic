import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Share, PlusSquare, X, Check } from 'lucide-react';
import { CLINIC_NAME } from '../services/clinicData';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPwaModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        onClose();
      }
      setDeferredPrompt(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="glass-card rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-white/15 text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#0D9488]/30 border border-[#F1BB09]/40 text-[#F1BB09] rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-lg">
            <Smartphone className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">Install App</h3>
          <p className="text-xs sm:text-sm text-[#FBF4C4]/80 mt-1">
            Install {CLINIC_NAME} directly on your mobile device (iOS/Android) or Desktop for fast 1-tap booking.
          </p>
        </div>

        {deferredPrompt && (
          <button
            onClick={handleInstallClick}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 btn-primary-gold rounded-xl font-bold shadow-lg transition-all active:scale-[0.99] mb-5"
          >
            <Download className="w-5 h-5" />
            Install App Now (1-Click)
          </button>
        )}

        <div className="space-y-4 text-left bg-[#161E1A]/80 p-4 rounded-2xl border border-white/10 mb-6 text-sm">
          {/* iOS Safari */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[#0D9488] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              iOS
            </div>
            <div>
              <p className="font-semibold text-white">iPhone / iPad (Safari):</p>
              <p className="text-[#FBF4C4]/75 text-xs mt-0.5 leading-relaxed">
                1. Tap the <Share className="w-3.5 h-3.5 inline text-blue-400" /> <strong>Share</strong> button at bottom.
                <br />
                2. Select <PlusSquare className="w-3.5 h-3.5 inline text-stone-300" /> <strong>"Add to Home Screen"</strong>.
              </p>
            </div>
          </div>

          {/* Android Chrome */}
          <div className="flex items-start gap-3 pt-3 border-t border-white/10">
            <div className="w-7 h-7 rounded-full bg-[#716B56] text-[#FBF4C4] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              AND
            </div>
            <div>
              <p className="font-semibold text-white">Android (Chrome):</p>
              <p className="text-[#FBF4C4]/75 text-xs mt-0.5 leading-relaxed">
                1. Tap the <strong>three dots (⋮)</strong> at top right.
                <br />
                2. Tap <strong>"Install App"</strong> or <strong>"Add to Home screen"</strong>.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 px-4 bg-[#716B56]/50 hover:bg-[#716B56] text-[#FBF4C4] border border-[#716B56] rounded-xl font-medium text-xs transition-colors"
        >
          Got it, Close
        </button>
      </div>
    </div>
  );
};
