import React from 'react';
import { Shield, Mail, Github, Code, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = ({ darkMode = false }) => {
    // If darkMode is active (e.g. Home page), use black/dark theme. Otherwise use the standard FinCore blue.
    const bgClass = darkMode ? "bg-black border-t border-white/10 text-white" : "bg-gradient-to-br from-gray-900 to-blue-900 text-white";
    const textClass = darkMode ? "text-gray-400 hover:text-brand-yellow font-medium transition-colors" : "text-gray-400 hover:text-white font-medium transition-colors";
    const titleClass = darkMode ? "text-xs font-bold text-gray-500 tracking-widest uppercase mb-6" : "text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4";
    const iconClass = darkMode ? "text-gray-400 hover:text-brand-yellow" : "text-gray-400 hover:text-white";

    return (
        <footer className={`${bgClass} pt-20 pb-10 transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-6">
                            <img src="/logo (2).jpg" alt="FineCore" className="h-14 w-auto" />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                            Building the financial stack for the next generation. Secure, limitless, and rewarding.
                        </p>
                        <div className="flex space-x-4">
                            <Instagram className={`w-5 h-5 cursor-pointer transition ${iconClass}`} />
                            <Twitter className={`w-5 h-5 cursor-pointer transition ${iconClass}`} />
                            <Linkedin className={`w-5 h-5 cursor-pointer transition ${iconClass}`} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className={titleClass}>Explore</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className={textClass}>Home</Link></li>
                            <li><a href="#features" className={textClass}>Features</a></li>
                            <li><Link to="/login" className={textClass}>Login</Link></li>
                            <li><Link to="/signup" className={textClass}>Get Started</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className={titleClass}>Legal</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className={textClass}>Privacy Policy</a></li>
                            <li><a href="#" className={textClass}>Terms of Service</a></li>
                            <li><a href="#" className={textClass}>Partner with us</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className={titleClass}>Contact</h3>
                        <ul className="space-y-4">
                            <li className={`flex items-center space-x-3 cursor-pointer ${textClass}`}>
                                <Mail className="h-5 w-5" />
                                <span>hello@fincore.com</span>
                            </li>
                            <li className={`flex items-center space-x-3 cursor-pointer ${textClass}`}>
                                <Github className="h-5 w-5" />
                                <a href="#" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={`border-t ${darkMode ? "border-white/10" : "border-gray-800"} pt-8 flex flex-col md:flex-row justify-between items-center`}>
                    <p className="text-gray-600 text-sm font-medium">
                        &copy; {new Date().getFullYear()} FinCore Technologies Pvt Ltd. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
