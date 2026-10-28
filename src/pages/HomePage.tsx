import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  HeartHandshake, 
  UserCheck, 
  Smartphone 
} from 'lucide-react';
import { SERVICE_RATES, CLINIC_NAME, CLINIC_TITLE } from '../services/clinicData';
import { useAuth } from '../context/AuthContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="space-y-16 pb-20 animate-fade-in">
      {/* Hero Content */}
      <section className="relative min-h-[540px] lg:min-h-[600px] flex items-center justify-center pt-8 pb-12">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B2724]/80 backdrop-blur-md border border-[#F1BB09]/40 text-[#F1BB09] text-xs sm:text-sm font-medium mb-6 shadow-md">
            <Sparkles className="w-4 h-4 text-[#F1BB09]" />
            Registered Massage Therapy &amp; Clinical Recovery
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white mb-6 leading-tight">
            Therapeutic Relief &amp; <br />
            <span className="italic font-normal text-[#F1BB09]">Restorative Bodywork</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#FBF4C4]/90 font-light mb-10 leading-relaxed drop-shadow-sm">
            Experience clinical massage treatments tailored specifically to your body's pain points.
            Select your session duration, specify target muscle focus, and receive dedicated one-on-one professional care.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate(isAuthenticated ? (isAdmin ? 'admin-dashboard' : 'book-appointment') : 'login')}
              className="w-full sm:w-auto px-8 py-4 btn-primary-gold rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2.5 transition-all text-sm tracking-wide"
            >
              <Calendar className="w-5 h-5 text-[#1A1A1A]" />
              Book Appointment Now
            </button>

            <button
              onClick={() => onNavigate('rates')}
              className="w-full sm:w-auto px-8 py-4 bg-[#1B2724]/80 hover:bg-[#1B2724] text-[#FBF4C4] rounded-2xl font-semibold backdrop-blur-md border border-[#716B56] flex items-center justify-center gap-2 transition-all text-sm"
            >
              View Rates &amp; Durations
              <ArrowRight className="w-4 h-4 text-[#F1BB09]" />
            </button>
          </div>

          {/* Key Feature Highlights Pill Bar */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="glass-card-subtle p-3 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/30 border border-[#0D9488]/50 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#F1BB09]" />
              </div>
              <div>
                <p className="text-[11px] text-stone-400">Clinic Hours</p>
                <p className="text-xs sm:text-sm font-semibold text-white">9:00 AM – 6:00 PM</p>
              </div>
            </div>

            <div className="glass-card-subtle p-3 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/30 border border-[#0D9488]/50 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#F1BB09]" />
              </div>
              <div>
                <p className="text-[11px] text-stone-400">Assessment</p>
                <p className="text-xs sm:text-sm font-semibold text-white">On-Site Evaluation</p>
              </div>
            </div>

            <div className="glass-card-subtle p-3 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/30 border border-[#0D9488]/50 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5 text-[#F1BB09]" />
              </div>
              <div>
                <p className="text-[11px] text-stone-400">Customized</p>
                <p className="text-xs sm:text-sm font-semibold text-white">Body Part Focus</p>
              </div>
            </div>

            <div className="glass-card-subtle p-3 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/30 border border-[#0D9488]/50 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-[#F1BB09]" />
              </div>
              <div>
                <p className="text-[11px] text-stone-400">Mobile Ready</p>
                <p className="text-xs sm:text-sm font-semibold text-white">Download as App</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#F1BB09] font-mono mb-2">
            Clinical Standards
          </h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Customized For Your Recovery &amp; Wellness
          </h3>
          <p className="text-[#FBF4C4]/80 text-sm sm:text-base leading-relaxed">
            Every appointment at {CLINIC_NAME} blends orthopedic clinical evaluation with deep relaxation techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8 rounded-3xl space-y-4 hover:border-[#F1BB09]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] flex items-center justify-center shadow-md">
              <UserCheck className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-serif font-bold text-white">
              Targeted Body Part Focus
            </h4>
            <p className="text-[#FBF4C4]/75 text-xs sm:text-sm leading-relaxed">
              During online booking, specify precisely which muscle groups require attention—such as back, shoulders, arms, neck, or lower lumbar.
            </p>
            <div className="text-xs font-bold text-[#F1BB09] bg-[#161E1A] px-3 py-1.5 rounded-xl inline-block border border-white/10">
              ✓ Fully Personalized Experience
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4 hover:border-[#F1BB09]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#716B56]/40 border border-[#716B56] text-[#F1BB09] flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-serif font-bold text-white">
              Professional Assessment
            </h4>
            <p className="text-[#FBF4C4]/75 text-xs sm:text-sm leading-relaxed">
              We provide an on-site postural and tension assessment prior to every treatment session to identify the ideal massage modalities.
            </p>
            <div className="text-xs font-bold text-[#F1BB09] bg-[#161E1A] px-3 py-1.5 rounded-xl inline-block border border-white/10">
              ✓ Included in Every Booking
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4 hover:border-[#F1BB09]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] flex items-center justify-center shadow-md">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-serif font-bold text-white">
              Clean, Rested Environment
            </h4>
            <p className="text-[#FBF4C4]/75 text-xs sm:text-sm leading-relaxed">
              Strict sanitization and therapist rest buffer intervals are scheduled between sessions to guarantee full energy and pristine care.
            </p>
            <div className="text-xs font-bold text-[#F1BB09] bg-[#161E1A] px-3 py-1.5 rounded-xl inline-block border border-white/10">
              ✓ Highest Hygiene Standards
            </div>
          </div>
        </div>
      </section>

      {/* Snapshot Rates */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/15">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F1BB09] font-mono">
                Transparent Pricing
              </span>
              <h3 className="text-3xl font-serif font-bold text-white mt-1">
                Treatment Rates &amp; Durations
              </h3>
            </div>
            <button
              onClick={() => onNavigate('rates')}
              className="text-[#F1BB09] hover:underline flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-colors"
            >
              See full rates &amp; notes <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {SERVICE_RATES.map((rate) => (
              <div
                key={rate.duration}
                onClick={() => onNavigate('rates')}
                className="bg-[#161E1A]/80 hover:bg-[#1B2724] border border-white/10 hover:border-[#F1BB09]/50 p-5 rounded-2xl cursor-pointer transition-all hover:scale-105 text-center flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs text-[#FBF4C4]/70 font-medium">{rate.duration} Minutes</span>
                  <div className="text-3xl font-serif font-bold text-[#F1BB09] mt-2">${rate.price}</div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-stone-300 line-clamp-2">
                  {rate.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
