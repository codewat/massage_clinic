import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';
import { 
  SERVICE_RATES, 
  BODY_PARTS_LIST, 
  getTodayDateString, 
  formatDisplayTime 
} from '../services/clinicData';
import { generateDailySlots, GeneratedTimeSlot } from '../services/bookingService';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  AlertCircle 
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

  // Selected service rate object
  const currentService = SERVICE_RATES.find(r => r.duration === selectedDuration) || SERVICE_RATES[2];

  // Available slots for the selected date and duration
  const availableSlots = generateDailySlots(selectedDate, selectedDuration, appointments, false);

  // If selected duration changes or date changes, reset chosen slot if it's no longer available
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
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="bg-white p-8 rounded-3xl border border-spa-200 shadow-md">
          <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-xl font-serif font-bold text-stone-900 mb-2">
            Please Login First
          </h2>
          <p className="text-stone-600 text-sm mb-6">
            Kinahanglan ka mag-login o mag-register aron makapili sa imong appointment schedule.
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="w-full py-3 px-4 bg-sage-700 hover:bg-sage-800 text-white rounded-xl font-semibold text-sm transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('client-dashboard')}
          className="flex items-center gap-1.5 text-stone-500 hover:text-stone-800 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="text-right">
          <span className="text-xs text-stone-400 font-mono uppercase tracking-wider">Client Booking</span>
          <p className="text-xs font-semibold text-sage-800">
            For: {currentUser.preferredName || currentUser.firstName} ({currentUser.phone})
          </p>
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
          Book Your Massage Session
        </h1>
        <p className="text-stone-600 text-sm mt-1">
          Pilia ang duration, target body parts, ug ang pinakamaayo nga time slot taliwala sa 9:00 AM ug 6:00 PM.
        </p>
      </div>

      <div className="space-y-8">
        {/* Step 1: Duration & Rates */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-spa-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sage-700 text-white text-xs flex items-center justify-center font-sans">1</span>
              Select Duration &amp; Rate
            </h2>
            <span className="text-xs text-stone-500 font-medium">
              Selected: <strong className="text-sage-800">{selectedDuration} Minutes (${currentService.price})</strong>
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
                      ? 'border-sage-700 bg-sage-50 ring-2 ring-sage-600 text-sage-950 font-semibold shadow-sm'
                      : 'border-stone-200 hover:border-spa-300 bg-white text-stone-700'
                  }`}
                >
                  <div className="text-xs font-medium text-stone-500">{rate.duration} mins</div>
                  <div className="text-2xl font-serif font-bold text-stone-900 my-1">
                    ${rate.price}
                  </div>
                  <div className="text-[11px] text-stone-500 line-clamp-1">
                    {rate.duration <= 45 ? 'Targeted' : 'Full / Deep'}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2: Body Part Focus (Personalized Experience requirement) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-spa-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sage-700 text-white text-xs flex items-center justify-center font-sans">2</span>
              Body Part Focus
            </h2>
            <span className="text-xs text-sage-700 bg-sage-50 px-2.5 py-1 rounded-full font-medium">
              Personalized Experience
            </span>
          </div>

          <p className="text-xs text-stone-600">
            Specify which parts of your body you would want us to focus on (e.g. back, shoulder, arms):
          </p>

          <div className="flex flex-wrap gap-2.5">
            {BODY_PARTS_LIST.map((part) => {
              const isChecked = selectedBodyParts.includes(part);
              return (
                <button
                  key={part}
                  type="button"
                  onClick={() => toggleBodyPart(part)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isChecked
                      ? 'bg-sage-700 text-white shadow-sm ring-2 ring-sage-500/40'
                      : 'bg-spa-100 hover:bg-spa-200 text-stone-700 border border-stone-200'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5" />}
                  {part}
                </button>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1 mt-3">
              Additional Notes or Specific Conditions (Optional)
            </label>
            <input
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g. Sore right shoulder, stiff neck from desk work, prefer light pressure on calves..."
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
            />
          </div>

          {/* Professional Assessment Notice */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center gap-2.5 text-xs text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Professional Assessment:</strong> We also provide an on-site assessment to determine the best massage technique for your exact needs.
            </span>
          </div>
        </section>

        {/* Step 3: Choose Date */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-spa-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sage-700 text-white text-xs flex items-center justify-center font-sans">3</span>
              Select Date
            </h2>
            <span className="text-xs text-stone-500">
              Open Daily: 9:00 AM – 6:00 PM
            </span>
          </div>

          <div className="max-w-xs">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Appointment Date
            </label>
            <div className="relative">
              <CalendarIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="date"
                min={getTodayDateString()}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
            </div>
          </div>
        </section>

        {/* Step 4: Time Slot Selection with Hidden Buffer Logic */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-spa-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sage-700 text-white text-xs flex items-center justify-center font-sans">4</span>
                Select Available Time Slot
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Pili ug available nga slot alang sa {selectedDate}. Available between 9:00 AM – 6:00 PM.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-white border border-stone-300"></span>
                <span className="text-stone-600">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-stone-200"></span>
                <span className="text-stone-400">Not Available</span>
              </div>
            </div>
          </div>

          {/* Time Slots Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-2">
            {availableSlots.map((slot) => {
              const isSelected = selectedTimeSlot?.timeStr === slot.timeStr;
              const isAvailable = slot.isAvailable;

              if (!isAvailable) {
                return (
                  <div
                    key={slot.timeStr}
                    className="p-3 rounded-xl bg-stone-100/80 border border-stone-200/80 text-center cursor-not-allowed opacity-60 select-none"
                    title="This time slot is not available"
                  >
                    <div className="text-xs font-semibold text-stone-400 line-through">
                      {slot.displayTime}
                    </div>
                    <div className="text-[10px] text-stone-400 font-medium mt-0.5">
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
                      ? 'border-sage-700 bg-sage-700 text-white shadow-md ring-2 ring-sage-400'
                      : 'border-stone-200 hover:border-sage-400 bg-white hover:bg-sage-50/50 text-stone-800'
                  }`}
                >
                  <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                    {slot.displayTime}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-sage-200' : 'text-stone-500'}`}>
                    to {slot.displayEndTime}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedTimeSlot && (
            <div className="p-4 bg-sage-50 rounded-2xl border border-sage-200 flex items-center justify-between text-xs text-sage-900 animate-fade-in mt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-sage-700" />
                <span>
                  Napili nga Oras: <strong>{selectedTimeSlot.displayTime} – {selectedTimeSlot.displayEndTime}</strong> ({selectedDate})
                </span>
              </div>
              <span className="font-bold text-sm text-sage-800">${currentService.price}</span>
            </div>
          )}
        </section>

        {/* Step 5: Booking Review & Submit */}
        <section className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-spa-300 font-mono">Summary</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-0.5">
                Ready to Confirm Your Session?
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-400">Total Amount</span>
              <div className="text-3xl font-serif font-bold text-spa-200">
                ${currentService.price}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-300 bg-white/5 p-4 rounded-2xl border border-white/10">
            <div>
              <span className="text-stone-400 block">Client:</span>
              <strong className="text-white text-sm">
                {currentUser.firstName} {currentUser.lastName} ({currentUser.preferredName})
              </strong>
            </div>

            <div>
              <span className="text-stone-400 block">Session &amp; Time:</span>
              <strong className="text-white text-sm">
                {selectedDuration} mins @ {selectedTimeSlot ? selectedTimeSlot.displayTime : 'Please pick a slot'}
              </strong>
            </div>

            <div>
              <span className="text-stone-400 block">Target Body Focus:</span>
              <strong className="text-white text-sm">
                {selectedBodyParts.join(', ') || 'General Wellness'}
              </strong>
            </div>
          </div>

          <button
            type="button"
            disabled={!selectedTimeSlot}
            onClick={handleConfirmBooking}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all ${
              selectedTimeSlot
                ? 'bg-sage-600 hover:bg-sage-500 text-white cursor-pointer active:scale-[0.99]'
                : 'bg-stone-700 text-stone-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            {selectedTimeSlot ? 'Confirm & Book Appointment' : 'Pili ug Time Slot sa Ibabaw'}
          </button>
        </section>
      </div>

      {/* Booking Success Confirmation Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-center space-y-5 border border-spa-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Booking Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Na-schedule na ang imong appointment sa Serenity Massage Clinic.
              </p>
            </div>

            <div className="bg-spa-50 p-4 rounded-2xl border border-spa-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Booking Reference:</span>
                <span className="font-mono font-bold text-stone-800">{createdAptId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Date &amp; Time:</span>
                <span className="font-semibold text-stone-800">
                  {selectedDate} @ {selectedTimeSlot?.displayTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Duration &amp; Price:</span>
                <span className="font-semibold text-stone-800">
                  {selectedDuration} mins (${currentService.price})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Target Focus:</span>
                <span className="font-semibold text-stone-800">
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
                className="w-full py-3 px-4 bg-sage-700 hover:bg-sage-800 text-white rounded-xl font-semibold text-xs tracking-wide shadow-md transition-all"
              >
                View My Appointments
              </button>

              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  onNavigate('client-dashboard');
                }}
                className="w-full py-2.5 px-4 text-stone-600 hover:bg-stone-100 rounded-xl font-medium text-xs transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

