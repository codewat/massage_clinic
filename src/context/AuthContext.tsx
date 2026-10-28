import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { ClinicStore } from '../services/clinicData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => { success: boolean; error?: string };
  register: (userData: Omit<User, 'id' | 'role' | 'createdAt'>) => { success: boolean; error?: string };
  updateProfile: (userData: Partial<User>) => void;
  logout: () => void;
  quickSwitchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => ClinicStore.getCurrentUser());

  useEffect(() => {
    // If no user is logged in, default to the demo client user for smooth previewing
    if (!currentUser) {
      const users = ClinicStore.getUsers();
      const client = users.find(u => u.role === 'client');
      if (client) {
        ClinicStore.setCurrentUser(client);
        setCurrentUser(client);
      }
    }
  }, []);

  const login = (email: string, password?: string) => {
    const users = ClinicStore.getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!found) {
      return { success: false, error: 'Account not found with this email.' };
    }
    if (password && found.password && found.password !== password) {
      return { success: false, error: 'Incorrect password. (Hint: use password "client" or "admin")' };
    }
    ClinicStore.setCurrentUser(found);
    setCurrentUser(found);
    return { success: true };
  };

  const register = (userData: Omit<User, 'id' | 'role' | 'createdAt'>) => {
    const users = ClinicStore.getUsers();
    const exists = users.some(u => u.email.toLowerCase() === userData.email.trim().toLowerCase());
    if (exists) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser: User = {
      ...userData,
      id: 'user_' + Date.now(),
      role: 'client',
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    ClinicStore.saveUsers(updatedUsers);
    ClinicStore.setCurrentUser(newUser);
    setCurrentUser(newUser);
    return { success: true };
  };

  const updateProfile = (userData: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...userData };
    ClinicStore.updateUser(updated);
    setCurrentUser(updated);
  };

  const logout = () => {
    ClinicStore.setCurrentUser(null);
    setCurrentUser(null);
  };

  const quickSwitchRole = (role: UserRole) => {
    const users = ClinicStore.getUsers();
    const target = users.find(u => u.role === role);
    if (target) {
      ClinicStore.setCurrentUser(target);
      setCurrentUser(target);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin',
        login,
        register,
        updateProfile,
        logout,
        quickSwitchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

