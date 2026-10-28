import { Appointment } from '../types';
import { 
  timeStringToMinutes, 
  minutesToTimeString, 
  formatDisplayTime, 
  getRestBufferMinutes 
} from './clinicData';

export interface GeneratedTimeSlot {
  timeStr: string; // "09:00"
  displayTime: string; // "9:00 AM"
  endTimeStr: string; // "10:00"
  displayEndTime: string; // "10:00 AM"
  isAvailable: boolean;
  bookedByClientName?: string; // only visible to admin
  bookedAppointmentId?: string;
  therapistRestNotice?: string; // only visible to admin
}

// Opening: 9:00 AM (540 mins) to 6:00 PM (1080 mins)
const OPENING_MINUTE = 9 * 60; // 540
const CLOSING_MINUTE = 18 * 60; // 1080
const SLOT_INTERVAL = 15; // Every 15 mins step (e.g., 9:00, 9:15, 9:30, 9:45...)

export function generateDailySlots(
  dateStr: string,
  durationMinutes: number,
  allAppointments: Appointment[],
  isAdmin: boolean = false,
  excludeAppointmentId?: string // for editing an existing appointment
): GeneratedTimeSlot[] {
  const activeAppointments = allAppointments.filter(
    (apt) => apt.date === dateStr && apt.status !== 'cancelled' && apt.id !== excludeAppointmentId
  );

  const candidateBuffer = getRestBufferMinutes(durationMinutes);
  const slots: GeneratedTimeSlot[] = [];

  for (let currentMin = OPENING_MINUTE; currentMin <= CLOSING_MINUTE - durationMinutes; currentMin += SLOT_INTERVAL) {
    const candidateStartMin = currentMin;
    const candidateEndMin = candidateStartMin + durationMinutes;
    const candidateBufferEndMin = candidateEndMin + candidateBuffer;

    // Check collision with any existing appointment on this day
    let collisionApt: Appointment | null = null;

    for (const apt of activeAppointments) {
      const aptStartMin = timeStringToMinutes(apt.startTime);
      const aptBufferEndMin = timeStringToMinutes(apt.bufferEndTime);

      // Check overlap: candidate is active between [candidateStartMin, candidateBufferEndMin]
      // and existing appointment occupies therapist between [aptStartMin, aptBufferEndMin]
      const overlaps = Math.max(candidateStartMin, aptStartMin) < Math.min(candidateBufferEndMin, aptBufferEndMin);

      if (overlaps) {
        collisionApt = apt;
        break;
      }
    }

    const timeStr = minutesToTimeString(candidateStartMin);
    const endTimeStr = minutesToTimeString(candidateEndMin);

    if (collisionApt) {
      slots.push({
        timeStr,
        displayTime: formatDisplayTime(timeStr),
        endTimeStr,
        displayEndTime: formatDisplayTime(endTimeStr),
        isAvailable: false,
        // Admin gets the client name and rest buffer info; client gets NONE of this
        bookedByClientName: isAdmin ? (collisionApt.clientPreferredName || collisionApt.clientName) : undefined,
        bookedAppointmentId: isAdmin ? collisionApt.id : undefined,
        therapistRestNotice: isAdmin ? `+${collisionApt.restBufferMinutes}m rest buffer` : undefined,
      });
    } else {
      slots.push({
        timeStr,
        displayTime: formatDisplayTime(timeStr),
        endTimeStr,
        displayEndTime: formatDisplayTime(endTimeStr),
        isAvailable: true,
      });
    }
  }

  return slots;
}
