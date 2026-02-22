
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { bankService } from '../services/bankService';
import { motion, AnimatePresence } from 'framer-motion';
import {
    QrCode, Send, ShieldCheck, Zap,
    Smartphone, History, Search,
    ArrowRight, CheckCircle2, XCircle,
    Copy, Info
} from 'lucide-react';

const UPIPayment = () => {
    const { user, refreshUser } = useAuth();
    const [receiverUpi, setReceiverUpi] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success', 'error', null
    const [transactionData, setTransactionData] = useState(null);

    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        try {
            const data = await bankService.getTransactions();
            // Filter only UPI transfers
            const upiTx = data.filter(t => t.transactionMode === 'UPI');
            setTransactions(upiTx);
        } catch (error) {
            console.error('Error fetching UPI transactions:', error);
        }
    };

    React.useEffect(() => {
        if (user) {
            fetchTransactions();
        }
    }, [user]);

    const handleTransfer = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await bankService.upiTransfer({
                amount,
                receiverUpiId: receiverUpi,
                description
            });
            setTransactionData(res.data);
            setStatus('success');
            await fetchTransactions(); // Refresh list
            await refreshUser();
        } catch (error) {
            setStatus('error');
            setTransactionData({ message: error.response?.data?.error || error.message });
        } finally {
            setLoading(false);
        }
    };

    const copyUpiId = () => {
        navigator.clipboard.writeText(user?.account?.upiId || '');
        alert('UPI ID Copied!');
    };

    return (
        <div className="flex bg-brand-dark min-h-screen text-gray-900 font-sans selection:bg-brand-yellow selection:text-white">
            <Sidebar />

            <div className="flex-1 md:ml-64 p-8 transition-all duration-300">
                {/* Header */}
                <header className="mb-10">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-brand-yellow text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Instant Settlement</span>
                        <h1 className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter">UPI <span className="text-brand-yellow">Payments</span></h1>
                    </div>
                    <p className="text-gray-500 text-sm italic">Lightning fast transfers across any bank. ⚡</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Transfer Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden"
                        >
                            {/* Decorative Blur */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none"></div>

                            <form onSubmit={handleTransfer} className="space-y-8 relative z-10">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Recipient UPI ID</label>
                                        <span className="text-[10px] font-bold text-brand-yellow hover:underline cursor-pointer flex items-center gap-1">
                                            <Search size={10} /> Browse Contacts
                                        </span>
                                    </div>
                                    <div className="relative group">
                                        <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-yellow transition-colors" size={20} />
                                        <input
                                            type="text"
                                            required
                                            value={receiverUpi}
                                            onChange={(e) => setReceiverUpi(e.target.value)}
                                            placeholder="username@fincore or phone@upi"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-3xl py-5 pl-14 pr-6 text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:border-brand-yellow transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Amount (INR)</label>
                                    <div className="relative group">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-yellow font-black text-2xl">₹</span>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-3xl py-6 pl-14 pr-6 text-4xl font-black text-gray-900 placeholder:text-gray-200 focus:outline-none focus:border-brand-yellow transition-all"
                                        />
                                    </div>
                                    <div className="flex justify-between px-2">
                                        <p className="text-[10px] font-bold text-gray-500">Available: ₹{user?.account?.balance?.toLocaleString() || '0'}</p>
                                        <p className="text-[10px] font-bold text-brand-yellow">Daily Limit: ₹1,00,000</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">What's it for? (Optional)</label>
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Coffee, rent, etc."
                                        className="w-full bg-gray-50 border border-gray-100 rounded-3xl py-4 px-6 text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:border-brand-yellow transition-all"
                                    />
                                </div>

                                <button
                                    disabled={loading || !amount || !receiverUpi}
                                    className="w-full bg-brand-yellow text-white py-6 rounded-3xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-yellow/30 active:scale-95"
                                >
                                    {loading ? (
                                        <>
                                            <Zap className="animate-spin" size={20} />
                                            Authenticating...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Pay Instantly
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Right: Info & Status */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Status Card */}
                        <AnimatePresence mode="wait">
                            {status && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={`p-8 rounded-[2.5rem] border flex flex-col items-center text-center shadow-sm ${status === 'success' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'
                                        }`}
                                >
                                    {status === 'success' ? (
                                        <div className="mb-6 bg-green-500 rounded-full p-4 shadow-lg shadow-green-500/20">
                                            <CheckCircle2 size={48} className="text-white" />
                                        </div>
                                    ) : (
                                        <div className="mb-6 bg-red-500 rounded-full p-4 shadow-lg shadow-red-500/20">
                                            <XCircle size={48} className="text-white" />
                                        </div>
                                    )}

                                    <h3 className={`text-2xl font-black uppercase tracking-tighter mb-2 ${status === 'success' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        Payment {status === 'success' ? 'Settled' : 'Failed'}
                                    </h3>
                                    <p className="text-gray-500 text-sm font-medium mb-6">
                                        {status === 'success'
                                            ? `₹${amount} successfully transferred to ${receiverUpi}`
                                            : transactionData?.message || 'Something went wrong. Please try again.'}
                                    </p>

                                    {status === 'success' && (
                                        <div className="w-full bg-gray-50 rounded-3xl p-6 border border-gray-100 text-left space-y-3 shadow-sm">
                                            <div className="flex justify-between">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction ID</span>
                                                <span className="text-[10px] font-mono text-gray-900 font-bold">{transactionData?.transactionId}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Reference</span>
                                                <span className="text-[10px] text-gray-900 font-bold uppercase">{transactionData?.transactionMode}</span>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setStatus(null)}
                                        className="mt-8 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
                                    >
                                        Make Another Payment
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Your UPI Info */}
                        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2 text-gray-900">
                                <QrCode className="text-brand-yellow" size={24} /> Your Payment Link
                            </h3>

                            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 mb-6">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Personal VPA</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-black text-gray-900 italic">{user?.account?.upiId || 'loading...'}</p>
                                    <button onClick={copyUpiId} className="p-2 hover:bg-white rounded-xl text-brand-yellow transition-all shadow-sm">
                                        <Copy size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 rounded-3xl bg-brand-yellow/5 border border-brand-yellow/10 flex gap-4">
                                <ShieldCheck className="text-brand-yellow shrink-0" size={24} />
                                <p className="text-[11px] text-gray-400 font-medium leading-relaxed italic">
                                    UPI payments are secured by bank-grade encryption. Ensure you are sending money to a trusted recipient. We will never ask for your PIN via call or SMS.
                                </p>
                            </div>
                        </div>

                        {/* Recent UPI Activity */}
                        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2 text-gray-900">
                                    <History size={20} className="text-brand-yellow" /> Recents
                                </h3>
                                <button className="text-[10px] font-black text-brand-yellow uppercase tracking-widest hover:underline">View All</button>
                            </div>

                            <div className="space-y-4">
                                {transactions.length > 0 ? transactions.slice(0, 5).map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-50 hover:bg-white hover:border-gray-100 transition-all cursor-pointer group shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow font-black group-hover:bg-brand-yellow group-hover:text-white transition-all">
                                                {(item.upiDetails?.receiverUpi || 'U').charAt(0)}
                                            </div>
                                            <p className="text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors">
                                                {item.upiDetails?.receiverUpi || 'Unknown UPI'}
                                            </p>
                                        </div>
                                        <p className="text-sm font-black text-gray-900">-₹{item.amount}</p>
                                    </div>
                                )) : (
                                    <p className="text-center py-6 text-gray-400 font-bold uppercase text-[10px] tracking-widest italic">No recent activity</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UPIPayment;
