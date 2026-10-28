import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LogIn, 
  Sparkles, 
  ShieldCheck, 
  User, 
  Lock, 
  Mail,
  AlertCircle
} from 'lucide-react';
import { CLINIC_NAME } from '../services/clinicData';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = login(email, password);
    if (!res.success) {
      setError(res.error || 'Failed to sign in');
      return;
    }

    if (email.toLowerCase().includes('admin')) {
      onNavigate('admin-dashboard');
    } else {
      onNavigate('client-dashboard');
    }
  };

  const handleQuickLogin = (demoEmail: string, demoPass: string, isAdminTarget: boolean) => {
    login(demoEmail, demoPass);
    if (isAdminTarget) {
      onNavigate('admin-dashboard');
    } else {
      onNavigate('client-dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 animate-fade-in text-white">
      <div className="glass-card rounded-3xl p-8 border border-white/15 shadow-2xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] flex items-center justify-center mx-auto mb-3 shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">Sign In</h2>
          <p className="text-xs text-[#FBF4C4]/75 mt-1">
            Access your appointments and manage your profile at {CLINIC_NAME}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-[#FF5252]/20 border border-[#FF5252] text-white text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#FF5252] shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@gmail.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl translucent-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl translucent-input text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 btn-primary-gold rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </button>
        </form>

        {/* Demo Fast-Login Buttons */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#F1BB09] text-center font-mono">
            Fast Demo Login (1-Click)
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('client@gmail.com', 'client', false)}
              className="p-3 rounded-xl border border-white/15 bg-[#161E1A] hover:bg-[#1B2724] text-white text-xs font-medium flex flex-col items-center gap-1 transition-all"
            >
              <User className="w-4 h-4 text-[#F1BB09]" />
              <span className="font-semibold">Demo Client</span>
              <span className="text-[10px] text-[#FBF4C4]/60">(Jessica Ramos)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin@charleneagdanrmt.com', 'admin', true)}
              className="p-3 rounded-xl border border-[#0D9488]/40 bg-[#161E1A] hover:bg-[#1B2724] text-white text-xs font-medium flex flex-col items-center gap-1 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
              <span className="font-semibold">Demo Admin</span>
              <span className="text-[10px] text-[#FBF4C4]/60">(Charlene Agdan)</span>
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-[#FBF4C4]/70 pt-2 border-t border-white/10">
          Don't have an account yet?{' '}
          <button
            onClick={() => onNavigate('register')}
            className="font-bold text-[#F1BB09] hover:underline underline-offset-2 ml-1"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};
