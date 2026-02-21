
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bankService } from '../services/bankService';
import Sidebar from '../components/Sidebar';
import { User, Wallet, ArrowRight, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

const Transfer = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [note, setNote] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleTransfer = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            await bankService.transfer(recipient, amount, note);
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setAmount('');
                setRecipient('');
                setNote('');
                navigate('/dashboard'); // Optional: redirect to dashboard
            }, 3000);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="flex bg-black min-h-screen text-white font-sans selection:bg-brand-yellow selection:text-black">
            <Sidebar />
            <div className="flex-1 md:ml-64 p-8 transition-all duration-300 flex justify-center items-center min-h-screen">
                <div className="max-w-2xl w-full space-y-8 animate-fade-in-up">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-yellow/20 text-brand-yellow mb-6 animate-pulse">
                            <Zap className="h-8 w-8 fill-current" />
                        </div>
                        <h2 className="text-4xl font-black text-white mb-2">Send Money</h2>
                        <p className="text-gray-400 font-medium">Instant. Secure. No Fees.</p>
                        <p className="text-gray-500 text-sm mt-2">Available Balance: <span className="text-white font-bold">₹{parseFloat(user?.balance || 0).toLocaleString('en-IN')}</span></p>
                    </div>

                    <div className="bg-brand-card rounded-3xl border border-white/5 p-8 shadow-2xl relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/5 rounded-full blur-[80px] pointer-events-none"></div>

                        {status === 'success' ? (
                            <div className="text-center py-10 animate-fade-in-up">
                                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-500/20 mb-6 animate-bounce-slow">
                                    <ShieldCheck className="h-12 w-12 text-green-500" />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-2">Transfer Successful!</h3>
                                <p className="text-gray-400 text-lg">₹{amount} sent to {recipient}</p>
                                <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 text-sm text-gray-400">
                                    Redirecting to dashboard...
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleTransfer} className="space-y-6 relative z-10">
                                {status === 'error' && (
                                    <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center text-red-500 animate-shake">
                                        <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                                        <span>{errorMessage}</span>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Recipient</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-500 group-focus-within:text-brand-yellow transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            className="block w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all font-medium"
                                            placeholder="Email or Account Number"
                                            value={recipient}
                                            onChange={(e) => setRecipient(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Amount</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-gray-500 group-focus-within:text-brand-yellow font-bold text-lg transition-colors">₹</span>
                                        </div>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            step="0.01"
                                            className="block w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all font-bold text-lg"
                                            placeholder="0.00"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Note (Optional)</label>
                                    <textarea
                                        rows="2"
                                        className="block w-full px-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all font-medium resize-none"
                                        placeholder="What's this for? 🍕"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-brand-yellow text-black py-4 rounded-2xl font-black text-lg hover:bg-yellow-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(252,207,8,0.3)] flex justify-center items-center group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <span className="animate-pulse">Processing...</span>
                                    ) : (
                                        <>PAY NOW <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transfer;
