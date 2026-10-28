import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';
import { 
  CalendarPlus, 
  CalendarCheck, 
  UserCircle, 
  Sparkles, 
  Clock, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { formatDisplayTime } from '../services/clinicData';

interface ClientDashboardPageProps {
  onNavigate: (page: string) => void;
}

export const ClientDashboardPage: React.FC<ClientDashboardPageProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { getClientAppointments } = useAppointments();

  const userAppointments = currentUser ? getClientAppointments(currentUser.id) : [];
  const upcomingAppointments = userAppointments.filter(a => a.status === 'confirmed');
  const nextAppointment = upcomingAppointments[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-sage-800 via-sage-700 to-stone-850 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 transform skew-x-12 pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            {currentUser?.profilePic ? (
              <img
                src={currentUser.profilePic}
                alt="Profile"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-white/20 shadow-md shrink-0"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-2xl shrink-0">
                {currentUser?.firstName?.[0] || 'U'}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-mono text-spa-200">
                  Welcome to Serenity
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Maayong Adlaw, {currentUser?.preferredName || currentUser?.firstName}!
              </h1>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-md">
                Unsa ang imong plano karon? Pwede ka mag-book ug bag-ong sesyon o motan-aw sa imong appointments.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shrink-0 w-full sm:w-auto">
            <p className="text-xs text-stone-300">Total Bookings</p>
            <p className="text-2xl font-bold font-serif text-spa-200 mt-0.5">
              {userAppointments.length}
            </p>
          </div>
        </div>
      </div>

      {/* Primary 3 Action Buttons / Cards (As specifically requested by user) */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 font-mono mb-4">
          Unsa ang gusto nimo buhaton? (Quick Actions)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Book Appointment */}
          <div
            onClick={() => onNavigate('book-appointment')}
            className="group bg-white rounded-3xl p-6 sm:p-8 border-2 border-sage-600/30 hover:border-sage-600 shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sage-700 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                <CalendarPlus className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
                Book Appointment
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Pili ug oras (9am - 6pm), petsa, gidugayon (30m - 90m), ug i-specify ang target body parts nga gusto nimo ipa-focus.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-sage-800 font-semibold text-xs tracking-wide">
              <span>Mag-book Karon</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. View Appointments */}
          <div
            onClick={() => onNavigate('view-appointments')}
            className="group bg-white rounded-3xl p-6 sm:p-8 border border-spa-200 hover:border-sage-500 shadow-sm hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-spa-200 text-spa-900 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm">
                <CalendarCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
                View Appointments
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Tan-awa ang tanan nimo nga upcoming ug previous appointments, apil ang status (Confirmed, Done, o Cancelled).
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-stone-800 font-semibold text-xs tracking-wide">
              <span>Tan-awa ang Listahan ({userAppointments.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. View Profile */}
          <div
            onClick={() => onNavigate('view-profile')}
            className="group bg-white rounded-3xl p-6 sm:p-8 border border-spa-200 hover:border-sage-500 shadow-sm hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm">
                <UserCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
                View &amp; Edit Profile
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                I-update ang imong First Name, Preferred Name, Last Name, Phone Number, Email, Home Address, o Profile Picture.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-stone-800 font-semibold text-xs tracking-wide">
              <span>I-manage ang Profile</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Next Upcoming Appointment Spotlight (if any) */}
      {nextAppointment && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="font-serif font-bold text-stone-900 text-lg">
                Imong Sunod nga Appointment (Upcoming)
              </h3>
            </div>
            <button
              onClick={() => onNavigate('view-appointments')}
              className="text-xs font-semibold text-sage-700 hover:text-sage-900"
            >
              Tan-awon Tanan →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm bg-spa-50 p-4 rounded-2xl">
            <div>
              <span className="text-xs text-stone-500 block">Petsa &amp; Oras:</span>
              <p className="font-semibold text-stone-900 mt-0.5">
                {nextAppointment.date} @ {formatDisplayTime(nextAppointment.startTime)}
              </p>
            </div>

            <div>
              <span className="text-xs text-stone-500 block">Gidugayon:</span>
              <p className="font-semibold text-stone-900 mt-0.5">
                {nextAppointment.duration} Mins (${nextAppointment.price})
              </p>
            </div>

            <div>
              <span className="text-xs text-stone-500 block">Body Focus:</span>
              <p className="font-semibold text-stone-900 mt-0.5">
                {nextAppointment.bodyPartFocus.join(', ') || 'General Relief'}
              </p>
            </div>

            <div className="flex items-center justify-end">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Confirmed
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
