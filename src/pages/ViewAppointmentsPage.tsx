import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  CheckCheck, 
  Plus, 
  ArrowLeft 
} from 'lucide-react';
import { formatDisplayTime, CLINIC_NAME } from '../services/clinicData';

interface ViewAppointmentsPageProps {
  onNavigate: (page: string) => void;
}

export const ViewAppointmentsPage: React.FC<ViewAppointmentsPageProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { getClientAppointments, cancelAppointment } = useAppointments();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  const allUserAppointments = currentUser ? getClientAppointments(currentUser.id) : [];

  const filteredAppointments = allUserAppointments.filter((apt) => {
    if (filter === 'upcoming') {
      return apt.status === 'confirmed';
    }
    if (filter === 'past') {
      return apt.status === 'done' || apt.status === 'cancelled';
    }
    return true;
  });

  const handleCancel = (id: string) => {
    cancelAppointment(id);
    setConfirmCancelId(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('client-dashboard')}
          className="flex items-center gap-1.5 text-stone-300 hover:text-white text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#F1BB09]" />
          Back to Dashboard
        </button>

        <button
          onClick={() => onNavigate('book-appointment')}
          className="flex items-center gap-1.5 px-4 py-2 btn-primary-gold rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Book New Session
        </button>
      </div>

      <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">
            My Appointments
          </h1>
          <p className="text-[#FBF4C4]/80 text-xs sm:text-sm mt-1">
            Review your upcoming treatment schedule and past clinical history at {CLINIC_NAME}.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-[#161E1A] p-1 rounded-xl text-xs font-semibold border border-white/10">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'all' ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold shadow-sm' : 'text-stone-300 hover:text-white'
            }`}
          >
            All ({allUserAppointments.length})
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'upcoming' ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold shadow-sm' : 'text-stone-300 hover:text-white'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'past' ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold shadow-sm' : 'text-stone-300 hover:text-white'
            }`}
          >
            Past / Completed / Cancelled
          </button>
        </div>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border border-white/10 shadow-xl space-y-4">
          <Calendar className="w-12 h-12 text-[#716B56] mx-auto" />
          <h3 className="text-lg font-serif font-bold text-white">
            No Appointments Found
          </h3>
          <p className="text-[#FBF4C4]/70 text-xs max-w-sm mx-auto">
            You do not have any appointments under this filter. Would you like to schedule a new massage treatment?
          </p>
          <button
            onClick={() => onNavigate('book-appointment')}
            className="px-6 py-2.5 btn-primary-gold rounded-xl text-xs font-bold shadow-md transition-all"
          >
            Book Appointment Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((apt) => {
            const isConfirmed = apt.status === 'confirmed';
            const isDone = apt.status === 'done';
            const isCancelled = apt.status === 'cancelled';

            return (
              <div
                key={apt.id}
                className="glass-card rounded-3xl p-6 border border-white/10 shadow-lg space-y-4 hover:border-[#F1BB09]/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] flex items-center justify-center font-bold text-xs shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base font-serif font-bold text-white flex items-center gap-2">
                        <span>{apt.date}</span>
                        <span className="text-xs font-sans text-stone-400">•</span>
                        <span className="text-[#F1BB09]">{formatDisplayTime(apt.startTime)} – {formatDisplayTime(apt.endTime)}</span>
                      </div>
                      <p className="text-xs text-stone-400 font-mono">
                        Reference: {apt.id}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {isConfirmed && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0D9488]/20 text-[#0D9488] border border-[#0D9488]/40">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Confirmed
                      </span>
                    )}
                    {isDone && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#716B56]/40 text-[#FBF4C4] border border-[#716B56]">
                        <CheckCheck className="w-3.5 h-3.5" />
                        Done / Completed
                      </span>
                    )}
                    {isCancelled && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FF5252]/20 text-[#FF5252] border border-[#FF5252]/40">
                        <XCircle className="w-3.5 h-3.5" />
                        Cancelled
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#161E1A]/80 p-4 rounded-2xl border border-white/10">
                  <div>
                    <span className="text-stone-400 block font-medium">Session &amp; Price:</span>
                    <strong className="text-white text-sm">
                      {apt.duration} Minutes (<span className="text-[#F1BB09]">${apt.price}</span>)
                    </strong>
                  </div>

                  <div>
                    <span className="text-stone-400 block font-medium">Target Muscle Focus:</span>
                    <span className="text-white font-semibold">
                      {apt.bodyPartFocus.join(', ') || 'General Wellness'}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block font-medium">Professional Assessment:</span>
                    <span className="text-[#FBF4C4]">Included on-site</span>
                  </div>

                  {apt.customNotes && (
                    <div className="sm:col-span-3 pt-2 border-t border-white/10">
                      <span className="text-stone-400 block font-medium">Client Notes / Preferences:</span>
                      <p className="text-[#FBF4C4] italic">"{apt.customNotes}"</p>
                    </div>
                  )}
                </div>

                {/* Cancel Action */}
                {isConfirmed && (
                  <div className="flex items-center justify-end gap-3 pt-1">
                    {confirmCancelId === apt.id ? (
                      <div className="flex items-center gap-2 animate-fade-in text-xs">
                        <span className="text-[#FF5252] font-semibold">Are you sure you want to cancel?</span>
                        <button
                          onClick={() => handleCancel(apt.id)}
                          className="px-3 py-1 bg-[#FF5252] hover:bg-red-600 text-white rounded-lg font-bold"
                        >
                          Yes, Cancel
                        </button>
                        <button
                          onClick={() => setConfirmCancelId(null)}
                          className="px-3 py-1 bg-[#716B56] hover:bg-[#5D5846] text-[#FBF4C4] rounded-lg"
                        >
                          Keep
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmCancelId(apt.id)}
                        className="text-xs text-stone-400 hover:text-[#FF5252] underline font-medium transition-colors"
                      >
                        Cancel this appointment
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
