import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LogIn, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Lock, 
  Mail,
  AlertCircle
} from 'lucide-react';

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

    // Check if the logged in user is admin
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
    <div className="max-w-md mx-auto px-4 py-16 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 border border-spa-200 shadow-xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-800 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">Sign In to Serenity</h2>
          <p className="text-xs text-stone-500 mt-1">
            Access your appointments, book sessions, and customize body focus
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
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
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
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
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-sage-700 hover:bg-sage-800 text-white rounded-xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </button>
        </form>

        {/* Demo Fast-Login Buttons */}
        <div className="pt-4 border-t border-stone-100 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 text-center font-mono">
            Quick 1-Click Demo Login
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('client@gmail.com', 'client', false)}
              className="p-2.5 rounded-xl border border-sage-200 bg-sage-50 hover:bg-sage-100 text-sage-900 text-xs font-medium flex flex-col items-center gap-1 transition-colors"
            >
              <User className="w-4 h-4 text-sage-700" />
              <span>Login as Client</span>
              <span className="text-[10px] text-stone-500 font-normal">(Jess Ramos)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin@serenity.com', 'admin', true)}
              className="p-2.5 rounded-xl border border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-medium flex flex-col items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-stone-700" />
              <span>Login as Admin</span>
              <span className="text-[10px] text-stone-500 font-normal">(Admin Maria)</span>
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-stone-500 pt-2">
          Wala pa kay account?{' '}
          <button
            onClick={() => onNavigate('register')}
            className="font-semibold text-sage-700 hover:text-sage-800 underline underline-offset-2"
          >
            Register dinhi
          </button>
        </div>
      </div>
    </div>
  );
};

