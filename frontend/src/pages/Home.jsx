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

const ReviewsSection = () => {
    const reviews = [
        { id: 1, handle: "krishh_17", text: "turning 18 this week!! i love using Fam, bring bank account linking 🙏", pos: "top-10 left-[5%]" },
        { id: 2, handle: "suhana._", text: "okay serious question — does famapp upi work with bank account?", pos: "top-40 left-[15%]" },
        { id: 3, handle: "iamvihaan", text: "about to start college... can i use famapp for hostel rent?", pos: "top-20 right-[25%]" },
        { id: 4, handle: "dhruvsings", text: "fam for adults ke liye bhi kuch banao. Mere saare friends use karenge.", pos: "bottom-20 left-[10%]" },
        { id: 5, handle: "soniaaa", text: "mom said yes to spotify premium 😭 Get autopay feature please.", pos: "bottom-40 right-[15%]" },
        { id: 6, handle: "iamvihaan", text: "about to start college... can i use famapp for hostel rent?", pos: "bottom-10 right-[5%]" },
    ];

    return (
        <section className="py-32 bg-black relative overflow-hidden min-h-[800px] flex items-center justify-center">
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <h2 className="text-[12vw] font-black leading-none text-center uppercase tracking-tighter">
                    Now you <br /> have to le...
                </h2>
            </div>

            {/* Floating Review Cards */}
            <div className="absolute inset-0 z-10">
                {reviews.map((review) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className={`absolute ${review.pos} bg-[#1A1A1A] p-6 rounded-[2rem] border border-white/5 shadow-2xl max-w-[300px] group hover:border-brand-yellow/30 transition-all cursor-default scale-90 md:scale-100`}
                        animate={{
                            y: [0, -10, 0],
                            rotate: review.id % 2 === 0 ? [0, 1, 0] : [0, -1, 0]
                        }}
                        transition={{
                            duration: 4 + (review.id % 3),
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${review.handle}&background=random&color=fff`} alt="" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-gray-300">@{review.handle}</p>
                            </div>
                            <Star className="w-4 h-4 text-gray-500" />
                        </div>
                        <p className="text-lg font-bold leading-tight text-white mb-4">
                            {review.text}
                        </p>
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                            <span>Reply</span>
                            <span>See translation</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="relative z-20 text-center">
                <Link
                    to="/signup"
                    className="inline-block bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-brand-yellow transition-all transform hover:scale-110 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                >
                    Get Started
                </Link>
            </div>
        </section>
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

            {/* Hero Section - Split Screen Style */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                        {/* Left Content */}
                        <div className="flex-1 text-left z-10 transition-all duration-700">
                            <div className="mb-6 animate-fade-in-up">
                                <span className="text-white font-black text-xl flex items-center gap-2">
                                    fincore
                                </span>
                            </div>

                            <div className="mb-12 animate-fade-in-up delay-100">
                                <h1 className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.75] uppercase italic mb-8 text-white">
                                    FINX
                                </h1>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-white">
                                    spending account <br />
                                    <span className="text-brand-yellow">for adults</span>
                                </h2>
                            </div>

                            <Link
                                to="/signup"
                                className="inline-block bg-brand-yellow text-black px-12 py-5 text-xl rounded-full font-black uppercase tracking-widest hover:bg-yellow-400 hover:scale-105 transition-all shadow-[0_0_40px_rgba(252,207,8,0.3)] active:scale-95 animate-fade-in-up delay-200"
                            >
                                Open Account
                            </Link>
                        </div>

                        {/* Right Content - Phone Mockup */}
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="flex-1 relative z-10"
                        >
                            <img
                                src="/home.png"
                                alt="FineCore App"
                                className="w-full h-auto max-w-[650px] mx-auto drop-shadow-[0_0_80px_rgba(252,207,8,0.15)]"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none"></div>
            </section>

            {/* Trust Banner - FamApp Style */}
            <div className="bg-[#141414] border-y border-white/5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 flex flex-wrap items-center gap-10 md:gap-0 md:justify-between">

                    {/* Left: User Trust Count with Shield */}
                    <div className="flex items-center gap-4">
                        <img
                            src="https://www.famapp.in/assets/images/images/pages/index/userTrustImage.png"
                            alt="10 million users"
                            className="h-36 w-auto object-contain"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        {/* Fallback */}
                        <div className="items-center gap-4 hidden">
                            <div className="relative">
                                <Shield className="w-14 h-14 text-gray-700" strokeWidth={1.5} />
                                <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                            </div>
                            <div className="leading-tight">
                                <p className="text-white font-black text-2xl leading-none">10 million</p>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">users love FineCore</p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block h-12 w-px bg-white/10 mx-10" />

                    {/* Right: Partner logos */}
                    <div className="flex flex-wrap items-center gap-10 md:gap-14">
                        {/* VISA */}
                        <img
                            src="https://www.famapp.in/assets/images/images/pages/index/VisaLogo.png"
                            alt="VISA"
                            className="h-10 w-auto object-contain"
                            onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg'; e.target.className = 'h-8 w-auto object-contain grayscale invert opacity-70'; }}
                        />

                        {/* RuPay */}
                        <img
                            src="https://www.famapp.in/assets/images/images/pages/index/RupayLogo.png"
                            alt="RuPay"
                            className="h-10 w-auto object-contain"
                            onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg'; e.target.className = 'h-10 w-auto object-contain grayscale invert opacity-70'; }}
                        />

                        {/* UPI */}
                        <img
                            src="https://www.famapp.in/assets/images/images/pages/index/UPILogo.png"
                            alt="UPI"
                            className="h-10 w-auto object-contain"
                            onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg'; e.target.className = 'h-10 w-auto object-contain grayscale invert opacity-70'; }}
                        />
                    </div>
                </div>
            </div>


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
                            <h3 className="text-5xl font-black text-white mb-1">65 Crore<span className="text-brand-yellow">*</span></h3>
                            <p className="text-gray-400 text-sm font-medium">Registered Users</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Accepted in</span>
                            <h3 className="text-5xl font-black text-white mb-1">98%<span className="text-brand-yellow">*</span></h3>
                            <p className="text-gray-400 text-sm font-medium">Postal Codes</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Accepted at over</span>
                            <h3 className="text-5xl font-black text-white mb-1">4.7 Crore<span className="text-brand-yellow">*</span></h3>
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
                        <div className="inline-flex items-center px-4 py-2 rounded-full border border-brand-yellow/20 bg-brand-yellow/5 text-brand-yellow text-xs font-black uppercase tracking-widest mb-6">
                            Unified Payments Interface
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight italic uppercase tracking-tighter">
                            Lightning fast <br /> <span className="text-brand-yellow">UPI Payments.</span>
                        </h2>
                        <ul className="space-y-6 mb-10">
                            {[
                                "Personal @fincore UPI ID",
                                "Scan any QR code to pay",
                                "Seamless bank-to-bank transfers"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-lg text-gray-300 font-medium bg-white/5 p-5 rounded-[2rem] border border-white/5 hover:border-brand-yellow/30 transition-all cursor-default group">
                                    <div className="bg-brand-yellow flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                        <Check className="w-5 h-5 text-black stroke-[4]" />
                                    </div>
                                    <span className="font-bold">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="bg-brand-yellow text-black px-12 py-5 text-xl rounded-full font-black uppercase tracking-widest hover:bg-yellow-400 hover:scale-105 transition-all shadow-2xl active:scale-95 group">
                            Pay Anyone Now
                            <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>

                    {/* Right Visuals - FamApp Style */}
                    <div className="flex-1 relative flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative w-full max-w-lg"
                        >
                            <img
                                src="https://www.famapp.in/assets/images/images/pages/index/upiImage.svg"
                                alt="UPI Payments"
                                className="w-full h-auto drop-shadow-[0_0_50px_rgba(252,207,8,0.2)] animate-float-slow"
                            />

                            {/* Decorative Blur */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-yellow/10 blur-[100px] -z-10"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <ReviewsSection />

            {/* Support Section - Safety Chat */}
            <section id="support" className="py-32 bg-black relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-20">

                    {/* Floating Chat Container */}
                    <div className="flex-1 relative flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-[#0A0A0A] w-full max-w-md rounded-[3rem] p-10 border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative min-h-[550px] flex flex-col justify-center gap-8"
                        >
                            {/* Message 1 */}
                            <div className="flex flex-col items-end gap-2 animate-fade-in-up">
                                <div className="bg-white p-5 rounded-3xl rounded-tr-none text-[#121212] font-bold text-sm max-w-[80%] relative shadow-xl">
                                    Hey! I lost my FamCard, 😭 <br /> what will I do now?
                                    <div className="absolute top-0 -right-2 w-4 h-4 bg-white" style={{ clipPath: 'polygon(0 0, 0% 100%, 100% 0)' }}></div>
                                </div>
                                <div className="flex items-center gap-2 pr-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Teresa</span>
                                    <img src="https://i.pravatar.cc/150?u=teresa" className="w-8 h-8 rounded-full border border-white/10" alt="" />
                                </div>
                            </div>

                            {/* Message 2 */}
                            <div className="flex flex-col items-start gap-2 animate-fade-in-up delay-300">
                                <div className="bg-white p-5 rounded-3xl rounded-tl-none text-[#121212] font-bold text-sm max-w-[85%] relative shadow-xl leading-snug">
                                    Hi! 👋 You can block your card instantly from the app. No transactions will be processed once your card is blocked as it gets deactivated permanently.
                                    <div className="absolute top-0 -left-2 w-4 h-4 bg-white" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}></div>
                                </div>
                                <div className="flex items-center gap-2 pl-2">
                                    <img src="https://i.pravatar.cc/150?u=shifa" className="w-8 h-8 rounded-full border border-white/10" alt="" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Shifa</span>
                                </div>
                            </div>

                            {/* Message 3 */}
                            <div className="flex flex-col items-end gap-2 animate-fade-in-up delay-700">
                                <div className="bg-white p-5 rounded-3xl rounded-tr-none text-[#121212] font-bold text-sm max-w-[80%] relative shadow-xl">
                                    OKK! Thank you sm. 🙏 <br /> Blocking the card right away
                                    <div className="absolute top-0 -right-2 w-4 h-4 bg-white" style={{ clipPath: 'polygon(0 0, 0% 100%, 100% 0)' }}></div>
                                </div>
                                <div className="flex items-center gap-2 pr-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Teresa</span>
                                    <img src="https://i.pravatar.cc/150?u=teresa" className="w-8 h-8 rounded-full border border-white/10" alt="" />
                                </div>
                            </div>

                        </motion.div>
                    </div>

                    <div className="flex-1 text-left lg:pl-10">
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9] italic uppercase tracking-tighter">
                            Your card. <br /> <span className="text-brand-yellow">Your control.</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-10 leading-relaxed font-medium max-w-xl">
                            Lost your card? Tap a button to block it. Found it back? Tap again to unblock. Total control, zero stress.
                        </p>
                        <button className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-4 group">
                            Learn more about safety
                            <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform">
                                <ArrowRight className="text-black w-6 h-6" />
                            </div>
                        </button>
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
            <section id="cards" className="py-32 bg-brand-dark relative overflow-hidden">
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
                        <div className="w-full max-w-md aspect-video rounded-3xl border border-white/10 relative shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 hover:shadow-[0_0_50px_rgba(252,207,8,0.2)] overflow-hidden">
                            <img src="/banking cardbackdesign.svg" alt="Card Background" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 bg-gradient-to-tr from-black to-transparent"></div>
                            <div className="relative z-10 flex flex-col justify-between h-full p-8">
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
                        Over 10 million teenagers trust FineCore for their payments. Are you ready?
                    </p>
                    <Link to="/signup" className="inline-block bg-black text-white px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl">
                        Get Started Now
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
