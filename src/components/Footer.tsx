import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';
import { CLINIC_NAME, CLINIC_TITLE } from '../services/clinicData';
import { useAuth } from '../context/AuthContext';

export const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="bg-[#161E1A]/95 text-stone-300 pt-16 pb-12 border-t border-white/10 mt-auto backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#1B2724] border border-[#F1BB09]/40 text-[#F1BB09] flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white tracking-tight">
                  {CLINIC_NAME}
                </span>
                <p className="text-[11px] text-[#F1BB09] tracking-wider uppercase font-medium">
                  {CLINIC_TITLE}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#FBF4C4]/80 leading-relaxed">
              Dedicated clinical massage therapy, injury recovery, and personalized therapeutic treatments focused on restoring physical balance.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#0D9488]">
              <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse"></span>
              Open Daily: 9:00 AM – 6:00 PM
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[#F1BB09] font-bold text-xs uppercase tracking-wider font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {!isAuthenticated ? (
                <>
                  <li>
                    <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                      Home
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('rates')} className="hover:text-white transition-colors">
                      Rates &amp; Services
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                      Contact &amp; Location
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button onClick={() => onNavigate('client-dashboard')} className="hover:text-white transition-colors">
                      My Dashboard
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('view-appointments')} className="hover:text-white transition-colors">
                      My Appointments
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('view-profile')} className="hover:text-white transition-colors">
                      My Profile
                    </button>
                  </li>
                </>
              )}
              <li>
                <button 
                  onClick={() => onNavigate('book-appointment')} 
                  className="text-[#F1BB09] hover:underline font-semibold transition-colors flex items-center gap-1"
                >
                  Book an Appointment →
                </button>
              </li>
            </ul>
          </div>

          {/* Session Rates */}
          <div className="space-y-3">
            <h4 className="text-[#F1BB09] font-bold text-xs uppercase tracking-wider font-mono">
              Treatment Rates
            </h4>
            <ul className="space-y-1.5 text-xs text-[#FBF4C4]/85">
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>30 Minutes:</span> 
                <strong className="text-[#F1BB09]">$65</strong>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>45 Minutes:</span> 
                <strong className="text-[#F1BB09]">$90</strong>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>60 Minutes:</span> 
                <strong className="text-[#F1BB09]">$115</strong>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>75 Minutes:</span> 
                <strong className="text-[#F1BB09]">$140</strong>
              </li>
              <li className="flex justify-between">
                <span>90 Minutes:</span> 
                <strong className="text-[#F1BB09]">$160</strong>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-[#F1BB09] font-bold text-xs uppercase tracking-wider font-mono">
              Clinic Contact
            </h4>
            <div className="space-y-2.5 text-xs text-[#FBF4C4]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                <span>Suite 402, Wellness Center Plaza, Calgary, AB</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>415-555-0199</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>contact@charleneagdanrmt.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>Mon – Sun: 9:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {CLINIC_NAME}. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[#FBF4C4]/70">
            Professional Registered Massage Therapy &amp; Musculoskeletal Health
          </p>
        </div>
      </div>
    </footer>
  );
};
