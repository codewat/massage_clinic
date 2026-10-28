import React from 'react';
import { 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  LogIn, 
  ShieldCheck, 
  Info,
  Calendar
} from 'lucide-react';
import { SERVICE_RATES } from '../services/clinicData';
import { useAuth } from '../context/AuthContext';

interface RatesPageProps {
  onNavigate: (page: string) => void;
  onSelectDuration?: (duration: number) => void;
}

export const RatesPage: React.FC<RatesPageProps> = ({ onNavigate, onSelectDuration }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  const handleBookSession = (duration: number) => {
    if (onSelectDuration) {
      onSelectDuration(duration);
    }
    if (!isAuthenticated) {
      onNavigate('login');
    } else if (isAdmin) {
      onNavigate('admin-dashboard');
    } else {
      onNavigate('book-appointment');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold uppercase tracking-wider mb-3">
          <Clock className="w-3.5 h-3.5" />
          Transparent &amp; Honest Pricing
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Massage Therapy Rates &amp; Durations
        </h1>
        <p className="mt-4 text-stone-600 text-base sm:text-lg">
          Choose the ideal session length for your relaxation and rehabilitation needs.
        </p>
      </div>

      {/* Critical Information Notes Box */}
      <div className="max-w-4xl mx-auto bg-amber-50/80 border border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-amber-950">
              Important Booking &amp; Treatment Notes
            </h3>

            {/* Note 1: Login Requirement */}
            {!isAuthenticated && (
              <div className="p-3 bg-white/90 border border-amber-300 rounded-xl text-sm font-medium text-amber-900 flex items-center justify-between gap-3">
                <span>
                  🔒 <strong>Please login first to book appointment.</strong>
                </span>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-3 py-1 bg-amber-800 text-white rounded-lg text-xs font-semibold hover:bg-amber-900 shrink-0"
                >
                  Login Now
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-stone-800">
              {/* Note 2: Personalized Experience / Body Part Focus */}
              <div className="bg-white/80 p-4 rounded-2xl border border-amber-200">
                <p className="font-bold text-amber-900 mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Personalized Experience
                </p>
                <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                  <strong>Body Part Focus:</strong> During booking you can specify which part of your body you would want to focus on (e.g. back, shoulder, arms).
                </p>
              </div>

              {/* Note 3: Professional Assessment */}
              <div className="bg-white/80 p-4 rounded-2xl border border-amber-200">
                <p className="font-bold text-amber-900 mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  Professional Assessment
                </p>
                <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                  We also provide on-site assessment to determine the best massage technique for your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {SERVICE_RATES.map((rate, idx) => {
          const isPopular = rate.duration === 60;
          return (
            <div
              key={rate.duration}
              className={`relative bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                isPopular
                  ? 'border-sage-500 shadow-xl ring-2 ring-sage-400/40 md:-translate-y-2'
                  : 'border-spa-200 shadow-sm hover:shadow-md hover:border-spa-300'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sage-700 text-white text-[11px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-sm">
                  Most Popular
                </div>
              )}

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-mono mb-1">
                  Session Option 0{idx + 1}
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                  {rate.duration} Minutes
                </h3>

                <div className="my-4 pb-4 border-b border-stone-100">
                  <span className="text-4xl font-serif font-bold text-stone-900">
                    ${rate.price}
                  </span>
                  <span className="text-stone-500 text-xs ml-1">/ session</span>
                </div>

                <p className="text-stone-600 text-xs leading-relaxed mb-4">
                  {rate.description}
                </p>

                <ul className="space-y-2 text-xs text-stone-600 mb-6">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                    <span>Choose target body parts</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                    <span>On-site posture assessment</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                    <span>Aromatherapy oil included</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleBookSession(rate.duration)}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-xs tracking-wide flex items-center justify-center gap-1.5 transition-all ${
                  isPopular
                    ? 'bg-sage-700 hover:bg-sage-800 text-white shadow-md active:scale-95'
                    : 'bg-spa-100 hover:bg-spa-200 text-stone-800 active:scale-95'
                }`}
              >
                {!isAuthenticated ? (
                  <>
                    <LogIn className="w-3.5 h-3.5" />
                    Login to Book
                  </>
                ) : (
                  <>
                    <Calendar className="w-3.5 h-3.5" />
                    Book {rate.duration}min
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Booking Process Steps */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-spa-200 shadow-sm max-w-4xl mx-auto">
        <h3 className="text-2xl font-serif font-bold text-stone-900 text-center mb-8">
          How Our Booking Works
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-800 font-bold flex items-center justify-center mx-auto text-lg">
              1
            </div>
            <h4 className="font-semibold text-stone-900 text-sm">Select Duration &amp; Focus</h4>
            <p className="text-stone-500 text-xs">
              Choose your session length and check which muscle groups need attention.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-800 font-bold flex items-center justify-center mx-auto text-lg">
              2
            </div>
            <h4 className="font-semibold text-stone-900 text-sm">Pick Date &amp; Time (9am–6pm)</h4>
            <p className="text-stone-500 text-xs">
              View real-time availability between 9:00 AM and 6:00 PM without conflicts.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-800 font-bold flex items-center justify-center mx-auto text-lg">
              3
            </div>
            <h4 className="font-semibold text-stone-900 text-sm">Instant Confirmation</h4>
            <p className="text-stone-500 text-xs">
              Receive your confirmed appointment slot immediately on your client dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

