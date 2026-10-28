import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageSquare, 
  Sparkles 
} from 'lucide-react';
import { CLINIC_NAME, CLINIC_TITLE, formatPhoneNumber } from '../services/clinicData';

interface ContactPageProps {
  onNavigate?: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in text-white">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B2724] border border-[#F1BB09]/40 text-[#F1BB09] text-xs font-semibold uppercase tracking-wider mb-3">
          <Phone className="w-3.5 h-3.5" />
          Get In Touch
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Contact Our Clinic
        </h1>
        <p className="mt-3 text-[#FBF4C4]/85 text-base sm:text-lg">
          We’re here to assist you with booking inquiries, treatment questions, or special health accommodations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#F1BB09] border-b border-white/10 pb-4">
              {CLINIC_NAME} Details
            </h3>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FBF4C4]/60">Location</p>
                <p className="text-white font-medium text-sm mt-0.5">
                  Suite 402, Wellness Center Plaza, Calgary, AB, Canada
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FBF4C4]/60">Treatment Hours</p>
                <p className="text-white font-semibold text-sm mt-0.5">
                  Monday – Sunday: 9:00 AM – 6:00 PM
                </p>
                <p className="text-xs text-stone-400 mt-0.5">
                  Appointments by reservation. Final session concludes by 6:00 PM.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FBF4C4]/60">Direct Phone</p>
                <p className="text-white font-medium text-sm mt-0.5">
                  415-555-0199
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FBF4C4]/60">Email</p>
                <p className="text-white font-medium text-sm mt-0.5">
                  contact@charleneagdanrmt.com
                </p>
              </div>
            </div>
          </div>

          {/* Quick Notice Banner */}
          <div className="bg-[#1B2724] border border-[#F1BB09]/40 rounded-3xl p-6 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F1BB09] text-[#1A1A1A] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-[#F1BB09]">Book Online 24/7</p>
              <p className="text-xs text-[#FBF4C4]/80 mt-0.5">
                Appointments can be booked instantly with live availability between 9:00 AM – 6:00 PM.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F1BB09] font-mono mb-2">
            <MessageSquare className="w-4 h-4 text-[#F1BB09]" />
            Send a Direct Message
          </div>
          <h3 className="text-2xl font-serif font-bold text-white mb-6">
            Inquiries &amp; Consultations
          </h3>

          {submitted ? (
            <div className="bg-[#161E1A] border border-[#0D9488] rounded-2xl p-8 text-center animate-fade-in">
              <CheckCircle className="w-12 h-12 text-[#0D9488] mx-auto mb-3" />
              <h4 className="text-xl font-serif font-bold text-white mb-1">
                Thank You! Message Received
              </h4>
              <p className="text-[#FBF4C4]/80 text-sm">
                We have received your message. Our clinic coordinator will respond shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jessica Ramos"
                  className="w-full px-4 py-3 rounded-xl translucent-input text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl translucent-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1.5">
                    Phone Number (000-000-0000)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength={12}
                    placeholder="000-000-0000"
                    className="w-full px-4 py-3 rounded-xl translucent-input text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1.5">
                  Message / Health Preferences
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your musculoskeletal concerns, injury history, or preferences..."
                  className="w-full px-4 py-3 rounded-xl translucent-input text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 btn-primary-gold rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
