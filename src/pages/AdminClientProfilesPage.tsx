import React, { useState } from 'react';
import { User } from '../types';
import { ClinicStore, formatPhoneNumber, isValidPhoneNumber } from '../services/clinicData';
import { useAppointments } from '../context/AppointmentContext';
import { 
  Users, 
  Search, 
  Edit3, 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  X, 
  Camera, 
  Save,
  AlertCircle
} from 'lucide-react';

interface AdminClientProfilesPageProps {
  onNavigate: (page: string) => void;
}

export const AdminClientProfilesPage: React.FC<AdminClientProfilesPageProps> = ({ onNavigate }) => {
  const { appointments } = useAppointments();
  const [users, setUsers] = useState<User[]>(() => ClinicStore.getUsers().filter(u => u.role === 'client'));
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  
  const [editingClient, setEditingClient] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    preferredName: '',
    lastName: '',
    phone: '',
    email: '',
    homeAddress: '',
    profilePic: '',
  });

  const filteredClients = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.preferredName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.phone.includes(q) ||
      u.homeAddress.toLowerCase().includes(q)
    );
  });

  const handleOpenEdit = (client: User) => {
    setEditingClient(client);
    setError('');
    setEditFormData({
      firstName: client.firstName,
      preferredName: client.preferredName || '',
      lastName: client.lastName,
      phone: formatPhoneNumber(client.phone || ''),
      email: client.email,
      homeAddress: client.homeAddress,
      profilePic: client.profilePic || '',
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData(prev => ({ ...prev, phone: formatPhoneNumber(e.target.value) }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData(prev => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient) return;

    if (!isValidPhoneNumber(editFormData.phone)) {
      setError('Please provide a valid phone number in 000-000-0000 format.');
      return;
    }

    const updated = ClinicStore.updateUser({
      ...editingClient,
      firstName: editFormData.firstName.trim(),
      preferredName: editFormData.preferredName.trim(),
      lastName: editFormData.lastName.trim(),
      phone: editFormData.phone.trim(),
      email: editFormData.email.trim(),
      homeAddress: editFormData.homeAddress.trim(),
      profilePic: editFormData.profilePic || undefined,
    });

    setUsers(ClinicStore.getUsers().filter(u => u.role === 'client'));
    setEditingClient(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 animate-fade-in text-white">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('admin-dashboard')}
          className="flex items-center gap-1.5 text-stone-300 hover:text-white text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#F1BB09]" />
          Back to Admin Dashboard
        </button>

        <span className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A] bg-[#F1BB09] font-bold px-3 py-1 rounded-full self-start sm:self-auto">
          Registered Clients: {users.length}
        </span>
      </div>

      {/* Directory Title & Search */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white">
              Client Profiles Directory
            </h1>
            <p className="text-[#FBF4C4]/80 text-xs sm:text-sm mt-0.5">
              Review and manage client contact records, preferred names, and therapy histories.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone, email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl translucent-input text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => {
            const clientAppointments = appointments.filter(a => a.userId === client.id);
            const completedCount = clientAppointments.filter(a => a.status === 'done').length;

            return (
              <div
                key={client.id}
                className="bg-[#161E1A]/90 rounded-2xl p-5 border border-white/10 hover:border-[#F1BB09]/50 transition-all flex flex-col justify-between space-y-4 shadow-lg"
              >
                <div>
                  <div className="flex items-start gap-4">
                    {client.profilePic ? (
                      <img
                        src={client.profilePic}
                        alt="Profile"
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#F1BB09] shrink-0 shadow-md"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-[#0D9488] text-white flex items-center justify-center font-bold text-lg shrink-0 ring-2 ring-[#F1BB09]">
                        {client.firstName[0]}
                      </div>
                    )}

                    <div className="overflow-hidden">
                      <h3 className="font-serif font-bold text-white text-base truncate">
                        {client.firstName} {client.lastName}
                      </h3>
                      {client.preferredName && (
                        <p className="text-xs text-[#F1BB09] font-medium">
                          Preferred: "{client.preferredName}"
                        </p>
                      )}
                      <p className="text-[11px] text-stone-400 font-mono">
                        ID: {client.id}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 text-xs text-[#FBF4C4]/85">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                      <span className="font-mono">{client.phone || 'No phone'}</span>
                    </div>

                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                      <span className="truncate">{client.email}</span>
                    </div>

                    <div className="flex items-start gap-2 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-[#0D9488] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{client.homeAddress || 'No address provided'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">
                    <strong className="text-white">{clientAppointments.length}</strong> bookings ({completedCount} done)
                  </span>

                  <button
                    onClick={() => handleOpenEdit(client)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#716B56]/60 hover:bg-[#716B56] text-[#FBF4C4] font-semibold text-xs border border-[#716B56] transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#F1BB09]" />
                    Edit Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Client Profile Modal */}
      {editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in text-white">
          <div className="glass-card rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto border border-[#F1BB09]/40">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#0D9488]/30 border border-[#0D9488] text-[#F1BB09] flex items-center justify-center font-bold">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">
                    Edit Client: {editingClient.firstName} {editingClient.lastName}
                  </h3>
                  <p className="text-xs text-[#F1BB09]">
                    Admin Privilege
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingClient(null)}
                className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-[#FF5252]/20 border border-[#FF5252] text-white text-xs flex items-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4 text-[#FF5252] shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-center gap-4 pb-2">
                <div className="relative group">
                  {editFormData.profilePic ? (
                    <img
                      src={editFormData.profilePic}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-[#F1BB09]"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#0D9488] text-white flex items-center justify-center font-bold text-xl">
                      {editFormData.firstName?.[0] || 'U'}
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 bg-[#F1BB09] hover:bg-[#DEAA06] text-[#1A1A1A] p-1.5 rounded-full shadow cursor-pointer">
                    <Camera className="w-3 h-3" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="text-xs text-[#FBF4C4]/80">
                  <p className="font-semibold text-white">Profile Picture</p>
                  <p>Click the camera icon to upload a replacement photo.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.firstName}
                    onChange={(e) => setEditFormData({ ...editFormData, firstName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl translucent-input text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                    Preferred Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.preferredName}
                    onChange={(e) => setEditFormData({ ...editFormData, preferredName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl translucent-input text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.lastName}
                    onChange={(e) => setEditFormData({ ...editFormData, lastName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl translucent-input text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                    Phone Number (000-000-0000)
                  </label>
                  <input
                    type="tel"
                    required
                    value={editFormData.phone}
                    onChange={handlePhoneChange}
                    maxLength={12}
                    placeholder="000-000-0000"
                    className="w-full px-3 py-2 rounded-xl translucent-input text-xs sm:text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl translucent-input text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#FBF4C4] uppercase tracking-wider mb-1">
                  Home Address
                </label>
                <textarea
                  required
                  rows={2}
                  value={editFormData.homeAddress}
                  onChange={(e) => setEditFormData({ ...editFormData, homeAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl translucent-input text-xs sm:text-sm resize-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingClient(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#716B56]/50 hover:bg-[#716B56] text-[#FBF4C4] font-medium text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 btn-primary-gold rounded-xl font-bold text-xs tracking-wide shadow-md flex items-center gap-1.5 transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Client Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
