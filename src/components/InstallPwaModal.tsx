import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Check, Share, PlusSquare, X } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-spa-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-sage-100 text-sage-700 rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-inner">
            <Smartphone className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-stone-800">I-Download / I-Install ang App</h3>
          <p className="text-sm text-stone-500 mt-1">
            Mahimo nimo i-save kining app sa imong Cellphone (Android/iPhone) o Computer para dali ma-access bisan unsang orasa!
          </p>
        </div>

        {deferredPrompt ? (
          <button
            onClick={handleInstallClick}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-sage-700 hover:bg-sage-800 text-white rounded-xl font-semibold shadow-md transition-all active:scale-[0.99] mb-4"
          >
            <Download className="w-5 h-5" />
            I-Install Dayon Karon (1-Click)
          </button>
        ) : null}

        <div className="space-y-4 text-left bg-spa-50 p-4 rounded-2xl border border-spa-200/80 mb-6 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-sage-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              iOS
            </div>
            <div>
              <p className="font-semibold text-stone-800">Para sa iPhone / iPad (Safari):</p>
              <p className="text-stone-600 text-xs mt-0.5 flex items-center gap-1.5 flex-wrap">
                1. I-tap ang <Share className="w-3.5 h-3.5 inline text-blue-600" /> <strong>Share</strong> button sa ubos.
                <br />
                2. Pilia ang <PlusSquare className="w-3.5 h-3.5 inline text-stone-700" /> <strong>"Add to Home Screen"</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2 border-t border-spa-200/60">
            <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              AND
            </div>
            <div>
              <p className="font-semibold text-stone-800">Para sa Android (Chrome):</p>
              <p className="text-stone-600 text-xs mt-0.5">
                1. I-tap ang <strong>3 dots (⋮)</strong> sa taas nga tuo.
                <br />
                2. Pilia ang <strong>"Install App"</strong> o <strong>"Add to Home screen"</strong>.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 px-4 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xl font-medium text-sm transition-colors"
        >
          Nasabtan / Close
        </button>
      </div>
    </div>
  );
};

