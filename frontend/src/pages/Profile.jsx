
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import Sidebar from '../components/Sidebar';
import { User, Lock, Mail, Phone, MapPin, Camera, Save, X } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    // Local state for editing form, initialized with user data
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || 'Mumbai, India',
    });

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await authService.updateProfile(formData);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex bg-black min-h-screen text-white font-sans selection:bg-brand-yellow selection:text-black">
            <Sidebar />
            <div className="flex-1 md:ml-64 p-8 transition-all duration-300">
                <div className="max-w-4xl mx-auto animate-fade-in-up">
                    <h2 className="text-3xl font-black text-white mb-8">My Profile</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* User Info Card */}
                        <div className="md:col-span-1">
                            <div className="flex flex-col items-center p-8 text-center bg-brand-card border border-white/5 rounded-3xl shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-b from-brand-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative mb-6">
                                    <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-black ring-2 ring-brand-yellow shadow-xl">
                                        <img
                                            className="h-full w-full object-cover"
                                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                                            alt="User avatar"
                                        />
                                    </div>
                                    <button className="absolute bottom-0 right-0 bg-brand-yellow p-2 rounded-full text-black shadow-lg hover:scale-110 transition-transform">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <h3 className="text-xl font-black text-white">{user?.fullName}</h3>
                                <p className="text-sm text-brand-yellow font-bold uppercase tracking-wider mt-1">{user?.account?.accountType || 'Savings Account'}</p>

                                <div className="w-full mt-8 space-y-3 relative z-10">
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className={`w-full py-3 rounded-xl font-bold transition-all ${isEditing
                                            ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                            : 'bg-brand-yellow text-black hover:bg-yellow-400'}`}
                                    >
                                        {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Profile Details Form */}
                        <div className="md:col-span-2 space-y-8">
                            <div className="bg-brand-card border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                                    <User className="mr-3 h-5 w-5 text-brand-yellow" /> Personal Information
                                </h3>

                                <form onSubmit={handleSave}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    disabled={!isEditing}
                                                    className={`w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-brand-yellow transition-all ${!isEditing && 'opacity-60 cursor-not-allowed'}`}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    disabled={!isEditing}
                                                    className={`w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-brand-yellow transition-all ${!isEditing && 'opacity-60 cursor-not-allowed'}`}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    disabled={!isEditing}
                                                    className={`w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-brand-yellow transition-all ${!isEditing && 'opacity-60 cursor-not-allowed'}`}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Address</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    disabled={!isEditing}
                                                    className={`w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-brand-yellow transition-all ${!isEditing && 'opacity-60 cursor-not-allowed'}`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="flex justify-end pt-4 border-t border-white/5">
                                            <button
                                                type="submit"
                                                className="bg-green-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-green-400 transition-colors flex items-center"
                                            >
                                                <Save className="w-4 h-4 mr-2" /> Save Changes
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>

                            <div className="bg-brand-card border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                                    <Lock className="mr-3 h-5 w-5 text-red-500" /> Security Settings
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition">
                                        <div>
                                            <p className="font-bold text-white">Two-Factor Authentication</p>
                                            <p className="text-sm text-gray-400">Add an extra layer of security to your account.</p>
                                        </div>
                                        <button className="px-4 py-2 bg-black text-white text-sm font-bold rounded-xl border border-white/20 hover:bg-white/10 transition">Enable</button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition">
                                        <div>
                                            <p className="font-bold text-white">Change Password</p>
                                            <p className="text-sm text-gray-400">Update your password regularly to stay safe.</p>
                                        </div>
                                        <button className="px-4 py-2 bg-black text-white text-sm font-bold rounded-xl border border-white/20 hover:bg-white/10 transition">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
