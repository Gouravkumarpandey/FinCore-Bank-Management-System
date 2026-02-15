import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, Star, Zap, Shield, Smartphone, CreditCard, Gift, Users, Check, QrCode } from 'lucide-react';

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
                    <div className="flex-1 relative">
                        <div className="relative z-10 w-full aspect-square rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl animate-float-slow group">
                            <img
                                src="https://famapp.in/assets/images/images/pages/index/SpendingAccountImage.jpg"
                                alt="Spending Account"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center shadow-lg animate-bounce-slow delay-300">
                                <Gift className="w-5 h-5 text-brand-yellow mr-2" />
                                <span className="text-white font-bold text-sm">Earn Rewards</span>
                            </div>
                        </div>
                        <div className="absolute -inset-10 bg-gradient-to-r from-brand-yellow/20 to-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>
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
