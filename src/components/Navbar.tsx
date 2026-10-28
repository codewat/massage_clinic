import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Calendar, 
  UserCheck, 
  LogOut, 
  Menu, 
  X, 
  Smartphone, 
  Clock, 
  PlusCircle, 
  User as UserIcon,
  LayoutDashboard
} from 'lucide-react';
import { InstallPwaModal } from './InstallPwaModal';
import { CLINIC_NAME, CLINIC_TITLE } from '../services/clinicData';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const { currentUser, isAuthenticated, isAdmin, logout, quickSwitchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPwaModal, setShowPwaModal] = useState(false);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#161E1A]/85 backdrop-blur-md border-b border-white/10 shadow-lg transition-all">
        {/* Quick Testing Switcher Banner */}
        <div className="bg-[#1B2724] text-stone-300 px-4 py-1.5 text-xs flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#F1BB09] animate-pulse"></span>
            <span className="text-stone-300">
              Active Mode: <strong className="text-[#F1BB09] uppercase tracking-wider">{isAdmin ? 'Admin View' : 'Client View'}</strong>
              {currentUser && (
                <span className="text-[#FBF4C4]/80 ml-1">
                  ({currentUser.preferredName || currentUser.firstName})
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[#FBF4C4]/60 text-[11px]">Quick Switcher:</span>
            <button
              onClick={() => quickSwitchRole('admin')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                isAdmin 
                  ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold shadow-sm' 
                  : 'bg-[#161E1A] text-stone-300 hover:text-white border border-white/10'
              }`}
            >
              Admin Mode
            </button>
            <button
              onClick={() => quickSwitchRole('client')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                !isAdmin 
                  ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold shadow-sm' 
                  : 'bg-[#161E1A] text-stone-300 hover:text-white border border-white/10'
              }`}
            >
              Client Mode
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Clinic Brand / Logo */}
            <div 
              onClick={() => navigateTo(isAuthenticated ? (isAdmin ? 'admin-dashboard' : 'client-dashboard') : 'home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#1B2724] border border-[#F1BB09]/40 text-[#F1BB09] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  {CLINIC_NAME}
                </span>
                <p className="text-[11px] text-[#F1BB09] tracking-wider uppercase font-medium">
                  {CLINIC_TITLE}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
              {/* Only show Home, Rates, and Contact if NOT logged in */}
              {!isAuthenticated && (
                <>
                  <button
                    onClick={() => navigateTo('home')}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                      currentPage === 'home'
                        ? 'text-[#1A1A1A] bg-[#F1BB09] font-bold shadow-sm'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Home
                  </button>

                  <button
                    onClick={() => navigateTo('rates')}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                      currentPage === 'rates'
                        ? 'text-[#1A1A1A] bg-[#F1BB09] font-bold shadow-sm'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Rates &amp; Services
                  </button>

                  <button
                    onClick={() => navigateTo('contact')}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                      currentPage === 'contact'
                        ? 'text-[#1A1A1A] bg-[#F1BB09] font-bold shadow-sm'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Contact
                  </button>
                </>
              )}

              {/* Logged in as Admin: Admin Navigation */}
              {isAuthenticated && isAdmin && (
                <>
                  <button
                    onClick={() => navigateTo('admin-dashboard')}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      currentPage === 'admin-dashboard'
                        ? 'text-[#1A1A1A] bg-[#F1BB09] font-bold shadow-sm'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-[#0D9488]" />
                    Today's Bookings
                  </button>
                  <button
                    onClick={() => navigateTo('admin-calendar')}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      currentPage === 'admin-calendar'
                        ? 'text-[#1A1A1A] bg-[#F1BB09] font-bold shadow-sm'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Calendar className="w-4 h-4 text-[#0D9488]" />
                    Calendar Schedule
                  </button>
                  <button
                    onClick={() => navigateTo('admin-clients')}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      currentPage === 'admin-clients'
                        ? 'text-[#1A1A1A] bg-[#F1BB09] font-bold shadow-sm'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-[#0D9488]" />
                    Client Profiles
                  </button>
                </>
              )}

              {/* Logged in as Client: Quick Client Actions */}
              {isAuthenticated && !isAdmin && (
                <>
                  <button
                    onClick={() => navigateTo('client-dashboard')}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      currentPage === 'client-dashboard'
                        ? 'text-[#1A1A1A] bg-[#F1BB09] font-bold shadow-sm'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#0D9488]" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigateTo('book-appointment')}
                    className="px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 bg-[#F1BB09] text-[#1A1A1A] hover:bg-[#DEAA06] shadow-md transition-all active:scale-95"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Book Appointment
                  </button>
                  <button
                    onClick={() => navigateTo('view-appointments')}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      currentPage === 'view-appointments'
                        ? 'text-[#1A1A1A] bg-[#F1BB09] font-bold shadow-sm'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Calendar className="w-4 h-4 text-[#0D9488]" />
                    My Appointments
                  </button>
                  <button
                    onClick={() => navigateTo('view-profile')}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      currentPage === 'view-profile'
                        ? 'text-[#1A1A1A] bg-[#F1BB09] font-bold shadow-sm'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <UserIcon className="w-4 h-4 text-[#0D9488]" />
                    My Profile
                  </button>
                </>
              )}
            </nav>

            {/* Right Side: Install App & User Account */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setShowPwaModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#FBF4C4] bg-[#716B56]/50 border border-[#716B56] hover:bg-[#716B56] transition-colors"
                title="Install App"
              >
                <Smartphone className="w-4 h-4 text-[#F1BB09]" />
                <span className="hidden xl:inline">Install App</span>
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                  <div 
                    onClick={() => navigateTo(isAdmin ? 'admin-dashboard' : 'view-profile')}
                    className="flex items-center gap-2 cursor-pointer p-1.5 rounded-2xl hover:bg-white/10 transition-colors"
                  >
                    {currentUser?.profilePic ? (
                      <img
                        src={currentUser.profilePic}
                        alt="Profile"
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-[#F1BB09]"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#0D9488] text-white flex items-center justify-center font-bold text-sm">
                        {currentUser?.firstName?.[0] || 'U'}
                      </div>
                    )}
                    <div className="text-left leading-tight hidden lg:block">
                      <div className="text-sm font-semibold text-white">
                        {currentUser?.preferredName || currentUser?.firstName}
                      </div>
                      <div className="text-[11px] text-[#F1BB09] capitalize">
                        {currentUser?.role === 'admin' ? 'Administrator' : 'Client'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={logout}
                    className="p-2 text-stone-400 hover:text-[#FF5252] rounded-xl hover:bg-white/10 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('login')}
                    className="px-4 py-2 text-sm font-medium text-stone-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigateTo('register')}
                    className="px-4 py-2 bg-[#F1BB09] hover:bg-[#DEAA06] text-[#1A1A1A] text-sm font-bold rounded-xl shadow-md transition-all active:scale-95"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setShowPwaModal(true)}
                className="p-2 text-[#F1BB09] bg-[#1B2724] border border-[#F1BB09]/30 rounded-xl"
                aria-label="Install App"
              >
                <Smartphone className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#161E1A]/95 backdrop-blur-xl border-t border-white/10 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl">
            {isAuthenticated && (
              <div 
                onClick={() => navigateTo(isAdmin ? 'admin-dashboard' : 'view-profile')}
                className="flex items-center gap-3 p-3 bg-[#1B2724] rounded-2xl border border-white/10 cursor-pointer mb-3"
              >
                {currentUser?.profilePic ? (
                  <img src={currentUser.profilePic} alt="" className="w-11 h-11 rounded-full object-cover ring-2 ring-[#F1BB09]" />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#0D9488] text-white flex items-center justify-center font-bold">
                    {currentUser?.firstName?.[0] || 'U'}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-white">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </div>
                  <div className="text-xs text-[#F1BB09]">
                    {currentUser?.role === 'admin' ? 'Administrator' : `Preferred: ${currentUser?.preferredName}`}
                  </div>
                </div>
              </div>
            )}

            {/* Show Home, Rates, Contact ONLY if NOT logged in */}
            {!isAuthenticated && (
              <>
                <button
                  onClick={() => navigateTo('home')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium ${
                    currentPage === 'home' ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold' : 'text-stone-300'
                  }`}
                >
                  Home
                </button>

                <button
                  onClick={() => navigateTo('rates')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium ${
                    currentPage === 'rates' ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold' : 'text-stone-300'
                  }`}
                >
                  Rates &amp; Services
                </button>

                <button
                  onClick={() => navigateTo('contact')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium ${
                    currentPage === 'contact' ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold' : 'text-stone-300'
                  }`}
                >
                  Contact Us
                </button>
              </>
            )}

            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <>
                    <button
                      onClick={() => navigateTo('admin-dashboard')}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium flex items-center gap-2.5 ${
                        currentPage === 'admin-dashboard' ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold' : 'text-stone-300'
                      }`}
                    >
                      <Clock className="w-5 h-5 text-[#0D9488]" />
                      Today's Bookings
                    </button>
                    <button
                      onClick={() => navigateTo('admin-calendar')}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium flex items-center gap-2.5 ${
                        currentPage === 'admin-calendar' ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold' : 'text-stone-300'
                      }`}
                    >
                      <Calendar className="w-5 h-5 text-[#0D9488]" />
                      Calendar Schedule
                    </button>
                    <button
                      onClick={() => navigateTo('admin-clients')}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium flex items-center gap-2.5 ${
                        currentPage === 'admin-clients' ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold' : 'text-stone-300'
                      }`}
                    >
                      <UserCheck className="w-5 h-5 text-[#0D9488]" />
                      Client Profiles
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigateTo('client-dashboard')}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium flex items-center gap-2.5 ${
                        currentPage === 'client-dashboard' ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold' : 'text-stone-300'
                      }`}
                    >
                      <LayoutDashboard className="w-5 h-5 text-[#0D9488]" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => navigateTo('book-appointment')}
                      className="w-full text-left px-4 py-3 rounded-xl text-base font-bold bg-[#F1BB09] text-[#1A1A1A] flex items-center gap-2.5 shadow-md"
                    >
                      <PlusCircle className="w-5 h-5" />
                      Book Appointment
                    </button>
                    <button
                      onClick={() => navigateTo('view-appointments')}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium flex items-center gap-2.5 ${
                        currentPage === 'view-appointments' ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold' : 'text-stone-300'
                      }`}
                    >
                      <Calendar className="w-5 h-5 text-[#0D9488]" />
                      My Appointments
                    </button>
                    <button
                      onClick={() => navigateTo('view-profile')}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium flex items-center gap-2.5 ${
                        currentPage === 'view-profile' ? 'bg-[#F1BB09] text-[#1A1A1A] font-bold' : 'text-stone-300'
                      }`}
                    >
                      <UserIcon className="w-5 h-5 text-[#0D9488]" />
                      My Profile
                    </button>
                  </>
                )}

                <div className="pt-3 border-t border-white/10">
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-base font-medium text-[#FF5252] hover:bg-white/10 flex items-center gap-2.5"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigateTo('login')}
                  className="w-full py-2.5 px-4 text-center font-medium text-white bg-[#1B2724] border border-white/20 rounded-xl"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigateTo('register')}
                  className="w-full py-2.5 px-4 text-center font-bold text-[#1A1A1A] bg-[#F1BB09] rounded-xl shadow-md"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      <InstallPwaModal isOpen={showPwaModal} onClose={() => setShowPwaModal(false)} />
    </>
  );
};
