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
  XCircle, 
  Edit3, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  Coffee,
  CheckCheck
} from 'lucide-react';
import { getTodayDateString, formatDisplayTime } from '../services/clinicData';
import { AdminAddEditBookingModal } from '../components/AdminAddEditBookingModal';

interface AdminDashboardPageProps {
  onNavigate: (page: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { getTodayAppointments, appointments, markAsDone, cancelAppointment } = useAppointments();

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Admin Header with Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-spa-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-sage-800 font-semibold">
              Clinic Administration Center
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">
            Admin Dashboard
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
            Welcome, {currentUser?.preferredName || currentUser?.firstName}. Overview sa tanan appointments ug operasyon karon.
          </p>
        </div>

        {/* Major Action Buttons specifically requested by User */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Button: Check Calendar */}
          <button
            onClick={() => onNavigate('admin-calendar')}
            className="flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-all border border-stone-200"
          >
            <CalendarIcon className="w-4 h-4 text-sage-700" />
            Check Calendar (Weekly/Monthly)
          </button>

          {/* Button: View Client Profiles */}
          <button
            onClick={() => onNavigate('admin-clients')}
            className="flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-all border border-stone-200"
          >
            <Users className="w-4 h-4 text-sage-700" />
            View Client Profiles
          </button>

          {/* Button: Add Walk-in / Booking */}
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-sage-700 hover:bg-sage-800 text-white rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Walk-in Booking
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-spa-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sage-100 text-sage-800 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium">Today's Bookings</p>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {todayBookings.length}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-spa-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium">Confirmed / Active</p>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {confirmedToday.length}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-spa-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
            <CheckCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium">Completed Today</p>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {doneToday.length}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-spa-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium">Projected Revenue</p>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
              ${revenueToday}
            </h3>
          </div>
        </div>
      </div>

      {/* Primary Feature: "Makita diresto kung kinsa ang naka book today" */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-spa-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                Kinsa ang naka book TODAY ({today})
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Naka listahan ang tanan kliyente nga naka-schedule karong adlawa gikan 9:00 AM hangtod 6:00 PM.
            </p>
          </div>

          <div className="text-xs text-stone-500 bg-spa-50 px-3 py-1.5 rounded-xl border border-spa-200">
            Admin privilege: <strong>Makita nimo ang tinuod nga ngalan sa tanan nga naka-book</strong>
          </div>
        </div>

        {todayBookings.length === 0 ? (
          <div className="p-12 text-center text-stone-400 space-y-3">
            <Clock className="w-12 h-12 mx-auto text-stone-300" />
            <p className="text-sm font-medium">Walay naka-book karong adlawa ({today}).</p>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-sage-700 text-white rounded-xl text-xs font-semibold hover:bg-sage-800"
            >
              + I-add ang unang booking
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
                  className="p-5 rounded-2xl border border-stone-200 hover:border-sage-300 bg-spa-50/50 hover:bg-white transition-all space-y-3 shadow-xs"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    {/* Client & Time info */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-sage-200/80 text-sage-900 flex items-center justify-center font-bold text-base shrink-0">
                        {apt.clientPreferredName?.[0] || apt.clientName?.[0] || 'C'}
                      </div>

                      <div>
                        {/* Name of the client is boldly shown to admin */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-lg font-serif font-bold text-stone-900">
                            {apt.clientName}
                          </h4>
                          {apt.clientPreferredName && (
                            <span className="text-xs bg-sage-100 text-sage-800 font-sans font-medium px-2 py-0.5 rounded-md">
                              Preferred: "{apt.clientPreferredName}"
                            </span>
                          )}
                          <span className="text-xs text-stone-500 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-stone-400" />
                            {apt.clientPhone}
                          </span>
                        </div>

                        {/* Schedule & Duration */}
                        <div className="flex items-center gap-3 text-xs text-stone-600 mt-1 flex-wrap">
                          <span className="font-bold text-stone-800 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                            {formatDisplayTime(apt.startTime)} – {formatDisplayTime(apt.endTime)}
                          </span>
                          <span>•</span>
                          <span>{apt.duration} mins session (${apt.price})</span>
                          <span>•</span>
                          <span className="text-stone-500 font-mono text-[11px]">Ref: {apt.id}</span>
                        </div>
                      </div>
                    </div>

                    {/* Admin Hidden Rest Buffer Badge + Status */}
                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Therapist Rest Time (Visible ONLY to Admin) */}
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                        <Coffee className="w-3.5 h-3.5 text-amber-700" />
                        <span>Therapist Rest: <strong>+{apt.restBufferMinutes}m</strong> (until {formatDisplayTime(apt.bufferEndTime)})</span>
                      </div>

                      {/* Status */}
                      {isConfirmed && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Confirmed
                        </span>
                      )}
                      {isDone && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                          Done
                        </span>
                      )}
                      {isCancelled && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                          Cancelled
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Focus & Notes */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs pt-2 border-t border-stone-200/60 bg-white/70 p-3 rounded-xl">
                    <div className="sm:col-span-8">
                      <span className="text-stone-400 font-medium">Target Body Focus: </span>
                      <strong className="text-stone-800">
                        {apt.bodyPartFocus?.join(', ') || 'General Wellness'}
                      </strong>
                      {apt.customNotes && (
                        <span className="block text-stone-500 italic mt-0.5">
                          Note: "{apt.customNotes}"
                        </span>
                      )}
                    </div>

                    {/* Action buttons (Edit, Mark Done, Cancel) */}
                    <div className="sm:col-span-4 flex items-center justify-end gap-2">
                      {isConfirmed && (
                        <button
                          onClick={() => markAsDone(apt.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                          title="Mark this session as Done"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mark Done
                        </button>
                      )}

                      <button
                        onClick={() => handleEdit(apt)}
                        className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                        title="Edit booking details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                      </button>

                      {!isCancelled && (
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          className="px-2.5 py-1 hover:bg-rose-50 text-rose-600 rounded-lg text-xs font-medium transition-colors"
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

      {/* Modal for Adding / Editing booking */}
      <AdminAddEditBookingModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        bookingToEdit={editingBooking}
      />
    </div>
  );
};
