import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  UserPlus, 
  Upload, 
  Camera, 
  Sparkles, 
  AlertCircle, 
  Check, 
  ArrowLeft 
} from 'lucide-react';

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

    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Please fill in all required fields.');
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
      setError(res.error || 'Failed to register');
      return;
    }

    // Go to client dashboard on successful registration
    onNavigate('client-dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-spa-200 shadow-xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-800 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-900">Create Client Account</h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Rehistro para makapili sa imong personalized massage appointment
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
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
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-sage-200 shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-spa-100 border-2 border-dashed border-stone-300 flex flex-col items-center justify-center text-stone-400 group-hover:border-sage-500 transition-colors">
                  <Camera className="w-8 h-8 text-stone-400" />
                  <span className="text-[10px] mt-1 font-medium">Add Photo</span>
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-sage-700 hover:bg-sage-800 text-white p-2 rounded-full shadow-md cursor-pointer transition-transform hover:scale-110">
                <Upload className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-stone-500">
              Upload ug Profile Picture (Optional, JPEG or PNG)
            </p>
          </div>

          {/* Names Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                First Name *
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="e.g. Jessica"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Preferred Name
              </label>
              <input
                type="text"
                value={formData.preferredName}
                onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
                placeholder="e.g. Jess"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="e.g. Ramos"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 text-sm"
              />
            </div>
          </div>

          {/* Contact Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0917-555-1234"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="client@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 text-sm"
              />
            </div>
          </div>

          {/* Home Address */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Home Address *
            </label>
            <textarea
              required
              rows={2}
              value={formData.homeAddress}
              onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
              placeholder="e.g. 45 Lotus St., Villa Aurora, Mabolo, Cebu City"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 text-sm resize-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Create a password (or leave empty to default to 'client')"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-sage-700 hover:bg-sage-800 text-white rounded-xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            Complete Registration
          </button>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
          Naa na kay account?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="font-semibold text-sage-700 hover:text-sage-800 underline underline-offset-2"
          >
            Sign in dinhi
          </button>
        </div>
      </div>
    </div>
  );
};
