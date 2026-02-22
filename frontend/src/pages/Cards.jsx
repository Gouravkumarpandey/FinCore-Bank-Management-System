
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { accountService } from '../services/accountService';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Eye, EyeOff, Shield, CreditCard,
    Palette, Rocket, Briefcase, ShoppingBag,
    Smile, Utensils, Zap, Lock, RefreshCw,
    Download, Settings, ChevronRight
} from 'lucide-react';

const Cards = () => {
    const { user, refreshUser } = useAuth();
    const [reveal, setReveal] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    const card = user?.account || {};
    const currentTheme = card.cardTheme || 'default';

    const themes = [
        { id: 'default', name: 'Elite Zinc', icon: <Palette size={16} />, colors: 'from-zinc-900 via-zinc-800 to-black', text: 'text-white' },
        { id: 'space', name: 'Cosmic Protocol', icon: <Rocket size={16} />, colors: 'from-purple-900 via-indigo-900 to-black', text: 'text-indigo-200' },
        { id: 'shopping', name: 'Retail Therapy', icon: <ShoppingBag size={16} />, colors: 'from-pink-600 via-rose-500 to-orange-400', text: 'text-white' },
        { id: 'travel', name: 'Global Nomad', icon: <Briefcase size={16} />, colors: 'from-cyan-600 via-blue-700 to-indigo-900', text: 'text-cyan-50' },
        { id: 'cartoon', name: 'Anime Pop', icon: <Smile size={16} />, colors: 'from-yellow-400 via-orange-500 to-red-500', text: 'text-black' },
        { id: 'food', name: 'Gourmet Gold', icon: <Utensils size={16} />, colors: 'from-orange-600 via-amber-700 to-stone-900', text: 'text-orange-50' },
    ];

    const handleThemeChange = async (themeId) => {
        setUpdating(true);
        try {
            await accountService.updateCardTheme(themeId);
            await refreshUser();
        } catch (error) {
            alert("Failed to update theme: " + error.message);
        } finally {
            setUpdating(false);
        }
    };

    const formatCardNumber = (num, shouldReveal) => {
        if (!num) return '•••• •••• •••• ••••';
        if (shouldReveal) return num.match(/.{1,4}/g).join(' ');
        return `•••• •••• •••• ${num.slice(-4)}`;
    };

    const selectedTheme = themes.find(t => t.id === currentTheme) || themes[0];

    return (
        <div className="flex bg-brand-dark min-h-screen text-gray-900 font-sans selection:bg-brand-yellow selection:text-white">
            <Sidebar />

            <div className="flex-1 md:ml-64 p-8 transition-all duration-300">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-brand-yellow text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Secure Terminal</span>
                            <h1 className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter">Card <span className="text-brand-yellow">Control</span></h1>
                        </div>
                        <p className="text-gray-500 text-sm italic">Manage your virtual spending power. 💳</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="bg-gray-50 border border-gray-100 p-3 rounded-2xl text-gray-400 hover:text-gray-900 transition-all">
                            <Download size={20} />
                        </button>
                        <button className="bg-gray-50 border border-gray-100 p-3 rounded-2xl text-gray-400 hover:text-gray-900 transition-all">
                            <Settings size={20} />
                        </button>
                        <button className="bg-brand-yellow text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-brand-yellow/30 active:scale-95">
                            Apply for Physical Card
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Card Visualization */}
                    <div className="lg:col-span-12 xl:col-span-7 space-y-8">
                        {/* Interactive Card Container */}
                        <div className="flex justify-center perspective-1000">
                            <motion.div
                                onClick={() => setIsFlipped(!isFlipped)}
                                initial={false}
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
                                className="relative w-full max-w-[480px] aspect-[1.586/1] cursor-pointer preserve-3d"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Front Face */}
                                <div
                                    className={`absolute inset-0 backface-hidden rounded-[2.5rem] p-8 shadow-2xl border border-white/10 flex flex-col justify-between overflow-hidden group ${currentTheme !== 'default' ? `bg-gradient-to-br ${selectedTheme.colors}` : ''}`}
                                    style={currentTheme === 'default' ? {
                                        backgroundImage: 'url("/banking%20cardbackdesign.svg")',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundColor: '#000'
                                    } : {}}
                                >
                                    {/* Glass Morph Decoration */}
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-1000"></div>

                                    <div className="flex justify-between items-start z-10">
                                        <div className="flex flex-col">
                                            <Zap className={`mb-4 ${selectedTheme.text} opacity-50`} size={32} strokeWidth={3} />
                                            <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${selectedTheme.text} opacity-40`}>FinCore Platinum</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-8 h-8 bg-orange-500/80 rounded-full blur-[1px]"></div>
                                            <div className="w-8 h-8 bg-yellow-400/80 rounded-full -ml-4 blur-[1px]"></div>
                                        </div>
                                    </div>

                                    <div className="z-10">
                                        <h3 className={`text-2xl md:text-3xl font-mono tracking-[0.15em] mb-6 ${selectedTheme.text} drop-shadow-lg`}>
                                            {formatCardNumber(card.cardNumber, reveal)}
                                        </h3>

                                        <div className="flex justify-between items-end">
                                            <div className="space-y-1">
                                                <p className={`text-[8px] font-black uppercase tracking-widest ${selectedTheme.text} opacity-40`}>Card Holder</p>
                                                <p className={`text-sm font-black uppercase tracking-widest ${selectedTheme.text}`}>{card.cardHolderName || 'User Name'}</p>
                                            </div>
                                            <div className="text-right space-y-1">
                                                <p className={`text-[8px] font-black uppercase tracking-widest ${selectedTheme.text} opacity-40`}>Expiry</p>
                                                <p className={`text-sm font-black tracking-widest ${selectedTheme.text}`}>{card.cardExpiry || '00/00'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Back Face */}
                                <div className={`absolute inset-0 backface-hidden rounded-[2.5rem] bg-gray-900 p-8 shadow-2xl border border-white/10 flex flex-col justify-between overflow-hidden [transform:rotateY(180deg)]`}>
                                    <div className="absolute top-10 left-0 w-full h-12 bg-black/80"></div>
                                    <div className="mt-20">
                                        <div className="w-2/3 h-10 bg-gray-800 rounded flex items-center justify-end px-4 border-l-4 border-brand-yellow">
                                            <span className="font-mono text-white tracking-widest text-lg">{reveal ? card.cardCvv : '•••'}</span>
                                        </div>
                                        <p className="text-[8px] text-zinc-500 mt-2 uppercase font-black tracking-widest">Authorized Security Signature - Do not share your CVV</p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="flex gap-2 text-zinc-700">
                                            <Lock size={20} />
                                            <Shield size={20} />
                                        </div>
                                        <span className="text-[32px] font-black italic text-zinc-800 tracking-tighter">FinCore.</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Controls Container */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <button
                                onClick={() => setReveal(!reveal)}
                                className={`flex items-center justify-center gap-3 p-5 rounded-3xl border transition-all ${reveal ? 'bg-brand-yellow text-white border-brand-yellow shadow-lg shadow-brand-yellow/30' : 'bg-gray-50 text-gray-900 border-gray-100 hover:bg-gray-100'}`}
                            >
                                {reveal ? <EyeOff size={20} /> : <Eye size={20} />}
                                <span className="font-black text-xs uppercase tracking-widest">{reveal ? 'Hide Details' : 'Reveal Details'}</span>
                            </button>

                            <button className="flex items-center justify-center gap-3 p-5 rounded-3xl bg-gray-50 border border-gray-100 text-gray-900 hover:bg-gray-100 transition-all group">
                                <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                                <span className="font-black text-xs uppercase tracking-widest">Re-generate Card</span>
                            </button>

                            <button className="flex items-center justify-center gap-3 p-5 rounded-3xl bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 transition-all">
                                <Lock size={20} />
                                <span className="font-black text-xs uppercase tracking-widest">Freeze Card</span>
                            </button>
                        </div>

                        {/* Card Stats/Info */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2 text-gray-900">
                                <CreditCard className="text-brand-yellow" /> Usage Insights
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { label: 'Spending Limit', value: '₹50,000' },
                                    { label: 'Available', value: '₹42,390' },
                                    { label: 'Daily Cap', value: '₹10,000' },
                                    { label: 'Billing Cycle', value: '1st - 30th' }
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{stat.label}</p>
                                        <p className="text-lg font-black text-gray-900">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Customization Panel */}
                    <div className="lg:col-span-12 xl:col-span-5">
                        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 h-full shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900">Theme <span className="text-brand-yellow">Engine</span></h3>
                                {updating && <RefreshCw className="animate-spin text-brand-yellow" size={18} />}
                            </div>

                            <div className="space-y-4">
                                {themes.map((theme) => (
                                    <button
                                        key={theme.id}
                                        onClick={() => handleThemeChange(theme.id)}
                                        disabled={updating}
                                        className={`w-full flex items-center justify-between p-4 rounded-3xl border transition-all ${currentTheme === theme.id
                                            ? 'bg-blue-50 border-brand-yellow'
                                            : 'bg-gray-50 border-gray-100 hover:border-gray-200'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4 text-left">
                                            <div className={`p-4 rounded-2xl bg-gradient-to-br ${theme.colors} border border-white/10 text-white shadow-lg`}>
                                                {theme.icon}
                                            </div>
                                            <div>
                                                <p className="font-black text-sm uppercase tracking-tight text-gray-900">{theme.name}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Skin</p>
                                            </div>
                                        </div>
                                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${currentTheme === theme.id ? 'border-brand-yellow text-brand-yellow' : 'border-gray-200 text-transparent'
                                            }`}>
                                            <ChevronRight size={14} />
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-10 p-6 rounded-3xl bg-blue-50 border border-blue-100">
                                <div className="flex gap-4 items-start">
                                    <Shield className="text-blue-600 shrink-0 mt-1" size={24} />
                                    <div>
                                        <p className="font-black text-xs uppercase tracking-widest text-blue-600 mb-2">Security Note</p>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                            Virtual themed skins are only visible in the app. Your physical card will follow the standard luxury zinc design. Re-generating your card will change your CVV.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Styles for perspective */}
        </div>
    );
};

export default Cards;
