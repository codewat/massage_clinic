export type UserRole = 'client' | 'admin';

export interface User {
  id: string;
  firstName: string;
  preferredName: string;
  lastName: string;
  phone: string;
  email: string;
  homeAddress: string;
  profilePic?: string;
  role: UserRole;
  password?: string;
  createdAt: string;
}

export type AppointmentStatus = 'confirmed' | 'done' | 'cancelled';

export interface Appointment {
  id: string;
  userId: string;
  clientName: string;
  clientPreferredName: string;
  clientPhone: string;
  clientEmail: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // "09:00" (24h) or "9:00 AM"
  endTime: string; // calculated: startTime + duration
  duration: number; // 30, 45, 60, 75, 90
  price: number; // 65, 90, 115, 140, 160
  bodyPartFocus: string[]; // ['Back', 'Shoulders', etc.]
  customNotes?: string;
  status: AppointmentStatus;
  restBufferMinutes: number; // 10 min for 30/45, 15 min for 60/75/90
  bufferEndTime: string; // startTime + duration + restBufferMinutes
  createdAt: string;
}

export interface ServiceRate {
  duration: number;
  price: number;
  title: string;
  description: string;
  restBufferMinutes: number;
}
