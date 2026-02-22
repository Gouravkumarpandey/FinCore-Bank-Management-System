
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Lock, Terminal, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await login(email, password);
            if (data.role === 'admin') {
                navigate('/admin');
            } else {
                setError('Unauthorized: Administrative credentials required for this portal.');
                // Optionally log them out if they aren't admin but logged in here
            }
        } catch (err) {
            setError('System Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 font-sans selection:bg-brand-yellow selection:text-white overflow-hidden relative">
            {/* Background Security Grid/Scanning Dots */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0066FF 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            {/* Scanning Line Animation */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-brand-yellow/30 shadow-[0_0_15px_rgba(252,207,8,0.5)] animate-scan"></div>

            <div className="max-w-md w-full relative z-10">
                {/* Branding / Icon */}
                <div className="text-center mb-10 group">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-brand-yellow blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative bg-white border border-gray-100 p-5 rounded-3xl shadow-xl mb-6 inline-flex transform group-hover:scale-110 transition-transform duration-500">
                            <ShieldAlert className="w-12 h-12 text-brand-yellow" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2 italic uppercase">System <span className="text-brand-yellow">Control</span></h1>
                    <div className="flex items-center justify-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">
                        <Terminal size={14} className="text-brand-yellow" /> Restricted Access Domain
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="mb-8">
                        <h2 className="text-xl font-black text-gray-900 mb-1">Administrator Proxy</h2>
                        <p className="text-gray-500 text-sm">Initialize secure session with core infrastructure.</p>

                        {error && (
                            <div className="mt-6 flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl animate-shake">
                                <ShieldAlert className="text-red-500 shrink-0 w-5 h-5" />
                                <span className="text-red-600 text-xs font-bold leading-tight">{error}</span>
                            </div>
                        )}
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Terminal Identity</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-yellow/50">
                                    <Terminal size={18} />
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/20 transition-all font-mono text-sm"
                                    placeholder="admin_id@fincore.internal"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Access Protocol</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-yellow/50">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-12 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/20 transition-all font-mono text-sm"
                                    placeholder="••••••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-yellow text-white font-black py-5 rounded-2xl hover:bg-blue-700 transition-all transform active:scale-95 flex items-center justify-center gap-3 uppercase tracking-[0.2em] shadow-lg shadow-brand-yellow/30 disabled:opacity-50"
                        >
                            {loading ? 'Validating...' : (
                                <>
                                    Authorize Entry <ShieldCheck size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <Link to="/login" className="hover:text-gray-900 transition">Standard User Portal</Link>
                        <span className="flex items-center gap-1"><Terminal size={10} /> v2.4.0_STABLE</span>
                    </div>
                </div>

                <p className="mt-8 text-center text-gray-700 text-[10px] font-bold uppercase tracking-[0.4em]">
                    Copyright © 2026 FinCore Security Group. Unauthorized Access is Felonious.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
