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

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold uppercase tracking-wider mb-3">
          <Phone className="w-3.5 h-3.5" />
          Get In Touch
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Contact Our Clinic
        </h1>
        <p className="mt-4 text-stone-600 text-base sm:text-lg">
          We’re here to assist you with booking inquiries, customized corporate wellness, or special accommodations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-spa-200 shadow-sm space-y-6">
            <h3 className="text-xl font-serif font-bold text-stone-900 border-b border-stone-100 pb-4">
              Clinic Information
            </h3>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-sage-100 text-sage-800 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Location Address</p>
                <p className="text-stone-800 font-medium text-sm mt-0.5">
                  Suite 402, Serenity Wellness Tower, Cebu Business Park, Cebu City, Philippines
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-sage-100 text-sage-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Clinic Working Hours</p>
                <p className="text-stone-800 font-semibold text-sm mt-0.5">
                  Monday – Sunday: 9:00 AM – 6:00 PM
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  Last session starts at 5:00 PM or 5:30 PM depending on duration.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-sage-100 text-sage-800 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Direct Telephone &amp; Mobile</p>
                <p className="text-stone-800 font-medium text-sm mt-0.5">
                  (032) 412-8900
                </p>
                <p className="text-stone-800 font-medium text-sm">
                  +63 917 888 2468 (SMS / WhatsApp)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-sage-100 text-sage-800 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Email Inquiries</p>
                <p className="text-stone-800 font-medium text-sm mt-0.5">
                  appointments@serenitymassageclinic.com
                </p>
              </div>
            </div>
          </div>

          {/* Quick Notice Banner */}
          <div className="bg-sage-900 text-white rounded-3xl p-6 shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-spa-300" />
            </div>
            <div>
              <p className="font-semibold text-sm text-stone-100">Looking to book right away?</p>
              <p className="text-xs text-stone-300 mt-0.5">
                Appointments can be booked directly online 24/7 with real-time slot checking!
              </p>
            </div>
          </div>
        </div>

        {/* Contact Message Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-spa-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400 font-mono mb-2">
            <MessageSquare className="w-4 h-4 text-sage-600" />
            Send Us a Message
          </div>
          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">
            How Can We Help You?
          </h3>

          {submitted ? (
            <div className="bg-sage-50 border border-sage-300 rounded-2xl p-8 text-center animate-fade-in">
              <CheckCircle className="w-12 h-12 text-sage-700 mx-auto mb-3" />
              <h4 className="text-xl font-serif font-bold text-stone-800 mb-1">
                Salamat! Message Received
              </h4>
              <p className="text-stone-600 text-sm">
                Nakuha na namo ang imong mensahe. Motubag ang among clinic coordinator sa labing madaling panahon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Juan dela Cruz"
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0917-000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Message / Special Request
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your preferences or inquiries..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-sage-700 hover:bg-sage-800 text-white rounded-xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
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
