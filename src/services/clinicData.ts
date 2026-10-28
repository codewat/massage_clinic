import { User, Appointment, ServiceRate } from '../types';

export const SERVICE_RATES: ServiceRate[] = [
  {
    duration: 30,
    price: 65,
    title: '30-Minute Quick Relief',
    description: 'Targeted session focused on high-tension areas for swift rejuvenation.',
    restBufferMinutes: 10,
  },
  {
    duration: 45,
    price: 90,
    title: '45-Minute Focused Therapy',
    description: 'Comprehensive focus on selected muscle groups and tension points.',
    restBufferMinutes: 10,
  },
  {
    duration: 60,
    price: 115,
    title: '60-Minute Classic Full Body / Focused',
    description: 'The standard restorative full-body massage designed to release stress.',
    restBufferMinutes: 15,
  },
  {
    duration: 75,
    price: 140,
    title: '75-Minute Deep Restorative',
    description: 'Extended full-body therapy with deep tissue and relaxation techniques.',
    restBufferMinutes: 15,
  },
  {
    duration: 90,
    price: 160,
    title: '90-Minute Ultimate Wellness',
    description: 'Our premier luxury full-body experience for complete mind-body harmony.',
    restBufferMinutes: 15,
  },
];

export const BODY_PARTS_LIST = [
  'Back',
  'Shoulders',
  'Neck',
  'Arms & Hands',
  'Lower Back & Hips',
  'Legs & Thighs',
  'Feet & Calves',
  'Full Body Harmonization',
  'Head & Scalp',
];

