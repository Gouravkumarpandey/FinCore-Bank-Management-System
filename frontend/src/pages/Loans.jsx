
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Banknote, Calculator, Zap, ShieldCheck,
    ArrowRight, CheckCircle2, Landmark,
    Briefcase, GraduationCap, Car, Home,
    Percent, Clock, Info, ShieldAlert
} from 'lucide-react';

const Loans = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('calculate');

    // Calculator States
    const [loanAmount, setLoanAmount] = useState(500000);
    const [tenure, setTenure] = useState(24);
    const [interestRate, setInterestRate] = useState(10.5);
    const [emi, setEmi] = useState(0);

    const loanTypes = [
        { id: 'personal', name: 'Personal Loan', icon: <Briefcase />, rate: '10.5%', color: 'from-blue-500 to-indigo-600' },
        { id: 'home', name: 'Home Loan', icon: <Home />, rate: '8.5%', color: 'from-green-500 to-emerald-600' },
        { id: 'car', name: 'Car Loan', icon: <Car />, rate: '9.2%', color: 'from-orange-500 to-red-600' },
        { id: 'edu', name: 'Education Loan', icon: <GraduationCap />, rate: '7.0%', color: 'from-purple-500 to-pink-600' },
    ];

    useEffect(() => {
        const principal = loanAmount;
        const ratePerMonth = interestRate / (12 * 100);
        const months = tenure;

        const emiValue = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) / (Math.pow(1 + ratePerMonth, months) - 1);
        setEmi(Math.round(emiValue || 0));
    }, [loanAmount, tenure, interestRate]);

    return (
        <div className="flex bg-black min-h-screen text-white font-sans selection:bg-brand-yellow selection:text-black">
            <Sidebar />

            <div className="flex-1 md:ml-64 p-8 transition-all duration-300">
                {/* Header */}
                <header className="mb-10">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-brand-yellow text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Instant Approval</span>
                        <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">FinCore <span className="text-brand-yellow">Lend</span></h1>
                    </div>
                    <p className="text-gray-400 text-sm italic">Empowering your dreams with flexible capital. 💰</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Interactive Tools */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Tab Switcher */}
                        <div className="flex p-1 bg-brand-card border border-white/5 rounded-2xl w-fit">
                            <button
                                onClick={() => setActiveTab('calculate')}
                                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'calculate' ? 'bg-brand-yellow text-black' : 'text-gray-500 hover:text-white'}`}
                            >
                                EMI Calculator
                            </button>
                            <button
                                onClick={() => setActiveTab('apply')}
                                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'apply' ? 'bg-brand-yellow text-black' : 'text-gray-500 hover:text-white'}`}
                            >
                                Quick Apply
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === 'calculate' ? (
                                <motion.div
                                    key="calc"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-brand-card border border-white/5 rounded-[2.5rem] p-8 shadow-2xl"
                                >
                                    <h3 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-2">
                                        <Calculator className="text-brand-yellow" size={24} /> Estimate Your monthly EMI
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-10">
                                            {/* Amount Slider */}
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Loan Amount</label>
                                                    <span className="text-xl font-black text-brand-yellow">₹{loanAmount.toLocaleString()}</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="50000"
                                                    max="5000000"
                                                    step="50000"
                                                    value={loanAmount}
                                                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                                                    className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-brand-yellow"
                                                />
                                            </div>

                                            {/* Tenure Slider */}
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Tenure (Months)</label>
                                                    <span className="text-xl font-black text-brand-yellow">{tenure} Mo</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="6"
                                                    max="120"
                                                    step="6"
                                                    value={tenure}
                                                    onChange={(e) => setTenure(parseInt(e.target.value))}
                                                    className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-brand-yellow"
                                                />
                                            </div>

                                            {/* Interest Slider */}
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Interest Rate (% p.a)</label>
                                                    <span className="text-xl font-black text-brand-yellow">{interestRate}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="5"
                                                    max="24"
                                                    step="0.1"
                                                    value={interestRate}
                                                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                                    className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-brand-yellow"
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-black/40 rounded-[2rem] p-8 border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                                <Percent size={100} />
                                            </div>
                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Estimated Monthly Payment</p>
                                            <h2 className="text-6xl font-black text-white italic mb-2">₹{emi.toLocaleString()}</h2>
                                            <div className="flex gap-4 mt-8">
                                                <div className="text-left">
                                                    <p className="text-[8px] font-black text-gray-500 uppercase">Total Interest</p>
                                                    <p className="text-sm font-black text-brand-yellow">₹{(emi * tenure - loanAmount).toLocaleString()}</p>
                                                </div>
                                                <div className="w-px h-8 bg-white/10"></div>
                                                <div className="text-left">
                                                    <p className="text-[8px] font-black text-gray-500 uppercase">Total Payback</p>
                                                    <p className="text-sm font-black text-white">₹{(emi * tenure).toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setActiveTab('apply')}
                                                className="mt-10 w-full bg-brand-yellow text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-xl hover:shadow-yellow-400/20"
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="apply"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-brand-card border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center text-center"
                                >
                                    <div className="bg-brand-yellow/10 p-6 rounded-full mb-8">
                                        <Landmark size={48} className="text-brand-yellow" />
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Submit Application</h3>
                                    <p className="text-gray-400 max-w-md mx-auto mb-10 leading-relaxed font-medium">
                                        You are applying for a <span className="text-white font-bold">₹{loanAmount.toLocaleString()}</span> loan for <span className="text-white font-bold">{tenure} months</span>. Our AI will review your credit profile in 60 seconds.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-10">
                                        <div className="flex items-center gap-4 p-5 rounded-2xl bg-black/40 border border-white/5 text-left">
                                            <div className="p-3 bg-white/5 rounded-xl"><Zap className="text-brand-yellow" size={20} /></div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-500 uppercase">Approval Time</p>
                                                <p className="text-sm font-bold">Instant ~ 60s</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-5 rounded-2xl bg-black/40 border border-white/5 text-left">
                                            <div className="p-3 bg-white/5 rounded-xl"><ShieldCheck className="text-brand-yellow" size={20} /></div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-500 uppercase">Processing Fee</p>
                                                <p className="text-sm font-bold">0.5% (Flat)</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="bg-brand-yellow text-black px-12 py-5 rounded-3xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-yellow-400 transition-all shadow-2xl hover:shadow-yellow-400/30 active:scale-95">
                                        Confirm & Submit <ArrowRight size={20} />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Recent Loan History Placeholder */}
                        <div className="bg-brand-card border border-white/5 rounded-[2.5rem] p-8">
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Existing Loans</h3>
                            <div className="bg-black/40 border border-dashed border-white/10 rounded-3xl p-12 text-center">
                                <Landmark className="mx-auto text-gray-800 mb-4" size={40} />
                                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">No Active Loan Accounts Found</p>
                                <p className="text-gray-600 text-xs mt-2 italic">Apply above to get your first credit line.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Promotions & Types */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Loan Types */}
                        <div className="bg-brand-card border border-white/10 rounded-[2.5rem] p-8">
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Loan <span className="text-brand-yellow">Offers</span></h3>
                            <div className="space-y-4">
                                {loanTypes.map((type) => (
                                    <div
                                        key={type.id}
                                        className="group p-5 rounded-3xl bg-black/40 border border-white/5 hover:border-brand-yellow/30 transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-3 rounded-2xl bg-gradient-to-br ${type.color} text-white shadow-lg`}>
                                                {React.cloneElement(type.icon, { size: 20 })}
                                            </div>
                                            <span className="text-xl font-black text-brand-yellow italic">{type.rate}</span>
                                        </div>
                                        <p className="font-black text-sm uppercase tracking-tight">{type.name}</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Starting from</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Why Us Box */}
                        <div className="bg-gradient-to-br from-brand-yellow to-yellow-600 rounded-[2.5rem] p-8 text-black relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <Zap size={120} />
                            </div>
                            <h4 className="text-2xl font-black uppercase tracking-tighter mb-4 leading-none">Why FinCore <br />Credit?</h4>
                            <ul className="space-y-3">
                                {[
                                    "Zero Pre-payment Fees",
                                    "100% Digital Journey",
                                    "Disbursal in 24 Hours",
                                    "No Hidden Charges"
                                ].map((bullet, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs font-black uppercase tracking-tight">
                                        <CheckCircle2 size={14} /> {bullet}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Security Alert */}
                        <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10 flex gap-4">
                            <ShieldAlert className="text-red-500 shrink-0" size={24} />
                            <div>
                                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Borrow Responsibly</p>
                                <p className="text-[10px] text-gray-500 font-medium leading-relaxed italic">
                                    Interest rates are subject to your credit score. Non-payment may lead to legal action and a drop in CIBIL score.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loans;
