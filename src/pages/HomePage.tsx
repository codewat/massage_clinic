import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  HeartHandshake, 
  UserCheck, 
  Smartphone 
} from 'lucide-react';
import { SERVICE_RATES } from '../services/clinicData';
import { useAuth } from '../context/AuthContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section with bg.jpeg */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bg.jpeg"
            alt="Serenity Massage Clinic Ambiance"
            className="w-full h-full object-cover object-center scale-105 filter brightness-90 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/70 to-stone-950/85 backdrop-blur-[1px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-spa-200 text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-spa-300" />
            Personalized Clinical Massage & Therapeutic Healing
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white mb-6 leading-tight">
            Rest, Realign &amp; <br />
            <span className="italic font-normal text-spa-200">Rejuvenate Your Body</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-stone-200 font-light mb-10 leading-relaxed">
            Experience therapeutic treatments tailored directly to your pain points. 
            Choose your duration, specify target body parts, and let certified therapists restore your physical balance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate(isAuthenticated ? (isAdmin ? 'admin-dashboard' : 'book-appointment') : 'login')}
              className="w-full sm:w-auto px-8 py-4 bg-sage-600 hover:bg-sage-500 text-white rounded-2xl font-semibold shadow-lg shadow-sage-900/40 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment Now
            </button>

            <button
              onClick={() => onNavigate('rates')}
              className="w-full sm:w-auto px-8 py-4 bg-white/15 hover:bg-white/25 text-white rounded-2xl font-medium backdrop-blur-md border border-white/30 flex items-center justify-center gap-2 transition-all"
            >
              View Rates &amp; Services
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Highlights bar */}
          <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-spa-200" />
              </div>
              <div>
                <p className="text-xs text-stone-400">Hours</p>
                <p className="text-sm font-semibold text-white">9:00 AM – 6:00 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-spa-200" />
              </div>
              <div>
                <p className="text-xs text-stone-400">Assessment</p>
                <p className="text-sm font-semibold text-white">Professional On-Site</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5 text-spa-200" />
              </div>
              <div>
                <p className="text-xs text-stone-400">Customized</p>
                <p className="text-sm font-semibold text-white">Body Part Focus</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-spa-200" />
              </div>
              <div>
                <p className="text-xs text-stone-400">Vercel PWA</p>
                <p className="text-sm font-semibold text-white">Install on Phone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-widest text-sage-700 font-mono mb-2">
            The Serenity Standard
          </h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-4">
            Customized For Your Body’s Exact Needs
          </h3>
          <p className="text-stone-600 leading-relaxed">
            Unlike one-size-fits-all massages, our clinic blends clinical musculoskeletal assessment with relaxing therapeutic modalities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-spa-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-sage-100 text-sage-800 flex items-center justify-center mb-6">
              <UserCheck className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-serif font-bold text-stone-900 mb-2">
              Body Part Focus
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              During online booking, specify exactly which muscle groups require attention (such as neck, shoulders, arms, lower back, or legs).
            </p>
            <div className="text-xs font-medium text-sage-700 bg-sage-50 px-3 py-2 rounded-xl inline-block">
              ✓ Fully customized per session
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-spa-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-spa-200 text-spa-800 flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-serif font-bold text-stone-900 mb-2">
              Professional On-Site Assessment
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              Our registered massage therapists conduct a targeted pre-session evaluation to pinpoint muscle tension and select optimal techniques.
            </p>
            <div className="text-xs font-medium text-spa-800 bg-spa-100 px-3 py-2 rounded-xl inline-block">
              ✓ Included in all bookings
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-spa-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
              <Clock className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-serif font-bold text-stone-900 mb-2">
              Rested &amp; Ready Therapists
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              We enforce strict buffer intervals between client bookings to ensure our therapists are refreshed, sanitized, and dedicated 100% to your care.
            </p>
            <div className="text-xs font-medium text-amber-800 bg-amber-50 px-3 py-2 rounded-xl inline-block">
              ✓ Guaranteed quality care
            </div>
          </div>
        </div>
      </section>

      {/* Quick Rates Snapshot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-spa-300 font-mono">
                Simple &amp; Transparent Pricing
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">
                Session Rates &amp; Durations
              </h3>
            </div>
            <button
              onClick={() => onNavigate('rates')}
              className="text-spa-300 hover:text-white flex items-center gap-1.5 text-sm font-semibold transition-colors"
            >
              See full rates details &amp; notes <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SERVICE_RATES.map((rate) => (
              <div
                key={rate.duration}
                onClick={() => onNavigate('rates')}
                className="bg-white/10 hover:bg-white/15 border border-white/15 p-5 rounded-2xl cursor-pointer transition-all hover:scale-105 text-center flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs text-stone-300 font-medium">{rate.duration} Minutes</span>
                  <div className="text-3xl font-serif font-bold text-spa-200 mt-2">${rate.price}</div>
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

