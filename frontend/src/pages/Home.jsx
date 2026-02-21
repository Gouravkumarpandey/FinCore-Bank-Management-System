import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, Star, Zap, Shield, Smartphone, CreditCard, Gift, Users, Check, QrCode, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const AnimatedSecurityBadge = () => {
    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Revolving Orbiting Circles */}
            <div className="absolute inset-0 border-2 border-dashed border-brand-yellow/20 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-4 border border-white/10 rounded-full animate-spin-reverse-slow"></div>
            <div className="absolute inset-8 border-2 border-dashed border-brand-yellow/10 rounded-full animate-spin-slower"></div>

            {/* Pulse Rings */}
            <div className="absolute w-32 h-32 bg-brand-yellow/5 rounded-full animate-ping"></div>

            {/* Central Badge Container */}
            <div className="relative z-10 w-48 h-56 flex items-center justify-center animate-float-slow">
                {/* Custom Shield Path */}
                <svg viewBox="0 0 100 110" className="absolute inset-0 w-full h-full drop-shadow-[0_0_30px_rgba(252,207,8,0.3)]">
                    <path
                        d="M50 0 L95 20 L95 55 C95 85 50 110 50 110 C50 110 5 85 5 55 L5 20 Z"
                        fill="white"
                    />
                    <path
                        d="M50 5 L90 23 L90 55 C90 82 50 105 50 105 C50 105 10 82 10 55 L10 23 Z"
                        fill="#0A0A0A"
                    />
                </svg>

                <div className="relative z-20 text-center">
                    <div className="flex justify-center mb-1">
                        <Lock className="w-8 h-8 text-brand-yellow" />
                    </div>
                    <span className="text-4xl font-black text-white block leading-none">100%</span>
                    <div className="mt-2 text-brand-yellow font-black text-sm tracking-[0.2em] uppercase">Money Safe</div>
                    <div className="mt-1 bg-brand-yellow text-black px-3 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">
                        FinCore Trust
                    </div>
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="font-sans antialiased bg-black text-white selection:bg-brand-yellow selection:text-black min-h-screen overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-yellow/20 rounded-full blur-[128px]"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    {/* Animated Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-brand-yellow text-sm font-bold uppercase tracking-widest mb-8 animate-fade-in-up">
                        <Zap className="w-4 h-4 mr-2 fill-current animate-pulse-slow" />
                        Next Generation Digital Banking
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9] animate-fade-in-up delay-100">
                        BANKING FOR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-orange-500 animate-pulse-slow">THE FUTURE.</span>
                    </h1>

                    <p className="mt-4 max-w-2xl mx-auto text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed font-medium animate-fade-in-up delay-200">
                        Experience a full-featured bank account with high-yield savings, instant loans, and seamless global payments.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up delay-300">
                        <Link to="/signup" className="btn-yellow btn-yellow-glow px-8 py-4 text-lg rounded-full inline-flex items-center justify-center">
                            Open Your Account
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Hero Visual - Floating Cards/Phone */}
                <div className="mt-20 relative w-full max-w-5xl h-[500px] perspective-1000 mx-auto">
                    {/* Central Phone Mockup */}
                    <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-72 h-[550px] bg-gray-900 border-8 border-gray-800 rounded-[3rem] shadow-2xl z-20 overflow-hidden ring-1 ring-white/10" style={{ transform: `translateX(-50%) translateY(${scrollY * -0.1}px)` }}>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-30"></div>
                        <div className="w-full h-full bg-gradient-to-b from-gray-800 to-black flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-16 h-16 bg-brand-yellow rounded-2xl mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(252,207,8,0.5)] animate-bounce-slow">
                                <Zap className="text-black w-8 h-8 fill-current" />
                            </div>
                            <h3 className="text-white font-bold text-2xl">FinCore</h3>
                            <p className="text-gray-400 text-sm mt-2">Global Banking.</p>

                            {/* Mock UI Elements */}
                            <div className="mt-8 w-full bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/5">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                                    <div className="w-16 h-4 bg-gray-600 rounded"></div>
                                </div>
                                <div className="w-full h-2 bg-gray-700 rounded mb-2"></div>
                                <div className="w-2/3 h-2 bg-gray-700 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Cards */}
                    <div className="absolute left-10 md:left-20 top-20 transform -rotate-12 bg-gradient-to-br from-brand-card to-black border border-white/10 p-6 rounded-2xl w-64 h-40 shadow-2xl z-10 backdrop-blur-xl animate-float-slow hidden md:block hover:scale-105 transition-transform duration-300">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-6 bg-yellow-400/20 rounded"></div>
                            <CreditCard className="text-white/50" />
                        </div>
                        <div className="mt-8 text-xl font-mono text-white tracking-widest">•••• 4582</div>
                        <div className="mt-2 text-xs text-gray-400 uppercase">Platinum Debit</div>
                    </div>

                    <div className="absolute right-10 md:right-20 top-40 transform rotate-6 bg-gradient-to-br from-purple-900 to-black border border-white/10 p-6 rounded-2xl w-64 h-40 shadow-2xl z-10 backdrop-blur-xl animate-float-reverse hidden md:block hover:scale-105 transition-transform duration-300">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-6 bg-purple-400/20 rounded"></div>
                            <Zap className="text-white/50" />
                        </div>
                        <div className="mt-8 text-xl font-mono text-white tracking-widest">•••• 9921</div>
                        <div className="mt-2 text-xs text-gray-400 uppercase">Elite Banking</div>
                    </div>
                </div>
            </section>

            {/* Marquee Section */}
            <section className="py-10 border-y border-white/10 bg-brand-dark overflow-hidden">
                <div className="flex space-x-12 animate-marquee whitespace-nowrap">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-2 text-2xl font-black text-white/20 uppercase tracking-tighter">
                            <Star className="w-6 h-6 fill-current text-brand-yellow/50" />
                            <span>High Interest Savings</span>
                            <Star className="w-6 h-6 fill-current text-brand-yellow/50" />
                            <span>Zero Maintenance Fees</span>
                            <Star className="w-6 h-6 fill-current text-brand-yellow/50" />
                            <span>Bank-Grade Security</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Security Banner (PhonePe Inspired) */}
            <section className="py-20 px-4 bg-[#121212]">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-gradient-to-r from-black via-zinc-900 to-black rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-3xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-yellow/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

                        <div className="relative z-10 flex-shrink-0">
                            <AnimatedSecurityBadge />
                        </div>

                        <div className="relative z-10 text-left flex-1">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Your money stays safe.</h2>
                            <p className="text-gray-400 text-xl font-medium mb-8">
                                FinCore protects your money with world-class security systems that help minimize frauds and keep your data private.
                            </p>
                            <div className="flex items-center gap-8 opacity-90">
                                <div className="flex items-center gap-2 border-r border-white/10 pr-8">
                                    <Shield className="w-6 h-6 text-brand-yellow" />
                                    <span className="font-bold text-sm tracking-tighter text-white">PCI DSS <br /><span className="text-[10px] text-gray-500 uppercase">Compliant</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap className="w-6 h-6 text-brand-yellow" />
                                    <span className="font-bold text-sm tracking-tighter text-white">ISO 27001 <br /><span className="text-[10px] text-gray-500 uppercase">Certified</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FinCore Pulse (PhonePe Pulses Inspired) */}
            <section className="py-24 relative overflow-hidden bg-brand-dark">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-brand-yellow/5 rounded-full pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-brand-yellow/10 rounded-full pointer-events-none animate-spin-slow"></div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-7xl mx-auto px-4 relative z-10 text-center"
                >
                    <div className="inline-flex items-center gap-2 mb-6">
                        <Zap className="text-brand-yellow w-8 h-8 fill-current" />
                        <h2 className="text-4xl font-black text-white">FinCore Pulse</h2>
                    </div>
                    <p className="text-gray-400 text-xl font-medium mb-16">Get the latest data trends & insights on digital banking across India.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Trusted by</span>
                            <h3 className="text-5xl font-black text-white mb-1">65+ Crore<span className="text-brand-yellow">*</span></h3>
                            <p className="text-gray-400 text-sm font-medium">Registered Users</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Accepted in</span>
                            <h3 className="text-5xl font-black text-white mb-1">98%<span className="text-brand-yellow">*</span></h3>
                            <p className="text-gray-400 text-sm font-medium">Postal Codes</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Accepted at over</span>
                            <h3 className="text-5xl font-black text-white mb-1">4.7+ Crore<span className="text-brand-yellow">*</span></h3>
                            <p className="text-gray-400 text-sm font-medium">Merchants (Stores, Apps & websites)</p>
                        </div>
                    </div>

                    <button className="mt-16 bg-white text-black px-10 py-4 rounded-full font-black text-lg hover:bg-gray-200 transition-all shadow-xl hover:scale-105 active:scale-95">
                        Explore FinCore Pulse
                    </button>

                    <p className="mt-8 text-gray-600 text-[10px] uppercase font-bold">*Based on current market estimates & internal data.</p>
                </motion.div>
            </section>

            {/* Rewarding Spending Account Section */}
            <section className="py-32 bg-brand-dark relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center gap-16">
                    <div className="flex-1 text-left">
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
                            Smart <span className="text-brand-yellow">Wealth</span> <br /> Management.
                        </h2>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            Grow your money with industry-leading interest rates and automated investing.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { title: "5.5% APY", subtitle: "on savings" },
                                { title: "Automated", subtitle: "SIP & Investing" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                    <h3 className="text-2xl font-black text-brand-yellow mb-1">{item.title}</h3>
                                    <p className="text-white font-medium">{item.subtitle}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center items-center">
                        <img
                            src="https://famapp.in/assets/images/images/pages/index/SpendingAccountImage.jpg"
                            alt="FinCore Transactions Mockup"
                            className="w-full max-w-lg rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10"
                        />
                    </div>
                </div>
            </section>

            {/* UPI Payments Section */}
            <section className="py-24 bg-black relative overflow-hidden border-b border-white/10">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16 relative z-10">
                    {/* Left Content */}
                    <div className="flex-1">
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
                            Secure payments across <br /> <span className="text-brand-yellow">the globe.</span>
                        </h2>
                        <ul className="space-y-6 mb-10">
                            {[
                                "Instant International Transfers",
                                "Zero Forex Markup",
                                "Seamless UPI & QR Payments"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-lg text-gray-300 font-medium bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-brand-yellow/50 transition-colors cursor-default">
                                    <div className="bg-brand-yellow flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-4">
                                        <Check className="w-4 h-4 text-black stroke-[3]" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button className="btn-yellow btn-yellow-glow px-10 py-5 text-xl rounded-full font-bold inline-flex items-center">
                            Start Transferring
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>

                    {/* Right Visuals */}
                    <div className="flex-1 relative h-[500px] w-full flex items-center justify-center">
                        {/* Circle 1 - Phone Scan */}
                        <div className="absolute top-0 right-12 w-40 h-40 bg-gray-900/80 backdrop-blur-xl rounded-full border border-green-500/30 flex items-center justify-center animate-float-slow shadow-[0_0_30px_rgba(34,197,94,0.1)] z-10">
                            <div className="relative">
                                <Smartphone className="w-16 h-16 text-green-400" />
                                <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full"></div>
                            </div>
                        </div>

                        {/* Circle 2 - Speed Zap */}
                        <div className="absolute top-1/4 left-10 w-48 h-48 bg-gray-900/80 backdrop-blur-xl rounded-full border border-brand-yellow/30 flex items-center justify-center animate-pulse-slow shadow-[0_0_40px_rgba(252,207,8,0.1)] z-20">
                            <div className="relative">
                                <Zap className="w-20 h-20 text-brand-yellow fill-current" />
                                <div className="absolute inset-0 bg-brand-yellow/20 blur-xl rounded-full"></div>
                            </div>
                        </div>

                        {/* Circle 3 - QR Code */}
                        <div className="absolute bottom-20 right-28 w-44 h-44 bg-gray-900/80 backdrop-blur-xl rounded-full border border-purple-500/30 flex items-center justify-center animate-float-reverse shadow-[0_0_30px_rgba(168,85,247,0.1)] z-10">
                            <div className="bg-white p-2 rounded-xl">
                                <QrCode className="w-20 h-20 text-black" />
                            </div>
                        </div>

                        {/* QR Download Badge */}
                        <div className="absolute bottom-10 -right-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl flex items-center space-x-4 animate-fade-in-up delay-300 hover:scale-105 transition-transform cursor-pointer shadow-2xl">
                            <div className="text-right">
                                <p className="text-white text-xs font-bold uppercase tracking-wider">Download</p>
                                <p className="text-gray-400 text-[10px]">FinCore Bank</p>
                            </div>
                            <div className="w-14 h-14 bg-white rounded-xl p-1 shadow-inner">
                                <QrCode className="w-full h-full text-black" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 relative bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">ONE BANK. <span className="text-brand-yellow">LIMITLESS</span> POSSIBILITIES.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Digital Banking", desc: "Open a full-featured bank account in minutes from your phone.", icon: <Smartphone className="w-10 h-10 text-brand-yellow" />, color: "border-brand-yellow/20 hover:border-brand-yellow" },
                            { title: "Global Debit Card", desc: "A sleek, metal numberless card for offline and online spends worldwide.", icon: <CreditCard className="w-10 h-10 text-purple-500" />, color: "border-purple-500/20 hover:border-purple-500" },
                            { title: "Instant Loans", desc: "Get pre-approved personal loans disbursed to your account instantly.", icon: <Gift className="w-10 h-10 text-green-500" />, color: "border-green-500/20 hover:border-green-500" },
                        ].map((feature, i) => (
                            <div key={i} className={`p-8 bg-brand-card rounded-3xl border ${feature.color} hover:bg-white/5 transition-all duration-300 group hover:-translate-y-2`}>
                                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Card Section */}
            <section className="py-32 bg-brand-dark relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
                            THE <span className="text-brand-yellow">FinCore</span> CARD.
                        </h2>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            It’s widely accepted, numberless, and safer than your flashy debit card. Use it for online subscriptions, swiping at cafes, or tapping at the metro.
                        </p>
                        <ul className="space-y-4 mb-10">
                            {["No Annual Fees", "Works everywhere", "Tap to Pay enabled"].map((item, i) => (
                                <li key={i} className="flex items-center text-lg text-white font-medium">
                                    <Shield className="w-6 h-6 text-brand-yellow mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 hover:scale-105 transition-all transform shadow-2xl">Order Now</button>
                    </div>
                    <div className="flex-1 relative">
                        {/* Card Graphic */}
                        <div className="w-full max-w-md aspect-video bg-black rounded-3xl border border-white/10 p-8 relative shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 hover:shadow-[0_0_50px_rgba(252,207,8,0.2)]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-black rounded-3xl opacity-90"></div>
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div className="flex justify-between items-start">
                                    <Zap className="text-brand-yellow w-8 h-8 fill-current" />
                                    <span className="text-white/50 font-mono">FinCore</span>
                                </div>
                                <div>
                                    <div className="text-white font-mono text-xl tracking-[0.2em] mb-4">•••• •••• •••• 8842</div>
                                    <div className="flex justify-between items-end">
                                        <div className="text-gray-400 text-sm">YOUR NAME</div>
                                        <div className="w-12 h-8 bg-white/20 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Section */}
            <section className="py-20 bg-brand-yellow text-black text-center relative overflow-hidden group">
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <Users className="w-16 h-16 mx-auto mb-6 text-black group-hover:scale-110 transition-transform duration-300" />
                    <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase">Join the <br /> Revolution</h2>
                    <p className="text-xl md:text-2xl font-medium mb-10 max-w-2xl mx-auto">
                        Over 10+ million teenagers trust FinCore for their payments. Are you ready?
                    </p>
                    <Link to="/signup" className="inline-block bg-black text-white px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl">
                        Download the App
                    </Link>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
            </section>

            <Footer darkMode={true} />
        </div>
    );
};

export default Home;
