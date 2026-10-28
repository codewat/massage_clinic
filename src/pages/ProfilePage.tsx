import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Camera, 
  ArrowLeft, 
  Save, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { formatPhoneNumber, isValidPhoneNumber } from '../services/clinicData';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { currentUser, updateProfile } = useAuth();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    preferredName: '',
    lastName: '',
    phone: '',
    email: '',
    homeAddress: '',
    profilePic: '',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || '',
        preferredName: currentUser.preferredName || '',
        lastName: currentUser.lastName || '',
        phone: formatPhoneNumber(currentUser.phone || ''),
        email: currentUser.email || '',
        homeAddress: currentUser.homeAddress || '',
        profilePic: currentUser.profilePic || '',
      });
    }
  }, [currentUser]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, phone: formatPhoneNumber(e.target.value) }));
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

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isValidPhoneNumber(formData.phone)) {
      setError('Phone number must be in 000-000-0000 format (e.g. 415-555-0123).');
      return;
    }

    updateProfile({
      firstName: formData.firstName.trim(),
      preferredName: formData.preferredName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      homeAddress: formData.homeAddress.trim(),
      profilePic: formData.profilePic,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate(currentUser.role === 'admin' ? 'admin-dashboard' : 'client-dashboard')}
          className="flex items-center gap-1.5 text-stone-300 hover:text-white text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#F1BB09]" />
          Back to Dashboard
        </button>

        <span className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A] bg-[#F1BB09] font-bold px-3 py-1 rounded-full">
          Role: {currentUser.role}
        </span>
      </div>

      <div className="border-b border-white/10 pb-4">
        <h1 className="text-3xl font-serif font-bold text-white">
          Client Profile
        </h1>
        <p className="text-[#FBF4C4]/80 text-xs sm:text-sm mt-1">
          View and update your personal contact details, preferred name, and profile picture.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-white text-xs sm:text-sm flex items-center gap-2.5 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#F1BB09] shrink-0" />
          <span>
            <strong>Success!</strong> Your profile information has been saved successfully.
          </span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-[#FF5252]/20 border border-[#FF5252] text-white text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#FF5252] shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 sm:p-10 border border-white/15 shadow-xl space-y-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-4 border-b border-white/10">
          <div className="relative group">
            {formData.profilePic ? (
              <img
                src={formData.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-[#F1BB09] shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#0D9488] text-white flex items-center justify-center font-bold text-2xl ring-4 ring-[#F1BB09] shadow-lg">
                {formData.firstName?.[0] || 'U'}
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-[#F1BB09] hover:bg-[#DEAA06] text-[#1A1A1A] p-2 rounded-full shadow-md cursor-pointer transition-transform hover:scale-110">
              <Camera className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-xl font-serif font-bold text-white">
              {formData.firstName} {formData.lastName}
            </h3>
            <p className="text-xs text-[#F1BB09]">
              Preferred Name: <strong>{formData.preferredName || formData.firstName}</strong>
            </p>
            <p className="text-xs text-[#FBF4C4]/60">
              Click the camera icon to upload a new profile picture.
            </p>
          </div>
        </div>

        {/* Name Fields */}
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
              className="w-full px-3.5 py-2.5 rounded-xl translucent-input text-sm"
            />
          </div>
        </div>

        {/* Contact Fields with 000-000-0000 format */}
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
            rows={3}
            value={formData.homeAddress}
            onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl translucent-input text-sm resize-none"
          />
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => onNavigate(currentUser.role === 'admin' ? 'admin-dashboard' : 'client-dashboard')}
            className="px-5 py-2.5 rounded-xl bg-[#716B56]/50 hover:bg-[#716B56] text-[#FBF4C4] font-medium text-xs transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 btn-primary-gold rounded-xl font-bold text-xs tracking-wide shadow-md flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
};
