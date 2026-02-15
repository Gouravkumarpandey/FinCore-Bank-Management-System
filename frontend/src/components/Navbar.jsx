import { Link } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();

    return (
        <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group">
                        <Shield className="h-8 w-8 text-brand-yellow transform group-hover:rotate-12 transition-transform duration-300" />
                        <span className="ml-2 text-2xl font-black text-white tracking-tighter">FinCore<span className="text-brand-yellow">.</span></span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-300 hover:text-white font-medium transition-colors">Home</Link>
                        <a href="#features" className="text-gray-300 hover:text-white font-medium transition-colors">Features</a>
                        <a href="#about" className="text-gray-300 hover:text-white font-medium transition-colors">About</a>
                        {user ? (
                            <Link to="/dashboard" className="btn-yellow btn-yellow-glow px-6 py-2.5 rounded-full">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:text-brand-yellow font-medium transition-colors">Sign In</Link>
                                <Link to="/signup" className="btn-yellow btn-yellow-glow px-6 py-2.5 rounded-full">
                                    Get Started
                                </Link>
                            </>
                        )}
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
                <div className="md:hidden bg-black border-t border-white/10 absolute w-full left-0 top-20">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        <Link to="/" className="block px-3 py-3 rounded-lg text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5">Home</Link>
                        <a href="#features" className="block px-3 py-3 rounded-lg text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5">Features</a>
                        {user ? (
                            <Link to="/dashboard" className="block w-full text-center mt-6 py-3 btn-yellow btn-yellow-glow rounded-full">Dashboard</Link>
                        ) : (
                            <>
                                <Link to="/login" className="block w-full text-center mt-6 py-3 border border-white/20 rounded-full text-white font-bold hover:bg-white/10 transition">Sign In</Link>
                                <Link to="/signup" className="block w-full text-center mt-3 py-3 btn-yellow btn-yellow-glow rounded-full">Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
