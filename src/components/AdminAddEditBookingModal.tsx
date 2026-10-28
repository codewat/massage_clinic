import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { 
  SERVICE_RATES, 
  BODY_PARTS_LIST, 
  ClinicStore, 
  getTodayDateString, 
  formatPhoneNumber,
  isValidPhoneNumber,
  CLINIC_NAME
} from '../services/clinicData';
import { generateDailySlots } from '../services/bookingService';
import { useAppointments } from '../context/AppointmentContext';
import { X, Save, Plus, Calendar, AlertCircle } from 'lucide-react';

interface AdminAddEditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingToEdit?: Appointment | null;
}

export const AdminAddEditBookingModal: React.FC<AdminAddEditBookingModalProps> = ({
  isOpen,
  onClose,
  bookingToEdit
}) => {
  const { appointments, addAppointment, updateAppointment } = useAppointments();
  const allUsers = ClinicStore.getUsers().filter(u => u.role === 'client');

  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPreferredName, setClientPreferredName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  
  const [date, setDate] = useState<string>(getTodayDateString());
  const [duration, setDuration] = useState<number>(60);
  const [startTime, setStartTime] = useState<string>('10:00');
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>(['Back', 'Shoulders']);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [status, setStatus] = useState<'confirmed' | 'done' | 'cancelled'>('confirmed');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (bookingToEdit) {
      setSelectedUserId(bookingToEdit.userId);
      setClientName(bookingToEdit.clientName);
      setClientPreferredName(bookingToEdit.clientPreferredName);
      setClientPhone(formatPhoneNumber(bookingToEdit.clientPhone));
      setClientEmail(bookingToEdit.clientEmail);
      setDate(bookingToEdit.date);
      setDuration(bookingToEdit.duration);
      setStartTime(bookingToEdit.startTime);
      setSelectedBodyParts(bookingToEdit.bodyPartFocus);
      setCustomNotes(bookingToEdit.customNotes || '');
      setStatus(bookingToEdit.status);
    } else {
      const defaultUser = allUsers[0];
      if (defaultUser) {
        setSelectedUserId(defaultUser.id);
        setClientName(`${defaultUser.firstName} ${defaultUser.lastName}`);
        setClientPreferredName(defaultUser.preferredName || defaultUser.firstName);
        setClientPhone(formatPhoneNumber(defaultUser.phone));
        setClientEmail(defaultUser.email);
      }
      setDate(getTodayDateString());
      setDuration(60);
      setStartTime('10:00');
      setSelectedBodyParts(['Back', 'Shoulders']);
      setCustomNotes('');
      setStatus('confirmed');
    }
  }, [bookingToEdit, isOpen]);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    const u = allUsers.find(user => user.id === userId);
    if (u) {
      setClientName(`${u.firstName} ${u.lastName}`);
      setClientPreferredName(u.preferredName || u.firstName);
      setClientPhone(formatPhoneNumber(u.phone));
      setClientEmail(u.email);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientPhone(formatPhoneNumber(e.target.value));
  };

  const handleToggleBodyPart = (part: string) => {
    setSelectedBodyParts(prev =>
      prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
    );
  };

  const selectedService = SERVICE_RATES.find(r => r.duration === duration) || SERVICE_RATES[2];

  const availableSlots = generateDailySlots(
    date, 
    duration, 
    appointments, 
    true, 
    bookingToEdit ? bookingToEdit.id : undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidPhoneNumber(clientPhone)) {
      setError('Please provide a valid phone number in 000-000-0000 format.');
      return;
    }

    if (bookingToEdit) {
      updateAppointment({
        ...bookingToEdit,
        clientName,
        clientPreferredName: clientPreferredName || clientName,
        clientPhone,
        clientEmail,
        date,
        duration,
        startTime,
        price: selectedService.price,
        bodyPartFocus: selectedBodyParts,
        customNotes: customNotes.trim() || undefined,
        status,
      });
    } else {
      addAppointment({
        userId: selectedUserId || ('walkin_' + Date.now()),
        clientName,
        clientPreferredName: clientPreferredName || clientName,
        clientPhone,
        clientEmail,
        date,
        startTime,
        duration,
        price: selectedService.price,
        bodyPartFocus: selectedBodyParts,
        customNotes: customNotes.trim() || undefined,
        status,
      });
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in text-white">
      <div className="glass-card rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto border border-[#F1BB09]/40">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] flex items-center justify-center font-bold">
              {bookingToEdit ? <Calendar className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white">
                {bookingToEdit ? 'Edit Client Booking' : 'Add New Booking (Admin)'}
              </h3>
              <p className="text-xs text-[#FBF4C4]/80">
                {bookingToEdit ? `Ref: ${bookingToEdit.id}` : `Walk-in or phone reservation at ${CLINIC_NAME}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-[#FF5252]/20 border border-[#FF5252] text-white text-xs flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-[#FF5252] shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
          {!bookingToEdit && (
            <div>
              <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                Select Existing Client
              </label>
              <select
                value={selectedUserId}
                onChange={(e) => handleUserSelect(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl translucent-input text-sm"
              >
                {allUsers.map(u => (
                  <option key={u.id} value={u.id} className="bg-[#1B2724] text-white">
                    {u.firstName} {u.lastName} ({u.preferredName}) - {u.phone}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                Client Full Name
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl translucent-input text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                Preferred Name
              </label>
              <input
                type="text"
                value={clientPreferredName}
                onChange={(e) => setClientPreferredName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl translucent-input text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                Phone Number (000-000-0000)
              </label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={handlePhoneChange}
                maxLength={12}
                placeholder="000-000-0000"
                className="w-full px-3 py-2 rounded-xl translucent-input text-xs sm:text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl translucent-input text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10">
            <div>
              <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl translucent-input text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                Duration &amp; Price
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl translucent-input text-xs sm:text-sm"
              >
                {SERVICE_RATES.map(r => (
                  <option key={r.duration} value={r.duration} className="bg-[#1B2724] text-white">
                    {r.duration} mins (${r.price})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                Start Time (9am - 6pm)
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl translucent-input text-xs sm:text-sm"
              >
                {availableSlots.map(slot => (
                  <option 
                    key={slot.timeStr} 
                    value={slot.timeStr}
                    disabled={!slot.isAvailable && slot.timeStr !== startTime}
                    className="bg-[#1B2724] text-white"
                  >
                    {slot.displayTime} {!slot.isAvailable && slot.timeStr !== startTime ? `(Booked: ${slot.bookedByClientName || 'Client'})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Body Part Focus */}
          <div className="pt-2 border-t border-white/10">
            <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-2">
              Body Part Focus
            </label>
            <div className="flex flex-wrap gap-2">
              {BODY_PARTS_LIST.map(part => {
                const isSelected = selectedBodyParts.includes(part);
                return (
                  <button
                    key={part}
                    type="button"
                    onClick={() => handleToggleBodyPart(part)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'bg-[#F1BB09] text-[#1A1A1A]'
                        : 'bg-[#716B56]/50 hover:bg-[#716B56] text-[#FBF4C4] border border-[#716B56]'
                    }`}
                  >
                    {part}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status & Notes */}
          <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                Appointment Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl translucent-input text-xs sm:text-sm font-semibold"
              >
                <option value="confirmed" className="bg-[#1B2724] text-white">Confirmed</option>
                <option value="done" className="bg-[#1B2724] text-white">Done / Completed</option>
                <option value="cancelled" className="bg-[#1B2724] text-white">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                Internal Admin Notes
              </label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Walk-in, VIP client, injury details..."
                className="w-full px-3 py-2 rounded-xl translucent-input text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#716B56]/50 hover:bg-[#716B56] text-[#FBF4C4] font-medium text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 btn-primary-gold rounded-xl font-bold text-xs tracking-wide shadow-md flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              {bookingToEdit ? 'Save Changes' : 'Confirm & Create Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
