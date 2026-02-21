import { Link } from 'react-router-dom';
import { Menu, X, Shield, ArrowRight } from 'lucide-react';
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
                    <Link to="/" className="flex items-center">
                        <img src="/logo (2).jpg" alt="FineCore" className="h-16 w-auto" />
                    </Link>

                    {/* Desktop Menu - Normal Style */}
                    <div className="hidden md:flex items-center space-x-10">
                        <Link to="/" className="text-gray-400 hover:text-white font-black text-sm tracking-tighter transition-all hover:scale-105">Home</Link>
                        <a href="#features" className="text-gray-400 hover:text-white font-black text-sm tracking-tighter transition-all hover:scale-105">Features</a>
                        <a href="#cards" className="text-gray-400 hover:text-white font-black text-sm tracking-tighter transition-all hover:scale-105">Cards</a>
                        <a href="#support" className="text-gray-400 hover:text-white font-black text-sm tracking-tighter transition-all hover:scale-105">Support</a>
                        <Link to="/about" className="text-gray-400 hover:text-white font-black text-sm tracking-tighter transition-all hover:scale-105">About</Link>

                        <div className="flex items-center gap-4 border-l border-white/10 pl-10">
                            {user ? (
                                <Link to="/dashboard" className="bg-brand-yellow text-black px-6 py-2.5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-yellow-400 transition-all shadow-lg hover:shadow-yellow-400/20 active:scale-95">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login" className="text-white font-bold text-sm tracking-tight hover:text-brand-yellow transition-all flex items-center gap-1 group">
                                        Sign In
                                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                    <Link to="/signup" className="bg-white text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-brand-yellow transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95">
                                        Sign Up
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
                        <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-lg font-black text-gray-300 hover:text-white hover:bg-white/5 tracking-tighter">Home</Link>
                        <a href="#features" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-lg font-black text-gray-300 hover:text-white hover:bg-white/5 tracking-tighter">Features</a>
                        <a href="#cards" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-lg font-black text-gray-300 hover:text-white hover:bg-white/5 tracking-tighter">Cards</a>
                        <a href="#support" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-lg font-black text-gray-300 hover:text-white hover:bg-white/5 tracking-tighter">Support</a>
                        <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-lg font-black text-gray-300 hover:text-white hover:bg-white/5 tracking-tighter">About</Link>

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
