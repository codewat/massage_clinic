import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  CheckCheck, 
  AlertCircle, 
  Plus, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { formatDisplayTime } from '../services/clinicData';

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('client-dashboard')}
          className="flex items-center gap-1.5 text-stone-500 hover:text-stone-800 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <button
          onClick={() => onNavigate('book-appointment')}
          className="flex items-center gap-1.5 px-4 py-2 bg-sage-700 hover:bg-sage-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          Book New Session
        </button>
      </div>

      <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">
            My Appointments
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Tan-awa ang listahan sa imong gipang-book, apil ang mga nangagi nga sesyon ug status.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'all' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            All ({allUserAppointments.length})
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'upcoming' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'past' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Previous / Done / Cancelled
          </button>
        </div>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-spa-200 shadow-sm space-y-4">
          <Calendar className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-lg font-serif font-bold text-stone-800">
            Walay nakit-an nga appointment
          </h3>
          <p className="text-stone-500 text-xs max-w-sm mx-auto">
            Wala kay appointment ubos niining filter. Gusto ka ba mag-book ug bag-ong appointment?
          </p>
          <button
            onClick={() => onNavigate('book-appointment')}
            className="px-6 py-2.5 bg-sage-700 hover:bg-sage-800 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
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
                className="bg-white rounded-3xl p-6 border border-spa-200 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-sage-100 text-sage-800 flex items-center justify-center font-bold text-xs shrink-0">
                      <Clock className="w-5 h-5 text-sage-700" />
                    </div>
                    <div>
                      <div className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
                        <span>{apt.date}</span>
                        <span className="text-xs font-sans text-stone-400">•</span>
                        <span>{formatDisplayTime(apt.startTime)} – {formatDisplayTime(apt.endTime)}</span>
                      </div>
                      <p className="text-xs text-stone-500 font-mono">
                        Ref: {apt.id}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {isConfirmed && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Confirmed
                      </span>
                    )}
                    {isDone && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                        <CheckCheck className="w-3.5 h-3.5" />
                        Done / Completed
                      </span>
                    )}
                    {isCancelled && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" />
                        Cancelled
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-spa-50 p-4 rounded-2xl">
                  <div>
                    <span className="text-stone-400 block font-medium">Session &amp; Price:</span>
                    <strong className="text-stone-800 text-sm">
                      {apt.duration} Minutes (${apt.price})
                    </strong>
                  </div>

                  <div>
                    <span className="text-stone-400 block font-medium">Body Part Focus:</span>
                    <span className="text-stone-800 font-semibold">
                      {apt.bodyPartFocus.join(', ') || 'General Wellness'}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block font-medium">Professional Assessment:</span>
                    <span className="text-stone-700">Included on-site</span>
                  </div>

                  {apt.customNotes && (
                    <div className="sm:col-span-3 pt-2 border-t border-spa-200/80">
                      <span className="text-stone-400 block font-medium">Notes / Focus Request:</span>
                      <p className="text-stone-700 italic">"{apt.customNotes}"</p>
                    </div>
                  )}
                </div>

                {/* Actions for Confirmed appointments */}
                {isConfirmed && (
                  <div className="flex items-center justify-end gap-3 pt-1">
                    {confirmCancelId === apt.id ? (
                      <div className="flex items-center gap-2 animate-fade-in text-xs">
                        <span className="text-rose-600 font-semibold">Sigurado ka nga i-cancel?</span>
                        <button
                          onClick={() => handleCancel(apt.id)}
                          className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold"
                        >
                          Yes, Cancel
                        </button>
                        <button
                          onClick={() => setConfirmCancelId(null)}
                          className="px-3 py-1 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg"
                        >
                          Dili
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmCancelId(apt.id)}
                        className="text-xs text-stone-400 hover:text-rose-600 underline font-medium transition-colors"
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
