import { Link } from 'react-router-dom';
import { Menu, X, Shield, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();

    return (
        <nav className="fixed w-full z-50 bg-black backdrop-blur-xl border-b border-white/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center group">
                        <img src="/logo (2).jpg" alt="FinCore" className="h-20 w-auto object-contain" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        <div className="flex items-center space-x-8">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Features', path: '#features', isHash: true },
                                { name: 'Cards', path: '#cards', isHash: true },
                                { name: 'Support', path: '#support', isHash: true },
                                { name: 'About', path: '/about' }
                            ].map((link) => (
                                link.isHash ? (
                                    <a
                                        key={link.name}
                                        href={link.path}
                                        className="text-gray-300 hover:text-white font-black text-sm uppercase tracking-widest transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ) : (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className="text-gray-400 hover:text-white font-black text-sm uppercase tracking-widest transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}
                        </div>

                        <div className="flex items-center gap-8">
                            {user ? (
                                <Link to="/dashboard" className="bg-blue-600 text-white px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login" className="text-white font-black text-sm uppercase tracking-widest hover:text-blue-500 transition-all flex items-center gap-1 group">
                                        Sign In
                                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                    <Link to="/signup" className="bg-blue-600 text-white px-10 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95">
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
                            className="p-3 rounded-2xl bg-zinc-900 text-white hover:bg-black transition-all focus:outline-none shadow-lg active:scale-95"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay - Sleek Black & White Theme */}
            <div className={`
                md:hidden fixed inset-0 top-20 bg-black transition-all duration-300 z-40
                ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            `}>
                <div className="p-10 flex flex-col h-[calc(100vh-80px)]">
                    <div className="space-y-6">
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'Features', path: '#features', isHash: true },
                            { name: 'Cards', path: '#cards', isHash: true },
                            { name: 'Support', path: '#support', isHash: true },
                            { name: 'About', path: '/about' }
                        ].map((link) => (
                            link.isHash ? (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-2xl font-bold text-white hover:text-blue-500 transition-colors tracking-tight"
                                >
                                    {link.name}
                                </a>
                            ) : (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-2xl font-bold text-white hover:text-blue-500 transition-colors tracking-tight"
                                >
                                    {link.name}
                                </Link>
                            )
                        ))}
                    </div>

                    <div className="mt-auto pb-10 space-y-6">
                        {!user && (
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="block text-xl font-bold text-white/60 hover:text-white transition-colors"
                            >
                                Sign In
                            </Link>
                        )}

                        {user ? (
                            <Link
                                to="/dashboard"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center py-5 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-600/20 active:scale-95 transition-transform"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <Link
                                to="/signup"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center py-5 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-600/20 active:scale-95 transition-transform"
                            >
                                Get Started
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
