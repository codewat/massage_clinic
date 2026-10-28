import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';
import { 
  SERVICE_RATES, 
  BODY_PARTS_LIST, 
  getTodayDateString, 
  formatDisplayTime,
  CLINIC_NAME,
  formatDateKey
} from '../services/clinicData';
import { generateDailySlots, GeneratedTimeSlot } from '../services/bookingService';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface BookAppointmentPageProps {
  onNavigate: (page: string) => void;
  preselectedDuration?: number;
}

export const BookAppointmentPage: React.FC<BookAppointmentPageProps> = ({ 
  onNavigate, 
  preselectedDuration = 60 
}) => {
  const { currentUser, isAuthenticated } = useAuth();
  const { appointments, addAppointment } = useAppointments();

  const [selectedDuration, setSelectedDuration] = useState<number>(preselectedDuration);
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>(['Back', 'Shoulders']);
  const [customNotes, setCustomNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<GeneratedTimeSlot | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdAptId, setCreatedAptId] = useState('');

  // Calendar picker state
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());

  const currentService = SERVICE_RATES.find(r => r.duration === selectedDuration) || SERVICE_RATES[2];

  // Available slots for the selected date and duration
  const availableSlots = generateDailySlots(selectedDate, selectedDuration, appointments, false);

  useEffect(() => {
    if (selectedTimeSlot) {
      const match = availableSlots.find(s => s.timeStr === selectedTimeSlot.timeStr);
      if (!match || !match.isAvailable) {
        setSelectedTimeSlot(null);
      }
    }
  }, [selectedDuration, selectedDate]);

  const toggleBodyPart = (part: string) => {
    setSelectedBodyParts(prev => 
      prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
    );
  };

  const handleConfirmBooking = () => {
    if (!currentUser || !selectedTimeSlot) return;

    const newApt = addAppointment({
      userId: currentUser.id,
      clientName: `${currentUser.firstName} ${currentUser.lastName}`.trim(),
      clientPreferredName: currentUser.preferredName || currentUser.firstName,
      clientPhone: currentUser.phone,
      clientEmail: currentUser.email,
      date: selectedDate,
      startTime: selectedTimeSlot.timeStr,
      duration: selectedDuration,
      price: currentService.price,
      bodyPartFocus: selectedBodyParts.length > 0 ? selectedBodyParts : ['Full Body Harmonization'],
      customNotes: customNotes.trim() || undefined,
      status: 'confirmed',
    });

    setCreatedAptId(newApt.id);
    setIsSuccessModalOpen(true);

    try {
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  // Calendar math for Warm Cream (#FDF6E2) picker
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: (Date | null)[] = [];
    let startDay = firstDay.getDay(); // 0 is Sunday
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const todayStr = getTodayDateString();
  const calendarDays = getDaysInMonth(calendarMonth);

  const prevMonth = () => {
    const d = new Date(calendarMonth);
    d.setMonth(d.getMonth() - 1);
    setCalendarMonth(d);
  };

  const nextMonth = () => {
    const d = new Date(calendarMonth);
    d.setMonth(d.getMonth() + 1);
    setCalendarMonth(d);
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center animate-fade-in text-white">
        <div className="glass-card p-8 rounded-3xl border border-white/15 shadow-xl space-y-4">
          <AlertCircle className="w-12 h-12 text-[#F1BB09] mx-auto" />
          <h2 className="text-xl font-serif font-bold text-white">
            Please Sign In First
          </h2>
          <p className="text-sm text-[#FBF4C4]/80">
            You must be logged in to book an appointment session at {CLINIC_NAME}.
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="w-full py-3 px-4 btn-primary-gold rounded-xl font-bold text-sm transition-all"
          >
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in text-white">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('client-dashboard')}
          className="flex items-center gap-1.5 text-stone-300 hover:text-white text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#F1BB09]" />
          Back to Dashboard
        </button>

        <div className="text-right">
          <span className="text-[11px] text-stone-400 font-mono uppercase tracking-wider">Client Booking</span>
          <p className="text-xs font-semibold text-[#F1BB09]">
            {currentUser.preferredName || currentUser.firstName} ({currentUser.phone})
          </p>
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          Book Your Treatment Session
        </h1>
        <p className="text-[#FBF4C4]/80 text-sm mt-1">
          Select duration, target muscle focus, and available time between 9:00 AM – 6:00 PM.
        </p>
      </div>

      <div className="space-y-8">
        {/* Step 1: Duration & Rates */}
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F1BB09] text-[#1A1A1A] text-xs font-bold flex items-center justify-center font-sans">1</span>
              Select Duration &amp; Rate
            </h2>
            <span className="text-xs text-[#F1BB09] font-bold">
              Selected: {selectedDuration} Mins (${currentService.price})
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {SERVICE_RATES.map((rate) => {
              const isSelected = selectedDuration === rate.duration;
              return (
                <button
                  key={rate.duration}
                  type="button"
                  onClick={() => setSelectedDuration(rate.duration)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'border-[#F1BB09] bg-[#F1BB09] text-[#1A1A1A] font-bold shadow-lg ring-2 ring-[#F1BB09]/40'
                      : 'border-white/10 hover:border-[#716B56] bg-[#161E1A] text-white'
                  }`}
                >
                  <div className={`text-xs ${isSelected ? 'text-[#1A1A1A]' : 'text-stone-400'}`}>
                    {rate.duration} mins
                  </div>
                  <div className={`text-2xl font-serif font-bold my-1 ${isSelected ? 'text-[#1A1A1A]' : 'text-[#F1BB09]'}`}>
                    ${rate.price}
                  </div>
                  <div className={`text-[11px] ${isSelected ? 'text-stone-800' : 'text-stone-400'}`}>
                    {rate.duration <= 45 ? 'Targeted' : 'Deep / Full'}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2: Body Part Focus */}
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F1BB09] text-[#1A1A1A] text-xs font-bold flex items-center justify-center font-sans">2</span>
              Body Part Focus
            </h2>
            <span className="text-xs text-[#F1BB09] bg-[#161E1A] px-2.5 py-1 rounded-full border border-white/10 font-bold">
              Personalized Experience
            </span>
          </div>

          <p className="text-xs text-[#FBF4C4]/80">
            Specify which part of your body you would want to focus on (e.g. back, shoulder, arms):
          </p>

          <div className="flex flex-wrap gap-2.5">
            {BODY_PARTS_LIST.map((part) => {
              const isChecked = selectedBodyParts.includes(part);
              return (
                <button
                  key={part}
                  type="button"
                  onClick={() => toggleBodyPart(part)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isChecked
                      ? 'bg-[#F1BB09] text-[#1A1A1A] shadow-md ring-2 ring-[#F1BB09]/40'
                      : 'bg-[#716B56]/50 hover:bg-[#716B56] text-[#FBF4C4] border border-[#716B56]'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5" />}
                  {part}
                </button>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1 mt-3">
              Specific Conditions or Muscle Tension Notes (Optional)
            </label>
            <input
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g. Stiff right rotator cuff, soreness from running, prefer deep thumb pressure..."
              className="w-full px-4 py-2.5 rounded-xl translucent-input text-xs sm:text-sm"
            />
          </div>

          {/* Professional Assessment Notice */}
          <div className="p-3 bg-[#161E1A] rounded-2xl border border-[#F1BB09]/40 flex items-center gap-2.5 text-xs text-[#FBF4C4]">
            <ShieldCheck className="w-4 h-4 text-[#F1BB09] shrink-0" />
            <span>
              <strong>Professional Assessment:</strong> We also provide an on-site assessment to determine the best massage technique for your needs.
            </span>
          </div>
        </section>

        {/* Step 3: DatePicker in Light Warm Cream (#FDF6E2) with Olive & Gold */}
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F1BB09] text-[#1A1A1A] text-xs font-bold flex items-center justify-center font-sans">3</span>
              Select Date (Interactive Calendar)
            </h2>
            <span className="text-xs text-[#FBF4C4]/70">
              Open Daily: 9:00 AM – 6:00 PM
            </span>
          </div>

          {/* DatePicker Surface in #FDF6E2 (Light Warm Cream) */}
          <div className="bg-[#FDF6E2] text-[#1A1A1A] rounded-3xl p-5 sm:p-6 shadow-xl max-w-lg mx-auto border-2 border-[#716B56]/30">
            {/* Header in Olive Secondary (#716B56) */}
            <div className="bg-[#716B56] text-[#FBF4C4] p-3 rounded-2xl flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1.5 hover:bg-[#5D5846] rounded-lg transition-colors text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <h4 className="font-serif font-bold text-sm sm:text-base tracking-wide text-white">
                {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h4>

              <button
                type="button"
                onClick={nextMonth}
                className="p-1.5 hover:bg-[#5D5846] rounded-lg transition-colors text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Weekday Names in Olive */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-[#716B56] uppercase mb-2">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {calendarDays.map((dateObj, idx) => {
                if (!dateObj) {
                  return <div key={`pad-${idx}`} className="h-9 sm:h-10" />;
                }

                const dStr = formatDateKey(dateObj);
                const isPast = dStr < todayStr;
                const isSelected = dStr === selectedDate;

                if (isPast) {
                  return (
                    <div
                      key={dStr}
                      className="h-9 sm:h-10 rounded-xl flex items-center justify-center text-xs font-semibold text-[#FF5252] bg-red-50/70 border border-red-100 cursor-not-allowed select-none"
                      title="Past date cannot be booked"
                    >
                      {dateObj.getDate()}
                    </div>
                  );
                }

                return (
                  <button
                    key={dStr}
                    type="button"
                    onClick={() => setSelectedDate(dStr)}
                    className={`h-9 sm:h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-[#F1BB09] text-[#1A1A1A] shadow-md ring-2 ring-[#716B56]'
                        : 'bg-white hover:bg-[#FBF4C4] text-[#1A1A1A] border border-stone-200'
                    }`}
                  >
                    {dateObj.getDate()}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-300 flex items-center justify-between text-[11px]">
              <span className="text-stone-600 font-medium">
                Chosen Date: <strong>{selectedDate}</strong>
              </span>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FF5252]"></span>
                <span className="text-stone-500">Past / Restricted</span>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4: Time Slot Selection with Hidden Buffer Logic */}
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F1BB09] text-[#1A1A1A] text-xs font-bold flex items-center justify-center font-sans">4</span>
                Select Available Time Slot (9:00 AM – 6:00 PM)
              </h2>
              <p className="text-xs text-[#FBF4C4]/70 mt-0.5">
                Real-time appointment slots for {selectedDate}.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#716B56]/50 border border-[#716B56]"></span>
                <span className="text-stone-300">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#161E1A] border border-white/10"></span>
                <span className="text-stone-500">Not Available</span>
              </div>
            </div>
          </div>

          {/* Time Slots Grid: Selected is Gold (#F1BB09) with Dark text (#1A1A1A), Unselected chip is Olive (#716B56) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-2">
            {availableSlots.map((slot) => {
              const isSelected = selectedTimeSlot?.timeStr === slot.timeStr;
              const isAvailable = slot.isAvailable;

              if (!isAvailable) {
                return (
                  <div
                    key={slot.timeStr}
                    className="p-3 rounded-xl bg-[#161E1A]/80 border border-white/10 text-center cursor-not-allowed opacity-50 select-none"
                    title="Time slot is occupied"
                  >
                    <div className="text-xs font-semibold text-stone-500 line-through">
                      {slot.displayTime}
                    </div>
                    <div className="text-[10px] text-stone-500 font-medium mt-0.5">
                      Not Available
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={slot.timeStr}
                  type="button"
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'border-[#F1BB09] bg-[#F1BB09] text-[#1A1A1A] font-bold shadow-lg ring-2 ring-[#F1BB09]/50'
                      : 'border-[#716B56] bg-[#716B56]/50 hover:bg-[#716B56] text-[#FBF4C4]'
                  }`}
                >
                  <div className={`text-xs font-bold ${isSelected ? 'text-[#1A1A1A]' : 'text-white'}`}>
                    {slot.displayTime}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#1A1A1A]/80' : 'text-[#FBF4C4]/70'}`}>
                    to {slot.displayEndTime}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedTimeSlot && (
            <div className="p-4 bg-[#161E1A] rounded-2xl border border-[#F1BB09]/50 flex items-center justify-between text-xs text-white animate-fade-in mt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#F1BB09]" />
                <span>
                  Selected Slot: <strong className="text-[#F1BB09]">{selectedTimeSlot.displayTime} – {selectedTimeSlot.displayEndTime}</strong> on {selectedDate}
                </span>
              </div>
              <span className="font-bold text-sm text-[#F1BB09]">${currentService.price}</span>
            </div>
          )}
        </section>

        {/* Step 5: Summary & Submit */}
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#F1BB09] font-mono">Summary</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-0.5">
                Ready to Confirm Your Session?
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#FBF4C4]/70">Session Fee</span>
              <div className="text-3xl font-serif font-bold text-[#F1BB09]">
                ${currentService.price}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#FBF4C4]/85 bg-[#161E1A]/80 p-4 rounded-2xl border border-white/10">
            <div>
              <span className="text-stone-400 block">Client:</span>
              <strong className="text-white text-sm">
                {currentUser.firstName} {currentUser.lastName} ({currentUser.preferredName})
              </strong>
            </div>

            <div>
              <span className="text-stone-400 block">Schedule:</span>
              <strong className="text-white text-sm">
                {selectedDuration} mins @ {selectedTimeSlot ? selectedTimeSlot.displayTime : 'Pick a time slot above'}
              </strong>
            </div>

            <div>
              <span className="text-stone-400 block">Target Focus:</span>
              <strong className="text-white text-sm">
                {selectedBodyParts.join(', ') || 'General Wellness'}
              </strong>
            </div>
          </div>

          <button
            type="button"
            disabled={!selectedTimeSlot}
            onClick={handleConfirmBooking}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 transition-all ${
              selectedTimeSlot
                ? 'btn-primary-gold cursor-pointer active:scale-[0.99]'
                : 'bg-[#716B56]/40 text-stone-400 cursor-not-allowed border border-white/10'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 text-[#1A1A1A]" />
            {selectedTimeSlot ? 'Confirm & Book Appointment' : 'Please Select an Available Time Slot Above'}
          </button>
        </section>
      </div>

      {/* Confirmation Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-card rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-center space-y-5 border border-[#F1BB09]/40">
            <div className="w-16 h-16 rounded-full bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-white">
                Booking Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-[#FBF4C4]/80 mt-1">
                Your therapeutic massage session with {CLINIC_NAME} has been scheduled.
              </p>
            </div>

            <div className="bg-[#161E1A] p-4 rounded-2xl border border-white/10 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-400">Reference ID:</span>
                <span className="font-mono font-bold text-[#F1BB09]">{createdAptId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Date &amp; Time:</span>
                <span className="font-semibold text-white">
                  {selectedDate} @ {selectedTimeSlot?.displayTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Duration &amp; Price:</span>
                <span className="font-semibold text-white">
                  {selectedDuration} mins (${currentService.price})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Target Focus:</span>
                <span className="font-semibold text-white">
                  {selectedBodyParts.join(', ')}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  onNavigate('view-appointments');
                }}
                className="w-full py-3 px-4 btn-primary-gold rounded-xl font-bold text-xs tracking-wide shadow-md transition-all"
              >
                View My Appointments
              </button>

              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  onNavigate('client-dashboard');
                }}
                className="w-full py-2.5 px-4 bg-[#716B56]/50 hover:bg-[#716B56] text-[#FBF4C4] rounded-xl font-medium text-xs transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
