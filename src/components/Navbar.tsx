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
  Shield, 
  Clock, 
  Tag, 
  PhoneCall, 
  PlusCircle, 
  User as UserIcon,
  LayoutDashboard
} from 'lucide-react';
import { InstallPwaModal } from './InstallPwaModal';

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
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-spa-200/80 shadow-sm transition-all">
        {/* Quick Demo Switcher Banner (Super helpful for testing Admin and Client modes) */}
        <div className="bg-sage-900 text-stone-200 px-4 py-1.5 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              Mode: <strong className="text-white uppercase tracking-wider">{isAdmin ? 'Admin View' : 'Client View'}</strong>
              {currentUser && (
                <span className="text-stone-300 ml-1">
                  ({currentUser.preferredName || currentUser.firstName})
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-stone-400 text-[11px]">Quick Switcher:</span>
            <button
              onClick={() => quickSwitchRole('admin')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                isAdmin ? 'bg-sage-600 text-white font-bold' : 'bg-sage-800 text-stone-300 hover:text-white'
              }`}
            >
              Admin Mode
            </button>
            <button
              onClick={() => quickSwitchRole('client')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                !isAdmin ? 'bg-sage-600 text-white font-bold' : 'bg-sage-800 text-stone-300 hover:text-white'
              }`}
            >
              Client Mode
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              onClick={() => navigateTo(isAdmin ? 'admin-dashboard' : 'home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sage-600 to-sage-800 text-white flex items-center justify-center shadow-md shadow-sage-900/10 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-spa-200" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 flex items-center gap-1.5">
                  Serenity
                  <span className="text-xs font-sans font-semibold uppercase tracking-widest text-sage-700 bg-sage-100 px-2 py-0.5 rounded-full border border-sage-200">
                    Clinic
                  </span>
                </span>
                <p className="text-[11px] text-stone-500 tracking-wider uppercase font-medium">
                  Therapeutic Massage & Wellness
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              <button
                onClick={() => navigateTo('home')}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === 'home'
                    ? 'text-sage-800 bg-sage-100 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-spa-100'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => navigateTo('rates')}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === 'rates'
                    ? 'text-sage-800 bg-sage-100 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-spa-100'
                }`}
              >
                Rates & Services
              </button>

              <button
                onClick={() => navigateTo('contact')}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === 'contact'
                    ? 'text-sage-800 bg-sage-100 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-spa-100'
                }`}
              >
                Contact
              </button>

              {/* Logged in as Admin: Admin Navigation */}
              {isAuthenticated && isAdmin && (
                <>
                  <div className="h-5 w-px bg-stone-300 mx-1" />
                  <button
                    onClick={() => navigateTo('admin-dashboard')}
                    className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      currentPage === 'admin-dashboard'
                        ? 'text-sage-900 bg-sage-200/70 font-semibold'
                        : 'text-stone-700 hover:bg-spa-100'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-sage-700" />
                    Today's Bookings
                  </button>
                  <button
                    onClick={() => navigateTo('admin-calendar')}
                    className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      currentPage === 'admin-calendar'
                        ? 'text-sage-900 bg-sage-200/70 font-semibold'
                        : 'text-stone-700 hover:bg-spa-100'
                    }`}
                  >
                    <Calendar className="w-4 h-4 text-sage-700" />
                    Calendar
                  </button>
                  <button
                    onClick={() => navigateTo('admin-clients')}
                    className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      currentPage === 'admin-clients'
                        ? 'text-sage-900 bg-sage-200/70 font-semibold'
                        : 'text-stone-700 hover:bg-spa-100'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-sage-700" />
                    Client Profiles
                  </button>
                </>
              )}

              {/* Logged in as Client: Quick Client Actions */}
              {isAuthenticated && !isAdmin && (
                <>
                  <div className="h-5 w-px bg-stone-300 mx-1" />
                  <button
                    onClick={() => navigateTo('client-dashboard')}
                    className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      currentPage === 'client-dashboard'
                        ? 'text-sage-900 bg-sage-200/70 font-semibold'
                        : 'text-stone-700 hover:bg-spa-100'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-sage-700" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigateTo('book-appointment')}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 bg-sage-700 text-white hover:bg-sage-800 shadow-sm transition-all active:scale-95`}
                  >
                    <PlusCircle className="w-4 h-4" />
                    Book Appointment
                  </button>
                </>
              )}
            </nav>

            {/* Desktop Right Side / Profile / App Install */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setShowPwaModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-sage-700 bg-sage-50 border border-sage-200 hover:bg-sage-100 transition-colors"
                title="Download as App"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden xl:inline">Install App</span>
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-3 pl-2 border-l border-spa-300">
                  <div 
                    onClick={() => navigateTo(isAdmin ? 'admin-dashboard' : 'view-profile')}
                    className="flex items-center gap-2 cursor-pointer p-1.5 rounded-2xl hover:bg-spa-100 transition-colors"
                  >
                    {currentUser?.profilePic ? (
                      <img
                        src={currentUser.profilePic}
                        alt="Profile"
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-sage-500/30"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-sage-200 text-sage-800 flex items-center justify-center font-bold text-sm">
                        {currentUser?.firstName?.[0] || 'U'}
                      </div>
                    )}
                    <div className="text-left leading-tight hidden lg:block">
                      <div className="text-sm font-semibold text-stone-800">
                        {currentUser?.preferredName || currentUser?.firstName}
                      </div>
                      <div className="text-[11px] text-stone-500 capitalize">
                        {currentUser?.role}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={logout}
                    className="p-2 text-stone-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('login')}
                    className="px-4 py-2 text-sm font-medium text-stone-700 hover:text-sage-800 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigateTo('register')}
                    className="px-4 py-2 bg-sage-700 hover:bg-sage-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setShowPwaModal(true)}
                className="p-2 text-sage-700 bg-sage-100 rounded-xl"
                aria-label="Download App"
              >
                <Smartphone className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-700 hover:bg-spa-100 rounded-xl transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-spa-200 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
            {isAuthenticated && (
              <div 
                onClick={() => navigateTo(isAdmin ? 'admin-dashboard' : 'view-profile')}
                className="flex items-center gap-3 p-3 bg-spa-50 rounded-2xl border border-spa-200 cursor-pointer mb-3"
              >
                {currentUser?.profilePic ? (
                  <img src={currentUser.profilePic} alt="" className="w-11 h-11 rounded-full object-cover" />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-sage-200 text-sage-800 flex items-center justify-center font-bold">
                    {currentUser?.firstName?.[0] || 'U'}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-stone-900">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </div>
                  <div className="text-xs text-stone-500">
                    {currentUser?.role === 'admin' ? 'Administrator' : `Preferred: ${currentUser?.preferredName}`}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => navigateTo('home')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium ${
                currentPage === 'home' ? 'bg-sage-100 text-sage-900 font-semibold' : 'text-stone-700'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigateTo('rates')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium ${
                currentPage === 'rates' ? 'bg-sage-100 text-sage-900 font-semibold' : 'text-stone-700'
              }`}
            >
              Rates & Services
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium ${
                currentPage === 'contact' ? 'bg-sage-100 text-sage-900 font-semibold' : 'text-stone-700'
              }`}
            >
              Contact Us
            </button>

            {isAuthenticated ? (
              <>
                <div className="pt-2 pb-1 border-t border-spa-200 text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  {isAdmin ? 'Admin Controls' : 'Client Menu'}
                </div>

                {isAdmin ? (
                  <>
                    <button
                      onClick={() => navigateTo('admin-dashboard')}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium flex items-center gap-2.5 ${
                        currentPage === 'admin-dashboard' ? 'bg-sage-200 text-sage-900 font-semibold' : 'text-stone-700'
                      }`}
                    >
                      <Clock className="w-5 h-5 text-sage-700" />
                      Today's Bookings
                    </button>
                    <button
                      onClick={() => navigateTo('admin-calendar')}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium flex items-center gap-2.5 ${
                        currentPage === 'admin-calendar' ? 'bg-sage-200 text-sage-900 font-semibold' : 'text-stone-700'
                      }`}
                    >
                      <Calendar className="w-5 h-5 text-sage-700" />
                      Calendar Schedule
                    </button>
                    <button
                      onClick={() => navigateTo('admin-clients')}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium flex items-center gap-2.5 ${
                        currentPage === 'admin-clients' ? 'bg-sage-200 text-sage-900 font-semibold' : 'text-stone-700'
                      }`}
                    >
                      <UserCheck className="w-5 h-5 text-sage-700" />
                      Client Profiles
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigateTo('client-dashboard')}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium flex items-center gap-2.5 ${
                        currentPage === 'client-dashboard' ? 'bg-sage-100 text-sage-900 font-semibold' : 'text-stone-700'
                      }`}
                    >
                      <LayoutDashboard className="w-5 h-5 text-sage-700" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => navigateTo('book-appointment')}
                      className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold bg-sage-700 text-white flex items-center gap-2.5"
                    >
                      <PlusCircle className="w-5 h-5" />
                      Book Appointment
                    </button>
                    <button
                      onClick={() => navigateTo('view-appointments')}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium flex items-center gap-2.5 ${
                        currentPage === 'view-appointments' ? 'bg-sage-100 text-sage-900 font-semibold' : 'text-stone-700'
                      }`}
                    >
                      <Calendar className="w-5 h-5 text-sage-700" />
                      View Appointments
                    </button>
                    <button
                      onClick={() => navigateTo('view-profile')}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium flex items-center gap-2.5 ${
                        currentPage === 'view-profile' ? 'bg-sage-100 text-sage-900 font-semibold' : 'text-stone-700'
                      }`}
                    >
                      <UserIcon className="w-5 h-5 text-sage-700" />
                      View Profile
                    </button>
                  </>
                )}

                <div className="pt-3 border-t border-spa-200">
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-base font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2.5"
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
                  className="w-full py-2.5 px-4 text-center font-medium text-stone-700 bg-spa-100 rounded-xl"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigateTo('register')}
                  className="w-full py-2.5 px-4 text-center font-semibold text-white bg-sage-700 rounded-xl"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* PWA Download Modal */}
      <InstallPwaModal isOpen={showPwaModal} onClose={() => setShowPwaModal(false)} />
    </>
  );
};

