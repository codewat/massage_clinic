import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';
import { Appointment } from '../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  DollarSign, 
  Plus, 
  CheckCircle2, 
  Edit3, 
  Phone, 
  Coffee,
  CheckCheck
} from 'lucide-react';
import { getTodayDateString, formatDisplayTime, CLINIC_NAME } from '../services/clinicData';
import { AdminAddEditBookingModal } from '../components/AdminAddEditBookingModal';

interface AdminDashboardPageProps {
  onNavigate: (page: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { getTodayAppointments, markAsDone, cancelAppointment } = useAppointments();

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Appointment | null>(null);

  const today = getTodayDateString();
  const todayBookings = getTodayAppointments();

  const confirmedToday = todayBookings.filter(a => a.status === 'confirmed');
  const doneToday = todayBookings.filter(a => a.status === 'done');
  const revenueToday = todayBookings
    .filter(a => a.status !== 'cancelled')
    .reduce((sum, a) => sum + a.price, 0);

  const handleEdit = (booking: Appointment) => {
    setEditingBooking(booking);
    setIsAddEditModalOpen(true);
  };

  const handleAdd = () => {
    setEditingBooking(null);
    setIsAddEditModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in text-white">
      {/* Admin Header with Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F1BB09] animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F1BB09] font-bold">
              {CLINIC_NAME} Administration Portal
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">
            Admin Dashboard
          </h1>
          <p className="text-[#FBF4C4]/80 text-xs sm:text-sm mt-0.5">
            Welcome, {currentUser?.preferredName || currentUser?.firstName}. Overview of today's client schedule and clinic operations.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('admin-calendar')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#716B56]/50 hover:bg-[#716B56] text-[#FBF4C4] border border-[#716B56] rounded-xl text-xs font-bold transition-all"
          >
            <CalendarIcon className="w-4 h-4 text-[#F1BB09]" />
            Check Calendar (Weekly/Monthly)
          </button>

          <button
            onClick={() => onNavigate('admin-clients')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#716B56]/50 hover:bg-[#716B56] text-[#FBF4C4] border border-[#716B56] rounded-xl text-xs font-bold transition-all"
          >
            <Users className="w-4 h-4 text-[#F1BB09]" />
            View Client Profiles
          </button>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 btn-primary-gold rounded-xl text-xs font-bold shadow-lg transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Walk-in Booking
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-white/10 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#FBF4C4]/70 font-medium">Today's Bookings</p>
            <h3 className="text-2xl font-serif font-bold text-white mt-0.5">
              {todayBookings.length}
            </h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0D9488]/30 border border-[#0D9488] text-[#0D9488] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#FBF4C4]/70 font-medium">Confirmed / Active</p>
            <h3 className="text-2xl font-serif font-bold text-white mt-0.5">
              {confirmedToday.length}
            </h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#716B56]/40 border border-[#716B56] text-[#FBF4C4] flex items-center justify-center shrink-0">
            <CheckCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#FBF4C4]/70 font-medium">Completed Today</p>
            <h3 className="text-2xl font-serif font-bold text-white mt-0.5">
              {doneToday.length}
            </h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F1BB09]/20 border border-[#F1BB09] text-[#F1BB09] flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#FBF4C4]/70 font-medium">Projected Revenue</p>
            <h3 className="text-2xl font-serif font-bold text-[#F1BB09] mt-0.5">
              ${revenueToday}
            </h3>
          </div>
        </div>
      </div>

      {/* Primary Feature: Today's Bookings */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]"></span>
              <h2 className="text-2xl font-serif font-bold text-white">
                Today's Bookings ({today})
              </h2>
            </div>
            <p className="text-xs text-[#FBF4C4]/70 mt-0.5">
              All clients scheduled today between 9:00 AM and 6:00 PM.
            </p>
          </div>

          <div className="text-xs text-[#F1BB09] bg-[#161E1A] px-3.5 py-1.5 rounded-xl border border-white/10">
            Admin View: <strong>Client names &amp; rest buffers visible</strong>
          </div>
        </div>

        {todayBookings.length === 0 ? (
          <div className="p-12 text-center text-stone-400 space-y-3">
            <Clock className="w-12 h-12 mx-auto text-stone-500" />
            <p className="text-sm font-medium">No appointments booked for today ({today}).</p>
            <button
              onClick={handleAdd}
              className="px-4 py-2 btn-primary-gold rounded-xl text-xs font-bold"
            >
              + Add First Booking
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {todayBookings.map((apt) => {
              const isConfirmed = apt.status === 'confirmed';
              const isDone = apt.status === 'done';
              const isCancelled = apt.status === 'cancelled';

              return (
                <div
                  key={apt.id}
                  className="p-5 rounded-2xl border border-white/10 hover:border-[#F1BB09]/40 bg-[#161E1A]/85 transition-all space-y-3 shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] flex items-center justify-center font-bold text-base shrink-0">
                        {apt.clientPreferredName?.[0] || apt.clientName?.[0] || 'C'}
                      </div>

                      <div>
                        {/* Name of the client is shown to admin */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-lg font-serif font-bold text-white">
                            {apt.clientName}
                          </h4>
                          {apt.clientPreferredName && (
                            <span className="text-xs bg-[#716B56]/50 text-[#FBF4C4] font-sans font-medium px-2 py-0.5 rounded-md border border-[#716B56]">
                              Preferred: "{apt.clientPreferredName}"
                            </span>
                          )}
                          <span className="text-xs text-stone-300 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#0D9488]" />
                            {apt.clientPhone}
                          </span>
                        </div>

                        {/* Schedule & Duration */}
                        <div className="flex items-center gap-3 text-xs text-stone-300 mt-1 flex-wrap">
                          <span className="font-bold text-[#1A1A1A] bg-[#F1BB09] px-2 py-0.5 rounded-md">
                            {formatDisplayTime(apt.startTime)} – {formatDisplayTime(apt.endTime)}
                          </span>
                          <span>•</span>
                          <span>{apt.duration} mins session (${apt.price})</span>
                          <span>•</span>
                          <span className="text-stone-400 font-mono text-[11px]">ID: {apt.id}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rest Buffer Notice (Visible ONLY to Admin) */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#716B56]/40 border border-[#716B56] text-[#FBF4C4] text-xs font-medium">
                        <Coffee className="w-3.5 h-3.5 text-[#F1BB09]" />
                        <span>Therapist Rest: <strong>+{apt.restBufferMinutes}m</strong> (until {formatDisplayTime(apt.bufferEndTime)})</span>
                      </div>

                      {/* Status */}
                      {isConfirmed && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0D9488]/20 text-[#0D9488] border border-[#0D9488]/40">
                          Confirmed
                        </span>
                      )}
                      {isDone && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#716B56]/40 text-[#FBF4C4] border border-[#716B56]">
                          Done
                        </span>
                      )}
                      {isCancelled && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FF5252]/20 text-[#FF5252] border border-[#FF5252]/40">
                          Cancelled
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Focus & Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs pt-2 border-t border-white/10 bg-[#1B2724]/80 p-3 rounded-xl">
                    <div className="sm:col-span-8">
                      <span className="text-stone-400 font-medium">Target Muscle Focus: </span>
                      <strong className="text-white">
                        {apt.bodyPartFocus?.join(', ') || 'General Wellness'}
                      </strong>
                      {apt.customNotes && (
                        <span className="block text-[#FBF4C4]/80 italic mt-0.5">
                          Note: "{apt.customNotes}"
                        </span>
                      )}
                    </div>

                    <div className="sm:col-span-4 flex items-center justify-end gap-2">
                      {isConfirmed && (
                        <button
                          onClick={() => markAsDone(apt.id)}
                          className="px-2.5 py-1 bg-[#0D9488] hover:bg-[#0B7D73] text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                          title="Mark session as Completed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mark Done
                        </button>
                      )}

                      <button
                        onClick={() => handleEdit(apt)}
                        className="px-2.5 py-1 bg-[#716B56]/60 hover:bg-[#716B56] text-[#FBF4C4] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                        title="Edit booking"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#F1BB09]" />
                        Edit
                      </button>

                      {!isCancelled && (
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          className="px-2.5 py-1 hover:bg-[#FF5252]/20 text-[#FF5252] rounded-lg text-xs font-medium transition-colors"
                          title="Cancel booking"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AdminAddEditBookingModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        bookingToEdit={editingBooking}
      />
    </div>
  );
};
