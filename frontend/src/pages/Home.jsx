import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, Star, Zap, Shield, Smartphone, CreditCard, Gift, Users, Check, QrCode, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedSecurityBadge = () => {
    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Revolving Orbiting Circles */}
            <div className="absolute inset-0 border-2 border-dashed border-blue-600/20 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-4 border border-white/10 rounded-full animate-spin-reverse-slow"></div>
            <div className="absolute inset-8 border-2 border-dashed border-blue-600/10 rounded-full animate-spin-slower"></div>

            {/* Pulse Rings */}
            <div className="absolute w-32 h-32 bg-blue-600/5 rounded-full animate-ping"></div>

            {/* Central Badge Container */}
            <div className="relative z-10 w-48 h-56 flex items-center justify-center animate-float-slow">
                {/* Custom Shield Path */}
                <svg viewBox="0 0 100 110" className="absolute inset-0 w-full h-full drop-shadow-[0_0_30px_rgba(37,99,235,0.3)]">
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
                        <Lock className="w-8 h-8 text-blue-600" />
                    </div>
                    <span className="text-4xl font-black text-white block leading-none">100%</span>
                    <div className="mt-2 text-blue-600 font-black text-sm tracking-[0.2em] uppercase">Money Safe</div>
                    <div className="mt-1 bg-blue-600 text-white px-3 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">
                        FinCore Trust
                    </div>
                </div>
            </div>
        </div>
    );
};