// Helper to format minutes to HH:mm (24-hour)
export function minutesToTimeString(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

// Helper to convert "HH:mm" to minutes from midnight
export function timeStringToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

// Helper to convert 24h "HH:mm" to 12h display "9:00 AM"
export function formatDisplayTime(timeStr: string): string {
  if (!timeStr) return '';
  const [hStr, mStr] = timeStr.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr.padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12;
  return `${h}:${m} ${ampm}`;
}

// Buffer helper: 10 min for 30/45 min, 15 min for 60/75/90 min
export function getRestBufferMinutes(duration: number): number {
  return duration <= 45 ? 10 : 15;
}

// Format Date YYYY-MM-DD
export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTodayDateString(): string {
  return formatDateKey(new Date());
}

// Initial default users
const DEFAULT_USERS: User[] = [
  {
    id: 'user_admin_01',
    firstName: 'Maria',
    preferredName: 'Admin Maria',
    lastName: 'Santos',
    phone: '0917-888-2468',
    email: 'admin@serenity.com',
    password: 'admin',
    homeAddress: 'Suite 402, Serenity Wellness Tower, Cebu City',
    profilePic: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    role: 'admin',
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: 'user_client_01',
    firstName: 'Jessica',
    preferredName: 'Jess',
    lastName: 'Ramos',
    phone: '0917-555-1234',
    email: 'client@gmail.com',
    password: 'client',
    homeAddress: '45 Lotus St., Villa Aurora, Mabolo, Cebu City',
    profilePic: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    role: 'client',
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
  },
  {
    id: 'user_client_02',
    firstName: 'Carlos',
    preferredName: 'Caloy',
    lastName: 'Villanueva',
    phone: '0922-334-9988',
    email: 'caloy.v@yahoo.com',
    password: 'client',
    homeAddress: '12 Acacia Drive, Banilad, Cebu City',
    profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    role: 'client',
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: 'user_client_03',
    firstName: 'Andrea',
    preferredName: 'Andie',
    lastName: 'Tan',
    phone: '0918-777-6543',
    email: 'andrea.tan@outlook.com',
    password: 'client',
    homeAddress: 'Unit 8B, Solinea Tower, Cebu Business Park',
    profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    role: 'client',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  }
];

// Initial pre-loaded appointments
function getInitialAppointments(): Appointment[] {
  const today = getTodayDateString();
  
  // Yesterday and tomorrow dates
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = formatDateKey(yesterdayDate);

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = formatDateKey(tomorrowDate);

  return [
    {
      id: 'apt_01',
      userId: 'user_client_01',
      clientName: 'Jessica Ramos',
      clientPreferredName: 'Jess',
      clientPhone: '0917-555-1234',
      clientEmail: 'client@gmail.com',
      date: today,
      startTime: '09:30',
      endTime: '10:30',
      duration: 60,
      price: 115,
      bodyPartFocus: ['Back', 'Shoulders'],
      customNotes: 'Chronic shoulder tightness due to desk work. Moderate to deep pressure.',
      status: 'confirmed',
      restBufferMinutes: 15,
      bufferEndTime: '10:45',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'apt_02',
      userId: 'user_client_02',
      clientName: 'Carlos Villanueva',
      clientPreferredName: 'Caloy',
      clientPhone: '0922-334-9988',
      clientEmail: 'caloy.v@yahoo.com',
      date: today,
      startTime: '13:00',
      endTime: '13:45',
      duration: 45,
      price: 90,
      bodyPartFocus: ['Lower Back & Hips', 'Legs & Thighs'],
      customNotes: 'Post-workout soreness.',
      status: 'confirmed',
      restBufferMinutes: 10,
      bufferEndTime: '13:55',
      createdAt: new Date(Date.now() - 43200000).toISOString(),
    },
    {
      id: 'apt_03',
      userId: 'user_client_03',
      clientName: 'Andrea Tan',
      clientPreferredName: 'Andie',
      clientPhone: '0918-777-6543',
      clientEmail: 'andrea.tan@outlook.com',
      date: today,
      startTime: '15:30',
      endTime: '17:00',
      duration: 90,
      price: 160,
      bodyPartFocus: ['Full Body Harmonization', 'Neck', 'Head & Scalp'],
      customNotes: 'Stress relief and calming aromatics.',
      status: 'confirmed',
      restBufferMinutes: 15,
      bufferEndTime: '17:15',
      createdAt: new Date(Date.now() - 21600000).toISOString(),
    },
    {
      id: 'apt_past_01',
      userId: 'user_client_01',
      clientName: 'Jessica Ramos',
      clientPreferredName: 'Jess',
      clientPhone: '0917-555-1234',
      clientEmail: 'client@gmail.com',
      date: yesterday,
      startTime: '11:00',
      endTime: '11:30',
      duration: 30,
      price: 65,
      bodyPartFocus: ['Neck', 'Shoulders'],
      customNotes: 'Quick neck relief.',
      status: 'done',
      restBufferMinutes: 10,
      bufferEndTime: '11:40',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: 'apt_upcoming_01',
      userId: 'user_client_01',
      clientName: 'Jessica Ramos',
      clientPreferredName: 'Jess',
      clientPhone: '0917-555-1234',
      clientEmail: 'client@gmail.com',
      date: tomorrow,
      startTime: '14:00',
      endTime: '15:15',
      duration: 75,
      price: 140,
      bodyPartFocus: ['Back', 'Lower Back & Hips'],
      customNotes: 'Deep tissue therapy.',
      status: 'confirmed',
      restBufferMinutes: 15,
      bufferEndTime: '15:30',
      createdAt: new Date().toISOString(),
    }
  ];
}

const STORAGE_KEY_USERS = 'serenity_spa_users_v2';
const STORAGE_KEY_APPOINTMENTS = 'serenity_spa_appointments_v2';
const STORAGE_KEY_CURRENT_USER = 'serenity_spa_current_user_v2';

export const ClinicStore = {
  getUsers(): User[] {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_USERS;
    }
  },

  saveUsers(users: User[]) {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  },

  getUserById(id: string): User | undefined {
    return this.getUsers().find(u => u.id === id);
  },

  updateUser(updated: User): User {
    const users = this.getUsers().map(u => u.id === updated.id ? updated : u);
    this.saveUsers(users);
    
    // Also update current user if it's the same person
    const cur = this.getCurrentUser();
    if (cur && cur.id === updated.id) {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(updated));
    }
    return updated;
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setCurrentUser(user: User | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    }
  },

  getAppointments(): Appointment[] {
    const raw = localStorage.getItem(STORAGE_KEY_APPOINTMENTS);
    if (!raw) {
      const initial = getInitialAppointments();
      localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveAppointments(apts: Appointment[]) {
    localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(apts));
  },

  addAppointment(appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'endTime' | 'restBufferMinutes' | 'bufferEndTime'>): Appointment {
    const duration = appointmentData.duration;
    const restBufferMinutes = getRestBufferMinutes(duration);
    
    const startMins = timeStringToMinutes(appointmentData.startTime);
    const endMins = startMins + duration;
    const bufferEndMins = endMins + restBufferMinutes;

    const newApt: Appointment = {
      ...appointmentData,
      id: 'apt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      endTime: minutesToTimeString(endMins),
      restBufferMinutes,
      bufferEndTime: minutesToTimeString(bufferEndMins),
      createdAt: new Date().toISOString(),
    };

    const appointments = this.getAppointments();
    appointments.push(newApt);
    this.saveAppointments(appointments);
    return newApt;
  },

  updateAppointment(updated: Appointment): Appointment {
    const startMins = timeStringToMinutes(updated.startTime);
    const endMins = startMins + updated.duration;
    const restBufferMinutes = getRestBufferMinutes(updated.duration);
    const bufferEndMins = endMins + restBufferMinutes;

    const normalized: Appointment = {
      ...updated,
      endTime: minutesToTimeString(endMins),
      restBufferMinutes,
      bufferEndTime: minutesToTimeString(bufferEndMins),
    };

    const apts = this.getAppointments().map(a => a.id === normalized.id ? normalized : a);
    this.saveAppointments(apts);
    return normalized;
  },

  deleteAppointment(id: string) {
    const apts = this.getAppointments().filter(a => a.id !== id);
    this.saveAppointments(apts);
  },

  // Reset to demo data
  resetToDefaults() {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(DEFAULT_USERS));
    localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(getInitialAppointments()));
    this.setCurrentUser(DEFAULT_USERS[1]); // default to client Jessica
  }
};
