import { Link } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();

    return (
        <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group">
                        <div className="relative">
                            <Shield className="h-8 w-8 text-brand-yellow transform group-hover:rotate-12 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-brand-yellow/20 blur-lg rounded-full animate-pulse"></div>
                        </div>
                        <span className="ml-3 text-2xl font-black text-white tracking-tighter uppercase italic">
                            FineCore
                        </span>
                    </Link>

                    {/* Desktop Menu - Normal Style */}
                    <div className="hidden md:flex items-center space-x-10">
                        <div className="flex items-center space-x-8">
                            <Link to="/investments" className="text-gray-400 hover:text-white font-bold text-sm tracking-tight transition-all hover:scale-105">Investments</Link>
                            <Link to="/cards" className="text-gray-400 hover:text-white font-bold text-sm tracking-tight transition-all hover:scale-105">Cards</Link>
                            <Link to="/transfer" className="text-gray-400 hover:text-white font-bold text-sm tracking-tight transition-all hover:scale-105">Payments</Link>
                            <Link to="/" className="text-gray-400 hover:text-white font-bold text-sm tracking-tight transition-all hover:scale-105">Security</Link>
                        </div>

                        <div className="flex items-center gap-4 border-l border-white/10 pl-10">
                            {user ? (
                                <Link to="/dashboard" className="bg-brand-yellow text-black px-6 py-2.5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-yellow-400 transition-all shadow-lg hover:shadow-yellow-400/20 active:scale-95">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login" className="text-white font-bold text-sm hover:text-brand-yellow transition-colors">
                                        Sign In
                                    </Link>
                                    <Link to="/signup" className="bg-white text-black px-6 py-2.5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-brand-yellow transition-all shadow-lg active:scale-95">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-brand-yellow transition-colors focus:outline-none"
                        >
                            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black border-t border-white/10 absolute w-full left-0 top-20 animate-fade-in">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        <Link to="/investments" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-lg font-bold text-gray-300 hover:text-white hover:bg-white/5">Investments</Link>
                        <Link to="/cards" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-lg font-bold text-gray-300 hover:text-white hover:bg-white/5">Cards</Link>
                        <Link to="/transfer" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-lg font-bold text-gray-300 hover:text-white hover:bg-white/5">Payments</Link>

                        {user ? (
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block w-full text-center mt-6 py-4 bg-brand-yellow text-black font-black uppercase tracking-widest rounded-xl">Go to Dashboard</Link>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center py-4 border border-white/20 rounded-xl text-white font-black uppercase text-xs tracking-widest hover:bg-white/5">Login</Link>
                                <Link to="/signup" onClick={() => setIsOpen(false)} className="flex items-center justify-center py-4 bg-white text-black rounded-xl font-black uppercase text-xs tracking-widest hover:bg-brand-yellow">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
