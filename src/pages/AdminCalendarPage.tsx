import React, { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { Appointment } from '../types';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  ArrowLeft, 
  Coffee, 
  User 
} from 'lucide-react';
import { 
  formatDisplayTime, 
  formatDateKey, 
  getTodayDateString,
  CLINIC_NAME
} from '../services/clinicData';
import { AdminAddEditBookingModal } from '../components/AdminAddEditBookingModal';

interface AdminCalendarPageProps {
  onNavigate: (page: string) => void;
}

export const AdminCalendarPage: React.FC<AdminCalendarPageProps> = ({ onNavigate }) => {
  const { appointments } = useAppointments();
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Appointment | null>(null);

  const prevPeriod = () => {
    const d = new Date(currentDate);
    if (viewMode === 'weekly') {
      d.setDate(d.getDate() - 7);
    } else {
      d.setMonth(d.getMonth() - 1);
    }
    setCurrentDate(d);
  };

  const nextPeriod = () => {
    const d = new Date(currentDate);
    if (viewMode === 'weekly') {
      d.setDate(d.getDate() + 7);
    } else {
      d.setMonth(d.getMonth() + 1);
    }
    setCurrentDate(d);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getWeekDates = (baseDate: Date) => {
    const start = new Date(baseDate);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday start
    start.setDate(diff);

    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      week.push(d);
    }
    return week;
  };

  const getMonthDays = (baseDate: Date) => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: (Date | null)[] = [];
    let startPad = firstDay.getDay() - 1;
    if (startPad < 0) startPad = 6;
    for (let i = 0; i < startPad; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const weekDays = getWeekDates(currentDate);
  const monthDays = getMonthDays(currentDate);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleEditBooking = (apt: Appointment) => {
    setEditingBooking(apt);
    setIsAddEditModalOpen(true);
  };

  const handleAddBooking = () => {
    setEditingBooking(null);
    setIsAddEditModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 animate-fade-in text-white">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('admin-dashboard')}
          className="flex items-center gap-1.5 text-stone-300 hover:text-white text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#F1BB09]" />
          Back to Admin Dashboard
        </button>

        <button
          onClick={handleAddBooking}
          className="flex items-center gap-2 px-4 py-2.5 btn-primary-gold rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add New Booking
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="glass-card rounded-3xl p-6 border border-white/15 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] flex items-center justify-center font-bold">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h1>
            <p className="text-xs text-[#FBF4C4]/80">
              Admin schedule overview — all booked client names and buffers visible.
            </p>
          </div>
        </div>

        {/* View Switcher & Period Nav */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-[#161E1A] p-1 rounded-xl flex items-center text-xs font-semibold border border-white/10">
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'weekly' ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold shadow-sm' : 'text-stone-300'
              }`}
            >
              Weekly Schedule
            </button>
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'monthly' ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold shadow-sm' : 'text-stone-300'
              }`}
            >
              Monthly Schedule
            </button>
          </div>

          <div className="h-5 w-px bg-white/10 mx-1 hidden sm:block" />

          {/* Nav Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={prevPeriod}
              className="p-2 rounded-xl bg-[#161E1A] border border-white/10 hover:bg-[#1B2724] transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-[#F1BB09]" />
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1.5 rounded-xl bg-[#161E1A] border border-white/10 text-xs font-medium hover:bg-[#1B2724] text-[#FBF4C4] transition-colors"
            >
              Today
            </button>
            <button
              onClick={nextPeriod}
              className="p-2 rounded-xl bg-[#161E1A] border border-white/10 hover:bg-[#1B2724] transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-[#F1BB09]" />
            </button>
          </div>
        </div>
      </div>

      {/* WEEKLY VIEW */}
      {viewMode === 'weekly' && (
        <div className="glass-card rounded-3xl p-6 border border-white/15 shadow-xl overflow-x-auto">
          <div className="min-w-[760px] grid grid-cols-7 gap-3">
            {weekDays.map((d) => {
              const dateKey = formatDateKey(d);
              const isToday = dateKey === getTodayDateString();
              const dayAppointments = appointments
                .filter(a => a.date === dateKey && a.status !== 'cancelled')
                .sort((a, b) => a.startTime.localeCompare(b.startTime));

              return (
                <div
                  key={dateKey}
                  className={`rounded-2xl p-3 border min-h-[460px] flex flex-col ${
                    isToday
                      ? 'border-[#F1BB09] bg-[#1B2724]/90 ring-2 ring-[#F1BB09]/40'
                      : 'border-white/10 bg-[#161E1A]/80'
                  }`}
                >
                  <div className="text-center pb-2 border-b border-white/10 mb-3">
                    <p className="text-[11px] font-semibold text-[#FBF4C4]/60 uppercase tracking-wider">
                      {d.toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <p className={`text-lg font-serif font-bold ${isToday ? 'text-[#F1BB09]' : 'text-white'}`}>
                      {d.getDate()}
                    </p>
                    <span className="text-[10px] text-[#0D9488] font-bold">
                      {dayAppointments.length} Booked
                    </span>
                  </div>

                  {/* Appointments list */}
                  <div className="space-y-2 flex-1">
                    {dayAppointments.length === 0 ? (
                      <p className="text-[11px] text-stone-500 text-center pt-8 italic">
                        Available
                      </p>
                    ) : (
                      dayAppointments.map((apt) => (
                        <div
                          key={apt.id}
                          onClick={() => handleEditBooking(apt)}
                          className="p-2.5 rounded-xl bg-[#1B2724] border border-white/15 hover:border-[#F1BB09] hover:shadow-lg cursor-pointer transition-all space-y-1 group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[11px] text-[#F1BB09]">
                              {formatDisplayTime(apt.startTime)}
                            </span>
                            <span className="text-[10px] text-stone-400">
                              {apt.duration}m
                            </span>
                          </div>

                          <div className="text-xs font-semibold text-white flex items-center gap-1 truncate">
                            <User className="w-3 h-3 text-[#0D9488] shrink-0" />
                            <span className="truncate">{apt.clientPreferredName || apt.clientName}</span>
                          </div>

                          <div className="text-[10px] text-[#FBF4C4]/70 truncate">
                            {apt.bodyPartFocus?.join(', ')}
                          </div>

                          <div className="text-[9px] text-[#FBF4C4] bg-[#716B56]/50 px-1.5 py-0.5 rounded flex items-center gap-1 font-mono">
                            <Coffee className="w-2.5 h-2.5 text-[#F1BB09]" />
                            <span>+{apt.restBufferMinutes}m buffer</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MONTHLY VIEW */}
      {viewMode === 'monthly' && (
        <div className="glass-card rounded-3xl p-6 border border-white/15 shadow-xl overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#F1BB09] uppercase tracking-wider pb-3 border-b border-white/10 font-mono">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>

            <div className="grid grid-cols-7 gap-2 pt-2">
              {monthDays.map((d, index) => {
                if (!d) {
                  return <div key={`empty-${index}`} className="h-32 bg-[#161E1A]/40 rounded-2xl border border-transparent" />;
                }

                const dateKey = formatDateKey(d);
                const isToday = dateKey === getTodayDateString();
                const dayAppointments = appointments.filter(
                  a => a.date === dateKey && a.status !== 'cancelled'
                );

                return (
                  <div
                    key={dateKey}
                    className={`h-32 rounded-2xl p-2 border flex flex-col justify-between overflow-hidden transition-all ${
                      isToday
                        ? 'border-[#F1BB09] bg-[#1B2724]/90'
                        : 'border-white/10 bg-[#161E1A]/80 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isToday ? 'text-[#F1BB09]' : 'text-white'}`}>
                        {d.getDate()}
                      </span>
                      {dayAppointments.length > 0 && (
                        <span className="text-[10px] font-bold text-[#1A1A1A] bg-[#F1BB09] px-1.5 rounded-full">
                          {dayAppointments.length}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 overflow-y-auto max-h-20 text-[10px]">
                      {dayAppointments.map(apt => (
                        <div
                          key={apt.id}
                          onClick={() => handleEditBooking(apt)}
                          className="bg-[#1B2724] border border-white/10 hover:border-[#F1BB09] text-[#FBF4C4] px-1.5 py-0.5 rounded truncate font-medium cursor-pointer"
                          title={`${apt.clientName} @ ${formatDisplayTime(apt.startTime)}`}
                        >
                          <strong className="text-[#F1BB09]">{formatDisplayTime(apt.startTime)}:</strong> {apt.clientPreferredName || apt.clientName}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <AdminAddEditBookingModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        bookingToEdit={editingBooking}
      />
    </div>
  );
};
