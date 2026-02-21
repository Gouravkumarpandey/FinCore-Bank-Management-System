import { useState } from 'react';
import { ArrowRight, UserPlus, Send, Loader2, Check } from 'lucide-react';
import { bankService } from '../services/bankService';

const QuickTransfer = ({ users, onTransferSuccess }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleTransfer = async () => {
        if (!selectedUser || !amount || parseFloat(amount) <= 0) {
            alert("Please select a user and enter a valid amount.");
            return;
        }

        setLoading(true);
        setStatus('loading');

        try {
            await bankService.transfer(
                selectedUser.accountNumber,
                amount,
                "Quick Transfer"
            );

            setStatus('success');
            setAmount('');
            setSelectedUser(null);

            // Reset status after animation
            setTimeout(() => {
                setStatus('idle');
                setLoading(false);
                if (onTransferSuccess) onTransferSuccess();
            }, 2000);

        } catch (error) {
            console.error(error);
            alert(`Transfer Failed: ${error.message}`);
            setStatus('idle');
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h3 className="text-xl font-bold text-white mb-6">Quick Transfer</h3>

            <div className="flex space-x-6 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                {users.slice(0, 5).map((user) => (
                    <div
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className={`flex-shrink-0 flex flex-col items-center cursor-pointer p-2 rounded-xl transition text-center min-w-[72px] group ${selectedUser?.id === user.id ? 'bg-white/10 ring-1 ring-brand-yellow' : 'hover:bg-white/5'}`}
                    >
                        <div className="relative">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className={`h-14 w-14 rounded-full border-2 shadow-[0_0_10px_rgba(252,207,8,0.2)] mb-2 object-cover transition-transform ${selectedUser?.id === user.id ? 'border-brand-yellow scale-110' : 'border-transparent group-hover:scale-110'}`}
                            />
                            {selectedUser?.id === user.id && (
                                <div className="absolute -bottom-1 -right-1 bg-brand-yellow rounded-full p-0.5 border border-black">
                                    <Check className="w-3 h-3 text-black" />
                                </div>
                            )}
                        </div>
                        <span className={`text-xs font-bold truncate w-16 ${selectedUser?.id === user.id ? 'text-brand-yellow' : 'text-white'}`}>{user.name.split(' ')[0]}</span>
                        <span className="text-[10px] text-gray-500 truncate w-16 uppercase tracking-wider">{user.role}</span>
                    </div>
                ))}
                <div className="flex-shrink-0 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 p-2 rounded-xl transition min-w-[72px] border-2 border-dashed border-white/20 hover:border-brand-yellow group">
                    <div className="h-14 w-14 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-brand-yellow/20 mb-2 transition">
                        <UserPlus className="h-6 w-6 text-gray-400 group-hover:text-brand-yellow mb-1" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 group-hover:text-white transition">Add New</span>
                </div>
            </div>

            <div className="flex items-center space-x-4 bg-black/30 p-2 rounded-2xl border border-white/10 relative">
                <span className="absolute left-6 text-brand-yellow font-bold text-lg">₹</span>
                <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 pl-8 pr-4 py-3 bg-transparent border-none focus:ring-0 outline-none text-xl font-bold text-white placeholder-gray-600 appearance-none"
                    style={{ MozAppearance: 'textfield' }}
                />
                <button
                    onClick={handleTransfer}
                    disabled={loading || !selectedUser || !amount}
                    className={`p-3 rounded-xl shadow-[0_0_15px_rgba(252,207,8,0.4)] transform transition-all flex items-center justify-center ${status === 'success' ? 'bg-green-500 text-white' :
                        loading ? 'bg-brand-yellow/50 cursor-not-allowed' :
                            'bg-brand-yellow hover:bg-yellow-400 hover:scale-105 text-black'
                        }`}
                >
                    {status === 'success' ? (
                        <Check className="h-6 w-6 font-bold" />
                    ) : loading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                        <ArrowRight className="h-6 w-6 font-bold" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default QuickTransfer;
