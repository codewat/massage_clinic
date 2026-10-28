import React, { createContext, useContext, useState } from 'react';
import { Appointment } from '../types';
import { ClinicStore, getTodayDateString } from '../services/clinicData';

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (data: Omit<Appointment, 'id' | 'createdAt' | 'endTime' | 'restBufferMinutes' | 'bufferEndTime'>) => Appointment;
  updateAppointment: (data: Appointment) => Appointment;
  cancelAppointment: (id: string) => void;
  markAsDone: (id: string) => void;
  deleteAppointment: (id: string) => void;
  getClientAppointments: (userId: string) => Appointment[];
  getTodayAppointments: () => Appointment[];
  refresh: () => void;
  resetDemoData: () => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => ClinicStore.getAppointments());

  const refresh = () => {
    setAppointments(ClinicStore.getAppointments());
  };

  const addAppointment = (data: Omit<Appointment, 'id' | 'createdAt' | 'endTime' | 'restBufferMinutes' | 'bufferEndTime'>) => {
    const created = ClinicStore.addAppointment(data);
    refresh();
    return created;
  };

  const updateAppointment = (data: Appointment) => {
    const updated = ClinicStore.updateAppointment(data);
    refresh();
    return updated;
  };

  const cancelAppointment = (id: string) => {
    const found = appointments.find(a => a.id === id);
    if (found) {
      updateAppointment({ ...found, status: 'cancelled' });
    }
  };

  const markAsDone = (id: string) => {
    const found = appointments.find(a => a.id === id);
    if (found) {
      updateAppointment({ ...found, status: 'done' });
    }
  };

  const deleteAppointment = (id: string) => {
    ClinicStore.deleteAppointment(id);
    refresh();
  };

  const getClientAppointments = (userId: string) => {
    return appointments
      .filter(a => a.userId === userId)
      .sort((a, b) => (b.date + b.startTime).localeCompare(a.date + a.startTime));
  };

  const getTodayAppointments = () => {
    const today = getTodayDateString();
    return appointments
      .filter(a => a.date === today && a.status !== 'cancelled')
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const resetDemoData = () => {
    ClinicStore.resetToDefaults();
    refresh();
    window.location.reload();
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment,
        cancelAppointment,
        markAsDone,
        deleteAppointment,
        getClientAppointments,
        getTodayAppointments,
        refresh,
        resetDemoData,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const ctx = useContext(AppointmentContext);
  if (!ctx) {
    throw new Error('useAppointments must be used within AppointmentProvider');
  }
  return ctx;
};
