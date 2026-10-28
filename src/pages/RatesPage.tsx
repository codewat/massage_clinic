import React from 'react';
import { 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  LogIn, 
  ShieldCheck, 
  Info,
  Calendar
} from 'lucide-react';
import { SERVICE_RATES, CLINIC_NAME } from '../services/clinicData';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in text-white">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B2724] border border-[#F1BB09]/40 text-[#F1BB09] text-xs font-semibold uppercase tracking-wider mb-3">
          <Clock className="w-3.5 h-3.5" />
          Transparent &amp; Professional Rates
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Massage Therapy Rates &amp; Durations
        </h1>
        <p className="mt-3 text-[#FBF4C4]/85 text-base sm:text-lg">
          Select your desired treatment length for personalized musculoskeletal recovery.
        </p>
      </div>

      {/* Mandatory Information Notes Box */}
      <div className="max-w-4xl mx-auto glass-card border border-[#F1BB09]/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-[#F1BB09] text-[#1A1A1A] flex items-center justify-center shrink-0 mt-0.5 shadow-md">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-4 flex-1">
            <h3 className="text-lg font-serif font-bold text-[#F1BB09]">
              Important Booking &amp; Treatment Information
            </h3>

            {/* Note 1: Please login first to book appointment */}
            {!isAuthenticated && (
              <div className="p-3.5 bg-[#161E1A] border border-[#F1BB09]/40 rounded-xl text-sm font-medium text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  🔒 <span><strong>Please login first to book appointment.</strong></span>
                </span>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-1.5 btn-primary-gold rounded-lg text-xs font-bold shrink-0 self-start sm:self-auto"
                >
                  Login Now
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {/* Note 2: Personalized Experience / Body Part Focus */}
              <div className="bg-[#161E1A]/85 p-4 rounded-2xl border border-white/10">
                <p className="font-bold text-[#F1BB09] mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F1BB09]" />
                  Personalized Experience
                </p>
                <p className="text-[#FBF4C4]/85 leading-relaxed">
                  <strong>Body Part Focus:</strong> During booking you can specify which part of your body you would want to focus on (e.g. back, shoulder, arms).
                </p>
              </div>

              {/* Note 3: Professional Assessment */}
              <div className="bg-[#161E1A]/85 p-4 rounded-2xl border border-white/10">
                <p className="font-bold text-[#F1BB09] mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#F1BB09]" />
                  Professional Assessment
                </p>
                <p className="text-[#FBF4C4]/85 leading-relaxed">
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
              className={`relative glass-card rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                isPopular
                  ? 'border-[#F1BB09] shadow-2xl ring-2 ring-[#F1BB09]/40 md:-translate-y-2'
                  : 'border-white/10 hover:border-[#F1BB09]/50'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F1BB09] text-[#1A1A1A] text-[11px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#F1BB09] font-mono mb-1">
                  Option 0{idx + 1}
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">
                  {rate.duration} Minutes
                </h3>

                <div className="my-4 pb-4 border-b border-white/10">
                  <span className="text-4xl font-serif font-bold text-[#F1BB09]">
                    ${rate.price}
                  </span>
                  <span className="text-stone-300 text-xs ml-1">/ session</span>
                </div>

                <p className="text-[#FBF4C4]/75 text-xs leading-relaxed mb-4">
                  {rate.description}
                </p>

                <ul className="space-y-2 text-xs text-stone-300 mb-6">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                    <span>Targeted muscle group selection</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                    <span>On-site posture assessment</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                    <span>Therapeutic organic oil blend</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleBookSession(rate.duration)}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all ${
                  isPopular
                    ? 'btn-primary-gold shadow-md active:scale-95'
                    : 'bg-[#716B56] hover:bg-[#5D5846] text-[#FBF4C4] active:scale-95'
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
                    Book {rate.duration} Mins
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Simple 3-Step Guide */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 max-w-4xl mx-auto">
        <h3 className="text-2xl font-serif font-bold text-white text-center mb-8">
          How Scheduling Works at {CLINIC_NAME}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] font-bold flex items-center justify-center mx-auto text-lg">
              1
            </div>
            <h4 className="font-semibold text-white text-sm">Select Duration &amp; Focus</h4>
            <p className="text-[#FBF4C4]/70 text-xs">
              Pick from 30 to 90 minutes and choose the muscle groups needing care.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] font-bold flex items-center justify-center mx-auto text-lg">
              2
            </div>
            <h4 className="font-semibold text-white text-sm">Pick Date &amp; Time (9am–6pm)</h4>
            <p className="text-[#FBF4C4]/70 text-xs">
              Select available time slots between 9:00 AM and 6:00 PM with real-time slot checking.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] font-bold flex items-center justify-center mx-auto text-lg">
              3
            </div>
            <h4 className="font-semibold text-white text-sm">Instant Confirmation</h4>
            <p className="text-[#FBF4C4]/70 text-xs">
              Receive your confirmed appointment slot immediately on your client dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
