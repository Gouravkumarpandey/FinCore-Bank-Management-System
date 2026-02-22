import { Link } from 'react-router-dom';
import { Menu, X, Shield, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src="/logo (2).jpg" alt="FineCore" className="h-16 w-auto" />
                    </Link>

                    {/* Desktop Menu - Normal Style */}
                    <div className="hidden md:flex items-center space-x-10">
                        <div className="flex items-center space-x-8">
                            <Link to="/" className="text-gray-600 hover:text-brand-yellow font-black text-sm tracking-tighter transition-all hover:scale-105">Home</Link>
                            <a href="#features" className="text-gray-600 hover:text-brand-yellow font-black text-sm tracking-tighter transition-all hover:scale-105">Features</a>
                            <a href="#cards" className="text-gray-600 hover:text-brand-yellow font-black text-sm tracking-tighter transition-all hover:scale-105">Cards</a>
                            <a href="#support" className="text-gray-600 hover:text-brand-yellow font-black text-sm tracking-tighter transition-all hover:scale-105">Support</a>
                            <Link to="/about" className="text-gray-600 hover:text-brand-yellow font-black text-sm tracking-tighter transition-all hover:scale-105">About</Link>
                        </div>

                        <div className="flex items-center gap-4 border-l border-white/10 pl-10">
                            {user ? (
                                <Link to="/dashboard" className="bg-brand-yellow text-white px-6 py-2.5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-400/20 active:scale-95">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-900 font-bold text-sm tracking-tight hover:text-brand-yellow transition-all flex items-center gap-1 group">
                                        Sign In
                                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                    <Link to="/signup" className="bg-brand-yellow text-white px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-lg active:scale-95">
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
                            className="text-gray-900 hover:text-brand-yellow transition-colors focus:outline-none"
                        >
                            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-20 animate-fade-in">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-lg font-black text-gray-300 hover:text-white hover:bg-white/5 tracking-tighter">Home</Link>
                        <a href="#features" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-lg font-black text-gray-300 hover:text-white hover:bg-white/5 tracking-tighter">Features</a>
                        <a href="#cards" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-lg font-black text-gray-300 hover:text-white hover:bg-white/5 tracking-tighter">Cards</a>
                        <a href="#support" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-lg font-black text-gray-300 hover:text-white hover:bg-white/5 tracking-tighter">Support</a>
                        <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-lg font-black text-gray-300 hover:text-white hover:bg-white/5 tracking-tighter">About</Link>

                        {user ? (
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block w-full text-center mt-6 py-4 bg-brand-yellow text-white font-black uppercase tracking-widest rounded-xl">Go to Dashboard</Link>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center py-4 border border-gray-200 rounded-xl text-gray-900 font-black uppercase text-xs tracking-widest hover:bg-gray-50">Login</Link>
                                <Link to="/signup" onClick={() => setIsOpen(false)} className="flex items-center justify-center py-4 bg-brand-yellow text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-700">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
