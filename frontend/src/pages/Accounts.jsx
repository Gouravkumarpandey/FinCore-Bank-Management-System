
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { Wallet, CreditCard, Shield, Zap, Lock, MoreHorizontal, Power, Copy, ExternalLink, Plus, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Accounts = () => {
    const { user } = useAuth();
    const [showBalance, setShowBalance] = useState(true);
    const [activeTab, setActiveTab] = useState('overview'); // overview, details, settings

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return (
        <div className="flex bg-brand-dark min-h-screen text-gray-900 font-sans selection:bg-brand-yellow selection:text-white">
            <Sidebar />
            <div className="flex-1 md:ml-64 p-8 transition-all duration-300">
                <header className="mb-10 animate-fade-in-up">
                    <h1 className="text-3xl font-black text-gray-900">My Accounts</h1>
                    <p className="text-gray-500 text-sm">Manage your banking portfolios and settings.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Account Area - Left Col */}
                    <div className="lg:col-span-2 space-y-8 animate-fade-in-up">
                        {/* Primary Account Card - Detailed */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 relative overflow-hidden group hover:border-brand-yellow/30 transition-all duration-500 shadow-sm">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                                <Wallet className="w-64 h-64 text-brand-yellow" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex items-center">
                                        <div className="p-4 bg-brand-yellow rounded-2xl mr-4 shadow-lg shadow-brand-yellow/30">
                                            <Wallet className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-gray-900">Primary Savings</h2>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className="text-xs font-bold px-2 py-0.5 rounded bg-green-50 text-green-600 border border-green-100 flex items-center">
                                                    <Zap className="w-3 h-3 mr-1" /> Active
                                                </span>
                                                <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-50 text-gray-400 border border-gray-100 uppercase tracking-wider">
                                                    {user?.accountType || 'Savings'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setShowBalance(!showBalance)} className="p-2 hover:bg-gray-50 rounded-full transition text-gray-400 hover:text-gray-900">
                                        {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                <div className="mb-8">
                                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Available Balance</p>
                                    <div className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight flex items-baseline">
                                        <span className="text-3xl md:text-4xl text-brand-yellow mr-2">₹</span>
                                        {showBalance ? parseFloat(user?.balance || 0).toLocaleString('en-IN') : '••••••'}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 backdrop-blur-sm">
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Account Number</p>
                                        <div className="flex items-center space-x-2 group/copy cursor-pointer" onClick={() => copyToClipboard(user?.accountNumber || '4582123456788842')}>
                                            <span className="text-lg font-mono font-bold text-gray-900">{user?.accountNumber || '4582 1234 5678 8842'}</span>
                                            <Copy className="w-4 h-4 text-gray-600 group-hover/copy:text-brand-yellow transition" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">IFSC Code</p>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-lg font-mono font-bold text-gray-900">FINC0004582</span>
                                            <Copy className="w-4 h-4 text-gray-400 hover:text-brand-yellow transition cursor-pointer" onClick={() => copyToClipboard('FINC0004582')} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Branch</p>
                                        <span className="text-gray-900 font-bold">Mumbai Main Branch</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Opened Since</p>
                                        <span className="text-gray-900 font-bold">Aug 2024</span>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Link to="/transfer" className="flex-1 min-w-[140px] bg-brand-yellow text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-lg shadow-brand-yellow/30">
                                        <ExternalLink className="w-4 h-4 mr-2" /> Transfer Funds
                                    </Link>
                                    <button className="flex-1 min-w-[140px] bg-gray-50 text-gray-900 font-bold py-3 px-6 rounded-xl flex items-center justify-center hover:bg-gray-100 border border-gray-100 transition">
                                        <Shield className="w-4 h-4 mr-2" /> Statements
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Secondary / Other Accounts List */}
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Other Accounts</h3>
                                <button className="text-sm font-bold text-brand-yellow flex items-center hover:text-blue-700 transition">
                                    <Plus className="w-4 h-4 mr-1" /> Open New Account
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Mock Investment Account */}
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-brand-yellow/30 transition group cursor-pointer relative overflow-hidden shadow-sm">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div className="p-3 bg-purple-50 rounded-xl text-purple-600 border border-purple-100">
                                            <CreditCard className="w-6 h-6" />
                                        </div>
                                        <MoreHorizontal className="text-gray-400 hover:text-gray-900 transition" />
                                    </div>
                                    <div className="relative z-10">
                                        <h4 className="font-bold text-gray-900 text-lg">Investment Portfolio</h4>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Growth Fund</p>
                                        <div className="mt-4 text-2xl font-black text-gray-900">₹0.00</div>
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-xs font-bold text-gray-400">
                                            <Lock className="w-3 h-3 mr-1" /> Activation Pending
                                        </div>
                                    </div>
                                </div>

                                {/* Mock Loan Account */}
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-brand-yellow/30 transition group cursor-pointer relative overflow-hidden shadow-sm">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
                                            <Wallet className="w-6 h-6" />
                                        </div>
                                        <MoreHorizontal className="text-gray-400 hover:text-gray-900 transition" />
                                    </div>
                                    <div className="relative z-10">
                                        <h4 className="font-bold text-gray-900 text-lg">Personal Loan</h4>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Pre-Approved</p>
                                        <div className="mt-4 text-2xl font-black text-gray-900">Up to ₹5L</div>
                                        <button className="mt-4 w-full py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg border border-blue-100 hover:bg-blue-100 transition">
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Col - Settings & Actions */}
                    <div className="space-y-8 animate-fade-in-up delay-100">
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Account Settings</h3>
                            <div className="space-y-2">
                                <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition group">
                                    <div className="flex items-center text-gray-600 font-medium group-hover:text-gray-900">
                                        <CreditCard className="w-5 h-5 mr-3 text-gray-400" /> Manage Cards
                                    </div>
                                    <Shield className="w-4 h-4 text-gray-300" />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition group">
                                    <div className="flex items-center text-gray-600 font-medium group-hover:text-gray-900">
                                        <Shield className="w-5 h-5 mr-3 text-gray-400" /> Security & Limits
                                    </div>
                                    <Shield className="w-4 h-4 text-gray-300" />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-red-50 transition group border border-red-50 hover:border-red-100">
                                    <div className="flex items-center text-red-600 font-medium">
                                        <Power className="w-5 h-5 mr-3" /> Freeze Account
                                    </div>
                                    <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-red-100">
                                        <span className="translate-x-1 inline-block h-3 w-3 transform rounded-full bg-red-500" />
                                    </div>
                                </button>
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-xs text-blue-600 font-bold flex items-start">
                                    <Shield className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                                    Your account is fully secured with 256-bit encryption.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-brand-yellow to-yellow-600 rounded-3xl p-6 relative overflow-hidden shadow-lg shadow-brand-yellow/20">
                            <div className="relative z-10 text-white">
                                <h3 className="text-2xl font-black mb-2">Upgrade to Pro</h3>
                                <p className="font-medium text-sm mb-6 opacity-80">Get 2% cashback via FinCoins on every transaction.</p>
                                <button className="bg-white text-brand-yellow px-6 py-3 rounded-xl font-bold text-sm w-full shadow-lg hover:bg-gray-50 transition">
                                    Check Eligibility
                                </button>
                            </div>
                            <div className="absolute -bottom-4 -right-4 opacity-20">
                                <Zap className="w-32 h-32" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accounts;
