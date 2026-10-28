import React, { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { Appointment } from '../types';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  ArrowLeft, 
  Coffee, 
  User 
} from 'lucide-react';
import { 
  formatDisplayTime, 
  formatDateKey, 
  getTodayDateString 
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

  // Month navigation
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

  // Compute 7 days for the current week (starting Sunday or Monday)
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

  // Compute days for monthly grid
  const getMonthDays = (baseDate: Date) => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: (Date | null)[] = [];
    // Padding before 1st day (Monday start)
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('admin-dashboard')}
          className="flex items-center gap-1.5 text-stone-500 hover:text-stone-800 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Admin Dashboard
        </button>

        <button
          onClick={handleAddBooking}
          className="flex items-center gap-2 px-4 py-2.5 bg-sage-700 hover:bg-sage-800 text-white rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add New Booking
        </button>
      </div>

      {/* Calendar Controls Bar */}
      <div className="bg-white rounded-3xl p-6 border border-spa-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sage-100 text-sage-800 flex items-center justify-center font-bold">
            <CalendarIcon className="w-5 h-5 text-sage-700" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-stone-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h1>
            <p className="text-xs text-stone-500">
              Basta admin makita nimo ang ngalan sa tanan kliyente nga naka-book.
            </p>
          </div>
        </div>

        {/* View Switcher & Period Nav */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Weekly / Monthly Toggle */}
          <div className="bg-stone-100 p-1 rounded-xl flex items-center text-xs font-semibold">
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'weekly' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
              }`}
            >
              Weekly Schedule
            </button>
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'monthly' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
              }`}
            >
              Monthly Schedule
            </button>
          </div>

          <div className="h-5 w-px bg-stone-200 mx-1 hidden sm:block" />

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={prevPeriod}
              className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-stone-600" />
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-medium hover:bg-stone-100 transition-colors"
            >
              Today
            </button>
            <button
              onClick={nextPeriod}
              className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-stone-600" />
            </button>
          </div>
        </div>
      </div>

      {/* WEEKLY SCHEDULE VIEW */}
      {viewMode === 'weekly' && (
        <div className="bg-white rounded-3xl p-6 border border-spa-200 shadow-sm overflow-x-auto">
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
                      ? 'border-sage-500 bg-sage-50/40 ring-2 ring-sage-400/30'
                      : 'border-stone-200 bg-spa-50/30'
                  }`}
                >
                  <div className="text-center pb-2 border-b border-stone-200 mb-3">
                    <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                      {d.toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <p className={`text-lg font-serif font-bold ${isToday ? 'text-sage-800' : 'text-stone-800'}`}>
                      {d.getDate()}
                    </p>
                    <span className="text-[10px] text-stone-500 font-medium">
                      {dayAppointments.length} Booked
                    </span>
                  </div>

                  {/* Appointments list for this day */}
                  <div className="space-y-2.5 flex-1">
                    {dayAppointments.length === 0 ? (
                      <p className="text-[11px] text-stone-400 text-center pt-8 italic">
                        Available
                      </p>
                    ) : (
                      dayAppointments.map((apt) => (
                        <div
                          key={apt.id}
                          onClick={() => handleEditBooking(apt)}
                          className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-sage-400 hover:shadow-md cursor-pointer transition-all space-y-1 group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[11px] text-stone-900 group-hover:text-sage-800">
                              {formatDisplayTime(apt.startTime)}
                            </span>
                            <span className="text-[10px] text-stone-500">
                              {apt.duration}m
                            </span>
                          </div>

                          {/* Client's name displayed prominently per requirement */}
                          <div className="text-xs font-semibold text-stone-800 flex items-center gap-1 truncate">
                            <User className="w-3 h-3 text-sage-700 shrink-0" />
                            <span className="truncate">{apt.clientPreferredName || apt.clientName}</span>
                          </div>

                          <div className="text-[10px] text-stone-500 truncate">
                            {apt.bodyPartFocus?.join(', ')}
                          </div>

                          {/* Rest Buffer info for Admin */}
                          <div className="text-[9px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded flex items-center gap-1 font-mono">
                            <Coffee className="w-2.5 h-2.5 text-amber-700" />
                            <span>+{apt.restBufferMinutes}m rest</span>
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

      {/* MONTHLY SCHEDULE VIEW */}
      {viewMode === 'monthly' && (
        <div className="bg-white rounded-3xl p-6 border border-spa-200 shadow-sm overflow-x-auto">
          <div className="min-w-[760px]">
            {/* Header row */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-stone-500 uppercase tracking-wider pb-3 border-b border-stone-200 font-mono">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>

            {/* Grid days */}
            <div className="grid grid-cols-7 gap-2 pt-2">
              {monthDays.map((d, index) => {
                if (!d) {
                  return <div key={`empty-${index}`} className="h-32 bg-stone-50/50 rounded-2xl" />;
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
                        ? 'border-sage-500 bg-sage-50/30'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isToday ? 'text-sage-800' : 'text-stone-700'}`}>
                        {d.getDate()}
                      </span>
                      {dayAppointments.length > 0 && (
                        <span className="text-[10px] font-semibold text-sage-800 bg-sage-100 px-1.5 rounded-full">
                          {dayAppointments.length}
                        </span>
                      )}
                    </div>

                    {/* Bookings pills with Client's name */}
                    <div className="space-y-1 overflow-y-auto max-h-20 text-[10px]">
                      {dayAppointments.map(apt => (
                        <div
                          key={apt.id}
                          onClick={() => handleEditBooking(apt)}
                          className="bg-spa-100 hover:bg-spa-200 text-stone-800 px-1.5 py-0.5 rounded truncate font-medium cursor-pointer"
                          title={`${apt.clientName} @ ${formatDisplayTime(apt.startTime)}`}
                        >
                          <strong>{formatDisplayTime(apt.startTime)}:</strong> {apt.clientPreferredName || apt.clientName}
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

      {/* Admin Add/Edit Modal */}
      <AdminAddEditBookingModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        bookingToEdit={editingBooking}
      />
    </div>
  );
};
