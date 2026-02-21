import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, ArrowRight, Check } from 'lucide-react';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signup(fullName, email, password, phone);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create account: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-black font-sans selection:bg-brand-yellow selection:text-black">
            {/* Left Side - Animated Branding */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center border-r border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900 via-black to-black opacity-50"></div>

                {/* Animated Blobs */}
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>

                <div className="relative z-10 p-12 max-w-lg">
                    <Link to="/" className="inline-flex items-center space-x-2 mb-8 group">
                        <Shield className="h-10 w-10 text-brand-yellow group-hover:rotate-12 transition-transform" />
                        <span className="text-3xl font-black text-white tracking-tighter">FinCore.</span>
                    </Link>
                    <h1 className="text-5xl font-black text-white mb-6 leading-tight">
                        Join the <span className="text-brand-yellow">revolution</span> today.
                    </h1>
                    <ul className="space-y-4 text-gray-400 font-medium text-lg mt-8">
                        {['No hidden fees', 'Instant virtual card', 'Earn 5% rewards on everything'].map((item, i) => (
                            <li key={i} className="flex items-center space-x-3">
                                <div className="bg-brand-yellow/20 p-1 rounded-full text-brand-yellow">
                                    <Check className="w-5 h-5" />
                                </div>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
                <Link to="/" className="absolute top-8 right-8 text-gray-400 hover:text-white transition flex items-center">
                    Back to Home <ArrowRight className="ml-2 w-4 h-4" />
                </Link>

                <div className="max-w-md w-full space-y-6">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-black text-white mb-2">Create Account</h2>
                        <p className="text-gray-400">Join 10M users getting financially smart.</p>
                        {error && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">{error}</div>}
                    </div>

                    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Full Name</label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-brand-card/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Phone Number</label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-brand-card/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
                                placeholder="+91 9876543210"
                            />
                        </div>

                        <div className="space-y-5">
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-brand-card/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
                                    placeholder="user@fincore.com"
                                />
                            </div>
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-brand-card/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
                                    placeholder="Create a strong password"
                                />
                            </div>
                        </div>

                        <div className="flex items-start">
                            <input
                                id="terms"
                                type="checkbox"
                                className="h-4 w-4 mt-1 rounded border-gray-600 text-brand-yellow focus:ring-brand-yellow bg-gray-800"
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                                I agree to the <a href="#" className="underline hover:text-white">Terms of Service</a> and <a href="#" className="underline hover:text-white">Privacy Policy</a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-yellow text-black py-4 rounded-2xl font-bold text-lg hover:bg-yellow-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(252,207,8,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-black text-gray-500 font-medium">Or sign up with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" className="flex items-center justify-center px-4 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition text-white font-medium">
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                Google
                            </button>
                            <button type="button" className="flex items-center justify-center px-4 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition text-white font-medium">
                                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.38-1.09-.53-2.12-.5-3.2.03-1.03.53-2.15.56-3.11-.38-2.33-2.31-3.48-6.66-1.56-9.75 1.06-1.72 2.78-2.75 4.63-2.66 1.34.09 2.47.66 3.22.69.81.03 2.16-.69 3.75-.59 1.56.09 3.06.75 4.09 2.16-3.69 1.88-3.03 6.69.56 8.16-.62 1.62-1.5 3.25-2.5 4.75-.44-1-1.06-2.03-2.8-1.96zM13.56 5.84c.72-1 1.25-2.34 1-3.63-1.06.09-2.47.66-3.25 1.75-.72.97-1.22 2.25-1 3.53 1.12.03 2.53-.59 3.25-1.63z" /></svg>
                                Apple
                            </button>
                        </div>

                        <div className="text-center mt-6">
                            <p className="text-gray-500 font-medium">
                                Already have an account?{' '}
                                <Link to="/login" className="text-brand-yellow hover:text-yellow-400 font-bold hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
