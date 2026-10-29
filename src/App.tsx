import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { RatesPage } from './pages/RatesPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ClientDashboardPage } from './pages/ClientDashboardPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { ViewAppointmentsPage } from './pages/ViewAppointmentsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminCalendarPage } from './pages/AdminCalendarPage';
import { AdminClientProfilesPage } from './pages/AdminClientProfilesPage';

const MainApp: React.FC = () => {
  const { currentUser, isAdmin, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [preselectedDuration, setPreselectedDuration] = useState<number>(60);

  // If user is authenticated and is on a public page like home/rates/contact, or switches roles
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin && (currentPage === 'client-dashboard' || currentPage === 'view-appointments')) {
        setCurrentPage('admin-dashboard');
      }
    }
  }, [isAdmin, isAuthenticated]);

  const handleSelectDuration = (dur: number) => {
    setPreselectedDuration(dur);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'rates':
        return (
          <RatesPage
            onNavigate={setCurrentPage}
            onSelectDuration={handleSelectDuration}
          />
        );
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'register':
        return <RegisterPage onNavigate={setCurrentPage} />;
      case 'client-dashboard':
        return <ClientDashboardPage onNavigate={setCurrentPage} />;
      case 'book-appointment':
        return (
          <BookAppointmentPage
            onNavigate={setCurrentPage}
            preselectedDuration={preselectedDuration}
          />
        );
      case 'view-appointments':
        return <ViewAppointmentsPage onNavigate={setCurrentPage} />;
      case 'view-profile':
        return <ProfilePage onNavigate={setCurrentPage} />;
      case 'admin-dashboard':
        return <AdminDashboardPage onNavigate={setCurrentPage} />;
      case 'admin-calendar':
        return <AdminCalendarPage onNavigate={setCurrentPage} />;
      case 'admin-clients':
        return <AdminClientProfilesPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col text-white selection:bg-[#F1BB09] selection:text-[#1A1A1A]">
      {/* Steady Fixed Background Image across whole app */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src="/bg.jpeg"
          alt="Clinic Background"
          className="w-full h-full object-cover object-left md:object-center brightness-105 contrast-100"
        />
        {/* Clear translucent dark overlay (#59000000) for great readability while keeping image visible */}
        <div className="absolute inset-0 bg-[#161E1A]/45 backdrop-blur-[0.5px]" />
      </div>

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <MainApp />
      </AppointmentProvider>
    </AuthProvider>
  );
};

export default App;
