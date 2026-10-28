import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  UserPlus, 
  Upload, 
  Camera, 
  AlertCircle, 
  Check 
} from 'lucide-react';
import { formatPhoneNumber, isValidPhoneNumber, CLINIC_NAME } from '../services/clinicData';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { register } = useAuth();
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    preferredName: '',
    lastName: '',
    phone: '',
    email: '',
    homeAddress: '',
    password: '',
    profilePic: '',
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image file must be under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.homeAddress) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isValidPhoneNumber(formData.phone)) {
      setError('Please enter a valid phone number in 000-000-0000 format (e.g. 415-555-0123).');
      return;
    }

    const res = register({
      firstName: formData.firstName.trim(),
      preferredName: formData.preferredName.trim() || formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      homeAddress: formData.homeAddress.trim(),
      password: formData.password || 'client',
      profilePic: formData.profilePic || undefined,
    });

    if (!res.success) {
      setError(res.error || 'Failed to register account');
      return;
    }

    onNavigate('client-dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in text-white">
      <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/15 shadow-2xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] flex items-center justify-center mx-auto mb-3 shadow-md">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white">Create Client Account</h2>
          <p className="text-xs sm:text-sm text-[#FBF4C4]/75 mt-1">
            Register to book personalized appointments at {CLINIC_NAME}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-[#FF5252]/20 border border-[#FF5252] text-white text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#FF5252] shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center justify-center space-y-3 pb-2">
            <div className="relative group">
              {formData.profilePic ? (
                <img
                  src={formData.profilePic}
                  alt="Avatar Preview"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-[#F1BB09] shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#161E1A] border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-stone-400 group-hover:border-[#F1BB09] transition-colors">
                  <Camera className="w-8 h-8 text-stone-400" />
                  <span className="text-[10px] mt-1 font-medium text-[#FBF4C4]/60">Add Photo</span>
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-[#F1BB09] hover:bg-[#DEAA06] text-[#1A1A1A] p-2 rounded-full shadow-md cursor-pointer transition-transform hover:scale-110">
                <Upload className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-[#FBF4C4]/60">
              Upload Profile Picture (Optional, JPEG or PNG)
            </p>
          </div>

          {/* Names Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1.5">
                First Name *
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="e.g. Jessica"
                className="w-full px-3.5 py-2.5 rounded-xl translucent-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1.5">
                Preferred Name
              </label>
              <input
                type="text"
                value={formData.preferredName}
                onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
                placeholder="e.g. Jess"
                className="w-full px-3.5 py-2.5 rounded-xl translucent-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1.5">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="e.g. Ramos"
                className="w-full px-3.5 py-2.5 rounded-xl translucent-input text-sm"
              />
            </div>
          </div>

          {/* Contact Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1.5">
                Phone Number (000-000-0000) *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={handlePhoneChange}
                maxLength={12}
                placeholder="000-000-0000"
                className="w-full px-3.5 py-2.5 rounded-xl translucent-input text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="client@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl translucent-input text-sm"
              />
            </div>
          </div>

          {/* Home Address */}
          <div>
            <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1.5">
              Home Address *
            </label>
            <textarea
              required
              rows={2}
              value={formData.homeAddress}
              onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
              placeholder="e.g. 128 Aspen Ridge Drive, Calgary, AB"
              className="w-full px-3.5 py-2.5 rounded-xl translucent-input text-sm resize-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Create a password (default is 'client')"
              className="w-full px-3.5 py-2.5 rounded-xl translucent-input text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 btn-primary-gold rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            Complete Registration
          </button>
        </form>

        <div className="text-center text-xs text-[#FBF4C4]/70 pt-2 border-t border-white/10">
          Already registered?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="font-bold text-[#F1BB09] hover:underline underline-offset-2 ml-1"
          >
            Sign in here
          </button>
        </div>
      </div>
    </div>
  );
};
