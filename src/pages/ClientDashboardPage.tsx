import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';
import { 
  CalendarPlus, 
  CalendarCheck, 
  UserCircle, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { formatDisplayTime, CLINIC_NAME } from '../services/clinicData';

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in text-white">
      {/* Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/15 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            {currentUser?.profilePic ? (
              <img
                src={currentUser.profilePic}
                alt="Profile"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-[#F1BB09] shadow-lg shrink-0"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0D9488] text-white flex items-center justify-center font-bold text-2xl shrink-0 ring-4 ring-[#F1BB09]">
                {currentUser?.firstName?.[0] || 'U'}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-mono text-[#F1BB09]">
                  Welcome to {CLINIC_NAME}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Hello, {currentUser?.preferredName || currentUser?.firstName}!
              </h1>
              <p className="text-xs sm:text-sm text-[#FBF4C4]/80 mt-1 max-w-md">
                Schedule a new therapy session, review your previous bookings, or update your personal account details.
              </p>
            </div>
          </div>

          <div className="bg-[#161E1A]/80 border border-white/10 rounded-2xl p-4 text-center shrink-0 w-full sm:w-auto">
            <p className="text-xs text-[#FBF4C4]/60">Total Bookings</p>
            <p className="text-2xl font-bold font-serif text-[#F1BB09] mt-0.5">
              {userAppointments.length}
            </p>
          </div>
        </div>
      </div>

      {/* 3 Primary Action Buttons specifically required */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#F1BB09] font-mono mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Book Appointment */}
          <div
            onClick={() => onNavigate('book-appointment')}
            className="group glass-card rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#F1BB09] transition-all cursor-pointer transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#F1BB09] text-[#1A1A1A] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-lg">
                <CalendarPlus className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                Book Appointment
              </h3>
              <p className="text-[#FBF4C4]/75 text-xs sm:text-sm leading-relaxed">
                Choose duration (30m - 90m), pick date and time slot (9:00 AM - 6:00 PM), and specify target muscle focus areas.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[#F1BB09] font-bold text-xs tracking-wide">
              <span>Schedule Session</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. View Appointments */}
          <div
            onClick={() => onNavigate('view-appointments')}
            className="group glass-card rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#0D9488] transition-all cursor-pointer transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#0D9488] text-white flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-lg">
                <CalendarCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                View Appointments
              </h3>
              <p className="text-[#FBF4C4]/75 text-xs sm:text-sm leading-relaxed">
                Browse all your upcoming and past massage treatments, including status badges (Confirmed, Done, or Cancelled).
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[#0D9488] font-bold text-xs tracking-wide">
              <span>View History ({userAppointments.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. View Profile */}
          <div
            onClick={() => onNavigate('view-profile')}
            className="group glass-card rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#716B56] transition-all cursor-pointer transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#716B56] text-[#FBF4C4] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-lg">
                <UserCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                View Profile
              </h3>
              <p className="text-[#FBF4C4]/75 text-xs sm:text-sm leading-relaxed">
                Update your name, preferred name, email, phone number (000-000-0000), home address, and profile picture.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[#FBF4C4] font-bold text-xs tracking-wide">
              <span>Manage Account</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Next Upcoming Appointment */}
      {nextAppointment && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#0D9488]/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488] animate-pulse"></span>
              <h3 className="font-serif font-bold text-white text-lg">
                Upcoming Appointment
              </h3>
            </div>
            <button
              onClick={() => onNavigate('view-appointments')}
              className="text-xs font-bold text-[#F1BB09] hover:underline"
            >
              View All Appointments →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm bg-[#161E1A]/80 p-4 rounded-2xl border border-white/10">
            <div>
              <span className="text-xs text-[#FBF4C4]/60 block">Date &amp; Time:</span>
              <p className="font-semibold text-white mt-0.5">
                {nextAppointment.date} @ {formatDisplayTime(nextAppointment.startTime)}
              </p>
            </div>

            <div>
              <span className="text-xs text-[#FBF4C4]/60 block">Duration &amp; Fee:</span>
              <p className="font-semibold text-white mt-0.5">
                {nextAppointment.duration} Mins (${nextAppointment.price})
              </p>
            </div>

            <div>
              <span className="text-xs text-[#FBF4C4]/60 block">Body Focus:</span>
              <p className="font-semibold text-white mt-0.5">
                {nextAppointment.bodyPartFocus.join(', ') || 'General Wellness'}
              </p>
            </div>

            <div className="flex items-center justify-end">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0D9488]/20 text-[#0D9488] border border-[#0D9488]/40">
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
