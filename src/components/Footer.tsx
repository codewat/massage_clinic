import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sage-700 text-white flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-spa-300" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Serenity Spa
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Your sanctuary for personalized therapeutic bodywork and rejuvenating clinical massage therapy.
            </p>
            <div className="flex items-center gap-2 text-xs text-sage-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Open Daily: 9:00 AM – 6:00 PM
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider font-mono">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rates')} className="hover:text-white transition-colors">
                  Rates & Pricing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact & Location
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('book-appointment')} className="text-sage-400 hover:text-sage-300 font-semibold transition-colors">
                  Book an Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Session Rates */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider font-mono">
              Session Rates
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li className="flex justify-between"><span>30 Minutes:</span> <strong className="text-stone-200">$65</strong></li>
              <li className="flex justify-between"><span>45 Minutes:</span> <strong className="text-stone-200">$90</strong></li>
              <li className="flex justify-between"><span>60 Minutes:</span> <strong className="text-stone-200">$115</strong></li>
              <li className="flex justify-between"><span>75 Minutes:</span> <strong className="text-stone-200">$140</strong></li>
              <li className="flex justify-between"><span>90 Minutes:</span> <strong className="text-stone-200">$160</strong></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider font-mono">
              Clinic Contact
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sage-400 shrink-0 mt-0.5" />
                <span>Suite 402, Serenity Wellness Tower, Cebu City, Philippines</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sage-400 shrink-0" />
                <span>(032) 412-8900 / 0917-888-2468</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sage-400 shrink-0" />
                <span>info@serenitymassageclinic.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-sage-400 shrink-0" />
                <span>Monday – Sunday: 9:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Serenity Massage Clinic & Wellness. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for complete therapeutic wellness.
          </p>
        </div>
      </div>
    </footer>
  );
};
