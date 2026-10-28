import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Upload, 
  Camera, 
  Check, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Save, 
  CheckCircle2 
} from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { currentUser, updateProfile } = useAuth();
  const [savedSuccess, setSavedSuccess] = useState(false);

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
        phone: currentUser.phone || '',
        email: currentUser.email || '',
        homeAddress: currentUser.homeAddress || '',
        profilePic: currentUser.profilePic || '',
      });
    }
  }, [currentUser]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate(currentUser.role === 'admin' ? 'admin-dashboard' : 'client-dashboard')}
          className="flex items-center gap-1.5 text-stone-500 hover:text-stone-800 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <span className="text-xs font-mono uppercase tracking-wider text-sage-800 bg-sage-100 px-3 py-1 rounded-full border border-sage-200">
          Role: {currentUser.role}
        </span>
      </div>

      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-serif font-bold text-stone-900">
          Client Profile
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm mt-1">
          Pwede nimo i-edit ug i-update ang imong personal nga detalye ug profile picture dinhi.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>
            <strong>Success!</strong> Na-update na ang imong profile impormasyon.
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-spa-200 shadow-sm space-y-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-4 border-b border-stone-100">
          <div className="relative group">
            {formData.profilePic ? (
              <img
                src={formData.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-sage-200 shadow-md"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-sage-100 text-sage-800 flex items-center justify-center font-bold text-2xl ring-4 ring-sage-200 shadow-md">
                {formData.firstName?.[0] || 'U'}
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-sage-700 hover:bg-sage-800 text-white p-2 rounded-full shadow-md cursor-pointer transition-transform hover:scale-110">
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
            <h3 className="text-lg font-serif font-bold text-stone-900">
              {formData.firstName} {formData.lastName}
            </h3>
            <p className="text-xs text-stone-500">
              Preferred Name: <strong>{formData.preferredName || formData.firstName}</strong>
            </p>
            <p className="text-xs text-stone-400">
              I-click ang camera icon aron mag-upload ug bag-ong picture.
            </p>
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              First Name
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
            />
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
            />
          </div>
        </div>

        {/* Home Address */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Home Address
          </label>
          <textarea
            required
            rows={3}
            value={formData.homeAddress}
            onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 resize-none"
          />
        </div>

        <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => onNavigate('client-dashboard')}
            className="px-5 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 font-medium text-xs transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-sage-700 hover:bg-sage-800 text-white rounded-xl font-semibold text-xs tracking-wide shadow-md flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
};