const HappyStoriesSection = () => {
    const stories = [
        {
            id: 1,
            name: "Aryan",
            tagline: "Love the concept of spending account 💖",
            text: "The idea is so cool. I can use my spending account to make daily payments - and keep it separate from my savings now!",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRazGKny1CSlH3XZGzdceONvBwSZqNVKklLnA&s"
        },
        {
            id: 2,
            name: "Eshan",
            tagline: "Yeh toh upgrade ka bhi upgrade hai 🐐",
            text: "The new design is so cool and app has become more smooth. The FinCore has everything I need in one place.",
            img: "https://img.freepik.com/free-photo/young-handsome-man-wearing-casual-tshirt-blue-background-happy-face-smiling-with-crossed-arms-looking-camera-positive-person_839833-12963.jpg?semt=ais_user_personalization&w=740&q=80"
        },
        {
            id: 3,
            name: "Meera",
            tagline: "My payment took 0.6 seconds! ⚡",
            text: "I was at a shop, and I needed to make a payment in hurry. It was honestly the fastest payment I’ve ever done.",
            img: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"
        },
        {
            id: 4,
            name: "Marcus",
            tagline: "Finally a bank that speaks my language 🚀",
            text: "The rewards system is actually rewarding. I've earned back so much on my daily coffee runs. Absolutely loving it!",
            img: "https://www.shutterstock.com/image-photo/handsome-happy-african-american-bearded-600nw-2460702995.jpg"
        }
    ];

    const [activeIdx, setActiveIdx] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % stories.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isPaused, stories.length]);

    return (
        <section
            className="py-32 bg-white relative overflow-hidden border-t border-gray-50"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase">
                        Over a <span className="text-blue-600">million</span> happy stories
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                    {/* Image Stack */}
                    <div className="flex-1 relative w-full aspect-square max-w-lg">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {stories.map((story, idx) => (
                                <motion.div
                                    key={story.id}
                                    initial={{ opacity: 0, x: 50, rotate: 5 }}
                                    animate={{
                                        opacity: activeIdx === idx ? 1 : 0.3,
                                        x: activeIdx === idx ? 0 : (idx - activeIdx) * 40,
                                        rotate: activeIdx === idx ? 0 : (idx - activeIdx) * 5,
                                        scale: activeIdx === idx ? 1 : 0.9,
                                        zIndex: activeIdx === idx ? 20 : 10
                                    }}
                                    transition={{ duration: 0.6, ease: "circOut" }}
                                    className="absolute w-[85%] h-[85%] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl cursor-pointer"
                                    onClick={() => setActiveIdx(idx)}
                                >
                                    <img src={story.img} className="w-full h-full object-cover" alt={story.name} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="max-w-xl"
                            >
                                <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                    {stories[activeIdx].tagline}
                                </h3>
                                <p className="text-xl text-gray-500 mb-8 leading-relaxed font-medium">
                                    {stories[activeIdx].text}
                                </p>
                                <p className="text-2xl font-black text-gray-900 tracking-tight">
                                    {stories[activeIdx].name}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Dots */}
                        <div className="flex gap-4 mt-12">
                            {stories.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIdx(idx)}
                                    className={`h-2 transition-all duration-300 rounded-full ${activeIdx === idx ? 'w-12 bg-blue-600' : 'w-4 bg-gray-200'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
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
        <div className="font-sans antialiased bg-white text-gray-900 selection:bg-blue-600 selection:text-white min-h-screen overflow-x-hidden">
            <Navbar />

            {/* Hero Section - Split Screen Style */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-4xl mx-auto text-center z-10 transition-all duration-700 relative">
                        {/* Static Scattered Coins - Visible on all devices (Optimized for Mobile) */}
                        {[
                            { size: "w-16 md:w-32", pos: "-left-8 md:-left-20 -top-10", rotate: "rotate-12", delay: 0.2 },
                            { size: "w-12 md:w-24", pos: "-right-8 md:-right-16 top-10 md:top-20", rotate: "-rotate-12", delay: 0.4 },
                            { size: "w-10 md:w-20", pos: "-left-6 md:left-10 bottom-0 md:bottom-0", rotate: "rotate-45", delay: 0.6 },
                            { size: "w-14 md:w-28", pos: "-right-10 md:-right-24 bottom-10", rotate: "-rotate-6", delay: 0.8 },
                            { size: "w-10 md:w-16", pos: "right-4 md:right-40 -top-16 md:-top-20", rotate: "rotate-[30deg]", delay: 1.0 },
                        ].map((coin, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                                animate={{ opacity: 1, scale: 1, rotate: parseInt(coin.rotate.replace('rotate-', '')) || 0 }}
                                transition={{ duration: 1, delay: coin.delay, ease: "easeOut" }}
                                className={`absolute ${coin.pos} ${coin.size} z-0 pointer-events-none`}
                            >
                                <img src="/coin.png" alt="coin" className="w-full h-auto drop-shadow-2xl" />
                            </motion.div>
                        ))}

                        <div className="flex flex-col items-center animate-fade-in-up">
                            {/* Heading */}
                            <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-[1.05] tracking-tight mb-8 max-w-4xl">
                                The banking solution <br />
                                for modern <span className="text-blue-600">adults</span>
                            </h1>

                            {/* Subheading */}
                            <p className="text-gray-500 text-lg md:text-xl font-medium max-w-xl mb-12 leading-relaxed">
                                With FinCore, your spending and savings work as one, <br className="hidden md:block" />
                                managing your money smarter and faster.
                            </p>

                            {/* Action Buttons Stack */}
                            <div className="flex flex-col gap-4 w-full max-w-sm px-4">
                                <Link
                                    to="/signup"
                                    className="bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-blue-700 hover:scale-[1.02] shadow-xl transition-all active:scale-95"
                                >
                                    Open free account
                                </Link>
                                <button
                                    className="bg-white border-2 border-gray-100 text-gray-900 py-5 rounded-2xl font-black uppercase tracking-widest text-lg flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-95"
                                >
                                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
                                        <Zap className="w-4 h-4 text-gray-400 fill-current" />
                                    </div>
                                    Explore Features
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>
            </section>

            {/* Trust Banner - FamApp Style */}
            <div className="bg-gray-100 border-y border-gray-200" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 flex flex-wrap items-center justify-center gap-10 md:gap-20">

                    {/* Left: User Trust Count with Shield */}
                    <div className="flex items-center gap-4">
                        <img
                            src="https://www.famapp.in/assets/images/images/pages/index/userTrustImage.png"
                            alt="10 million users"
                            className="h-36 w-auto object-contain brightness-0 opacity-70"
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
                                <p className="text-gray-900 font-black text-2xl leading-none">10 million</p>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">users love FineCore</p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block h-12 w-px bg-gray-300" />

                    {/* Right: Partner logos */}
                    <div className="flex flex-wrap items-center gap-10 md:gap-14">
                        {/* VISA */}
                        <img
                            src="https://www.famapp.in/assets/images/images/pages/index/VisaLogo.png"
                            alt="VISA"
                            className="h-10 w-auto object-contain brightness-0 opacity-70"
                            onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg'; e.target.className = 'h-8 w-auto object-contain grayscale opacity-70'; }}
                        />

                        {/* RuPay */}
                        <img
                            src="https://www.famapp.in/assets/images/images/pages/index/RupayLogo.png"
                            alt="RuPay"
                            className="h-10 w-auto object-contain brightness-0 opacity-70"
                            onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg'; e.target.className = 'h-10 w-auto object-contain grayscale opacity-70'; }}
                        />

                        {/* UPI */}
                        <img
                            src="https://www.famapp.in/assets/images/images/pages/index/UPILogo.png"
                            alt="UPI"
                            className="h-16 w-auto object-contain brightness-0 opacity-70 transition-all"
                            onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg'; e.target.className = 'h-12 w-auto object-contain grayscale opacity-70'; }}
                        />
                    </div>
                </div>
            </div>


            {/* Marquee Section */}
            <section className="py-10 border-y border-gray-100 bg-white overflow-hidden">
                <div className="flex space-x-12 animate-marquee whitespace-nowrap">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-2 text-2xl font-black text-blue-900 uppercase tracking-tighter">
                            <Star className="w-6 h-6 fill-current text-blue-600/30" />
                            <span>High Interest Savings</span>
                            <Star className="w-6 h-6 fill-current text-blue-600/30" />
                            <span>Zero Maintenance Fees</span>
                            <Star className="w-6 h-6 fill-current text-blue-600/30" />
                            <span>Bank-Grade Security</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Security Banner (PhonePe Inspired) */}
            <section className="py-20 px-4 bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-3xl border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

                        <div className="relative z-10 flex-shrink-0">
                            <AnimatedSecurityBadge />
                        </div>

                        <div className="relative z-10 text-left flex-1">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Your money stays safe.</h2>
                            <p className="text-gray-500 text-xl font-medium mb-8">
                                FinCore protects your money with world-class security systems that help minimize frauds and keep your data private.
                            </p>
                            <div className="flex items-center gap-8 opacity-90">
                                <div className="flex items-center gap-2 border-r border-gray-200 pr-8">
                                    <Shield className="w-6 h-6 text-blue-600" />
                                    <span className="font-bold text-sm tracking-tighter text-gray-900">PCI DSS <br /><span className="text-[10px] text-gray-400 uppercase">Compliant</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap className="w-6 h-6 text-blue-600" />
                                    <span className="font-bold text-sm tracking-tighter text-gray-900">ISO 27001 <br /><span className="text-[10px] text-gray-400 uppercase">Certified</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* FinCore Pulse (Sleek Dark Theme) */}
            <section className="py-24 relative overflow-hidden bg-black border-t border-white/5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-600/10 rounded-full pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-600/20 rounded-full pointer-events-none animate-spin-slow"></div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-7xl mx-auto px-4 relative z-10 text-center"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <Zap className="text-blue-500 w-8 h-8 fill-current" />
                        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">FinCore Pulse</h2>
                    </div>
                    <p className="text-gray-400 text-xl font-medium mb-16 max-w-2xl mx-auto">Get the latest data trends & insights on digital banking across India.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center group">
                            <span className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-4">Trusted by</span>
                            <h3 className="text-5xl md:text-6xl font-black text-white mb-2 group-hover:text-blue-500 transition-colors tracking-tighter">65 Crore<span className="text-blue-600">*</span></h3>
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Registered Users</p>
                        </div>
                        <div className="flex flex-col items-center group">
                            <span className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-4">Accepted in</span>
                            <h3 className="text-5xl md:text-6xl font-black text-white mb-2 group-hover:text-blue-500 transition-colors tracking-tighter">98%<span className="text-blue-600">*</span></h3>
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Postal Codes</p>
                        </div>
                        <div className="flex flex-col items-center group">
                            <span className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-4">Accepted at over</span>
                            <h3 className="text-5xl md:text-6xl font-black text-white mb-2 group-hover:text-blue-500 transition-colors tracking-tighter">4.7 Crore<span className="text-blue-600">*</span></h3>
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest leading-tight">Merchants <br /><span className="text-[10px] opacity-60">(Stores, Apps & websites)</span></p>
                        </div>
                    </div>

                    <button className="mt-16 bg-blue-600 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-lg hover:bg-blue-700 transition-all shadow-xl hover:scale-105 active:scale-95">
                        Explore FinCore Pulse
                    </button>

                    <p className="mt-10 text-gray-600 text-[10px] uppercase font-black tracking-widest animate-pulse">*Based on current market estimates & internal data.</p>
                </motion.div>
            </section>

            {/* Rewarding Spending Account Section (Dark Wealth Theme) */}
            <section className="py-32 bg-black relative overflow-hidden border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 text-left"
                    >
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight italic uppercase tracking-tighter">
                            Smart <span className="text-blue-600">Wealth</span> <br /> Management.
                        </h2>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed font-medium">
                            Grow your money with industry-leading interest rates and automated investing.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "5.5% APY", subtitle: "on savings" },
                                { title: "Automated", subtitle: "SIP & Investing" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.2 }}
                                    className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group"
                                >
                                    <h3 className="text-3xl font-black text-blue-500 mb-2 group-hover:scale-110 transition-transform origin-left">{item.title}</h3>
                                    <p className="text-gray-300 font-bold uppercase tracking-widest text-xs">{item.subtitle}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 flex justify-center items-center"
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-blue-600/30 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <img
                                src="https://famapp.in/assets/images/images/pages/index/SpendingAccountImage.jpg"
                                alt="FinCore Transactions Mockup"
                                className="w-full max-w-lg rounded-[3.5rem] shadow-[0_0_80px_rgba(37,99,235,0.2)] border border-white/10 relative z-10"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* UPI Payments Section */}
            <section className="py-24 bg-black relative overflow-hidden border-b border-white/10">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16 relative z-10">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1"
                    >
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
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.15 }}
                                    className="flex items-center text-lg text-gray-300 font-medium bg-white/5 p-5 rounded-[2rem] border border-white/5 hover:border-brand-yellow/30 transition-all cursor-default group"
                                >
                                    <div className="bg-brand-yellow flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                        <Check className="w-5 h-5 text-black stroke-[4]" />
                                    </div>
                                    <span className="font-bold">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                        <button className="bg-brand-yellow text-white px-12 py-5 text-xl rounded-full font-black uppercase tracking-widest hover:bg-blue-700 hover:scale-105 transition-all shadow-2xl active:scale-95 group">
                            Pay Anyone Now
                            <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </motion.div>

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

            <HappyStoriesSection />

            {/* Support Section - Card Control */}
            <section id="support" className="py-32 bg-black relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-20">

                    {/* Chat GIF Visualization */}
                    <div className="flex-1 relative flex justify-center">
                        <div className="relative w-full max-w-lg rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/5 bg-black">
                            <img
                                src="https://www.famapp.in/assets/images/images/pages/index/supportChatGif.gif"
                                className="w-full h-auto object-contain"
                                alt="Card Control Animation"
                            />
                        </div>
                    </div>

                    <div className="flex-1 text-left lg:pl-10">
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9] italic uppercase tracking-tighter">
                            Your card. <br /> <span className="text-blue-600">Your control.</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-10 leading-relaxed font-medium max-w-xl">
                            Lost your card? Tap a button to block it. Found it back? Tap again to unblock. Total control, zero stress.
                        </p>
                        <button className="bg-gray-100 border border-gray-200 text-gray-900 px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white transition-all flex items-center gap-4 group">
                            Learn more about safety
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform">
                                <ArrowRight className="text-white w-6 h-6" />
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 relative bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">ONE BANK. <span className="text-blue-600">LIMITLESS</span> POSSIBILITIES.</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "classic", desc: "Make secure and fast payments with your virtual FamX card and UPI ID.", color: "text-[#FF8A00]" },
                            { title: "higher limits", desc: "Upgrade your payments with higher limits, rewards and special benefits.", color: "text-[#FFB800]" },
                            { title: "ultra", desc: "Premium membership offering FamX card, ATM withdrawals, customer support, and more.", color: "text-[#00D1FF]" },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.2 }}
                                className="p-10 bg-[#0A0A0A] rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all duration-500 group relative overflow-hidden h-[350px] flex flex-col justify-between"
                            >
                                {/* Subtle Background Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div>
                                    <h3 className={`text-5xl md:text-6xl font-black mb-6 tracking-tighter ${feature.color}`}>
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 text-lg leading-relaxed font-medium">
                                        {feature.desc}
                                    </p>
                                </div>

                                <div className="w-12 h-1 bg-white/10 rounded-full group-hover:w-24 group-hover:bg-blue-600 transition-all duration-500"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Card Section */}
            <section id="cards" className="py-32 bg-brand-dark relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8">
                            THE <span className="text-brand-yellow">FinCore</span> CARD.
                        </h2>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            It’s widely accepted, numberless, and safer than your flashy debit card. Use it for online subscriptions, swiping at cafes, or tapping at the metro.
                        </p>
                        <ul className="space-y-4 mb-10">
                            {["No Annual Fees", "Works everywhere", "Tap to Pay enabled"].map((item, i) => (
                                <li key={i} className="flex items-center text-lg text-gray-900 font-medium">
                                    <Shield className="w-6 h-6 text-brand-yellow mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 hover:scale-105 transition-all transform shadow-2xl">Order Now</button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 10 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex-1 relative"
                    >
                        {/* Card Graphic */}
                        <div className="w-full max-w-md aspect-video rounded-3xl border border-white/10 relative shadow-2xl hover:rotate-0 transition-transform duration-500 hover:shadow-[0_0_50px_rgba(252,207,8,0.2)] overflow-hidden">
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
                    </motion.div>
                </div>
            </section>



            <Footer darkMode={true} />
        </div>
    );
};

export default Home;
