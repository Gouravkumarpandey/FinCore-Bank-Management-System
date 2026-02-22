
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bankService } from '../services/bankService';
import { authService } from '../services/authService';
import Layout from '../components/Layout';
import ActivityChart from '../components/ActivityChart';
import QuickTransfer from '../components/QuickTransfer';
import CreditCard from '../components/CreditCard';
import { Search, Bell, Settings, DollarSign, ArrowUpRight, ArrowDownLeft, Zap, Gift, Plus, Minus, Wallet } from 'lucide-react';

import { userService } from '../services/userService';

const Dashboard = () => {
    const { user, login } = useAuth();
    const [balance, setBalance] = useState(user?.balance || 0);
    const [transactions, setTransactions] = useState([]);
    const [realUsers, setRealUsers] = useState([]);
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const updatedUser = await authService.getMe();
            setBalance(updatedUser.account?.balance || 0);

            // Fetch real users for quick transfer
            const usersData = await userService.getUsers();
            // Filter out current user and map to match UI expected format
            const formattedUsers = usersData.data
                .filter(u => u._id !== user?.id)
                .map(u => ({
                    id: u._id,
                    name: u.fullName || 'User',
                    role: u.role || 'Member',
                    avatar: `https://ui-avatars.com/api/?name=${u.fullName || 'User'}&background=random&color=fff`,
                    accountNumber: u.account?.accountNumber
                }));
            setRealUsers(formattedUsers);

            const userTx = await bankService.getTransactions();
            setTransactions(userTx);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const handleDeposit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await bankService.deposit(amount);
            await fetchDashboardData(); // Refresh all data
            setShowDepositModal(false);
            setAmount('');
            alert(`Successfully deposited ₹${amount}`);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await bankService.withdraw(amount);
            await fetchDashboardData(); // Refresh all data
            setShowWithdrawModal(false);
            setAmount('');
            alert(`Successfully withdrew ₹${amount}`);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const income = transactions.filter(t => t.type === 'deposit' || (t.type === 'transfer' && String(t.toAccount) === String(user?.account?._id)))
        .reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactions.filter(t => t.type === 'withdraw' || (t.type === 'transfer' && String(t.fromAccount) === String(user?.account?._id)))
        .reduce((acc, curr) => acc + curr.amount, 0);

    const stats = [
        { title: 'Total Balance', value: `₹${parseFloat(balance).toLocaleString('en-IN')}` },
        { title: 'Income', value: `₹${income.toLocaleString('en-IN')}` },
        { title: 'Expenses', value: `₹${expense.toLocaleString('en-IN')}` },
    ];

    return (
        <Layout>
            {/* Header */}
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 text-sm">Welcome back, {user?.fullName || 'User'}! 🎸</p>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => setShowDepositModal(true)} className="bg-green-50 text-green-600 px-4 py-2 rounded-xl font-bold hover:bg-green-100 transition flex items-center text-sm border border-green-100">
                            <Plus className="w-4 h-4 mr-2" /> Deposit
                        </button>
                        <button onClick={() => setShowWithdrawModal(true)} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition flex items-center text-sm border border-red-100">
                            <Minus className="w-4 h-4 mr-2" /> Withdraw
                        </button>
                    </div>

                    <div className="relative hidden md:block w-72">
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            className="w-full bg-white border border-gray-200 pl-12 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:border-brand-yellow text-gray-900 placeholder-gray-400 transition-all"
                        />
                        <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                    </div>

                    <button className="bg-white p-3 rounded-full hover:bg-gray-50 transition border border-gray-100">
                        <Settings className="h-5 w-5 text-gray-400 group-hover:text-brand-yellow" />
                    </button>

                    <button className="bg-white p-3 rounded-full hover:bg-gray-50 transition relative border border-gray-100">
                        <Bell className="h-5 w-5 text-brand-yellow" />
                        <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
                    </button>

                    <div className="h-12 w-12 rounded-full bg-brand-yellow flex items-center justify-center text-white font-bold text-xl border-2 border-white cursor-pointer hover:scale-110 transition shadow-lg shadow-brand-yellow/30">
                        {user?.fullName?.charAt(0) || 'U'}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left & Middle Column (Main Content) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col items-center p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer group">
                                <div className={`p-4 rounded-2xl mb-4 transition-transform group-hover:scale-110 ${i === 0 ? 'bg-blue-50 text-brand-yellow' :
                                    i === 1 ? 'bg-purple-50 text-purple-600' :
                                        i === 2 ? 'bg-green-50 text-green-600' :
                                            'bg-red-50 text-red-600'
                                    }`}>
                                    {i === 1 ? <Gift className="h-6 w-6" /> : <DollarSign className="h-6 w-6" />}
                                </div>
                                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.title}</span>
                                <h3 className="text-xl font-black text-gray-900 mt-2 truncate max-w-full">{stat.value}</h3>
                            </div>
                        ))}
                    </div>

                    {/* Chart Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Spend Analysis</h3>
                            <ActivityChart />
                        </div>
                    </div>

                    {/* Recent Transaction History Table */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
                                        <th className="pb-4 font-bold">Payment</th>
                                        <th className="pb-4 font-bold">Date</th>
                                        <th className="pb-4 font-bold text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {transactions.length > 0 ? transactions.slice(0, 5).map((tx) => {
                                        const isIncome = tx.type === 'deposit' || (tx.type === 'transfer' && String(tx.toAccount) === String(user?.account?._id));
                                        return (
                                            <tr key={tx.transactionId} className="group hover:bg-white/5 transition-colors cursor-pointer">
                                                <td className="py-4 flex items-center">
                                                    <div className={`p-2 rounded-full mr-3 ${isIncome ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                        {isIncome ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 group-hover:text-brand-yellow transition">{tx.description}</div>
                                                        <div className="text-xs text-gray-500 uppercase">{tx.type} | {tx.transactionMode}</div>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-gray-500 text-sm">{new Date(tx.createdAt).toLocaleDateString()}</td>
                                                <td className={`py-4 text-right font-bold ${isIncome ? 'text-green-600' : 'text-gray-900'}`}>
                                                    {isIncome ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                                                </td>
                                            </tr>
                                        );
                                    }) : (
                                        <tr>
                                            <td colSpan="3" className="py-8 text-center text-gray-500">No transactions yet</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column (Sidebar Widgets) */}
                <div className="space-y-8">
                    {/* My Cards */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">Your Cards</h3>
                            <button className="text-brand-yellow text-sm font-bold hover:underline">+ Add New</button>
                        </div>
                        <CreditCard
                            balance={parseFloat(balance)}
                            cardHolder={user?.account?.cardHolderName?.toUpperCase() || 'USER NAME'}
                            cardNumber={user?.account?.cardNumber || "•••• •••• •••• ••••"}
                            expiryDate={user?.account?.cardExpiry || "00/00"}
                            cardTheme={user?.account?.cardTheme || "default"}
                        />
                    </div>

                    {/* Recent Transaction List (Short) */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 relative overflow-hidden group shadow-sm">
                        {/* Decorative background equivalent to FinCoins style maybe? User asked for icon Bank/Wallet. */}
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition">
                            <Wallet className="w-24 h-24 text-brand-yellow" />
                        </div>

                        <div className="flex items-center mb-6 z-10 relative">
                            <div className="p-3 bg-blue-50 rounded-xl mr-4">
                                <Wallet className="w-6 h-6 text-brand-yellow" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Main Account</h3>
                                <span className="text-xs text-green-600 font-bold flex items-center"><Zap className="w-3 h-3 mr-1" /> Active Status</span>
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Account Balance</div>
                                <div className="text-2xl font-black text-gray-900">₹{parseFloat(balance).toLocaleString('en-IN')}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                                    <div className="text-gray-500 text-xs font-bold mb-1">Account No.</div>
                                    <div className="text-gray-900 font-mono font-bold text-sm tracking-widest">{user?.account?.accountNumber || '....'}</div>
                                </div>
                                <div className="p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                                    <div className="text-gray-500 text-xs font-bold mb-1">Type</div>
                                    <div className="text-gray-900 font-bold text-sm">{user?.account?.accountType || 'Savings'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                        <QuickTransfer users={realUsers} onTransferSuccess={fetchDashboardData} />
                    </div>
                </div>
            </div>

            {/* Deposit Modal */}
            {showDepositModal && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 max-w-md w-full animate-fade-in-up">
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Deposit Money</h3>
                        <p className="text-gray-500 mb-6">Add funds to your account instantly.</p>

                        <form onSubmit={handleDeposit} className="space-y-6">
                            <div>
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Amount</label>
                                <div className="relative mt-2">
                                    <span className="absolute left-4 top-4 text-brand-yellow font-bold text-xl">₹</span>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-10 pr-4 text-gray-900 text-xl font-bold focus:outline-none focus:border-brand-yellow transition-all"
                                        placeholder="0.00"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowDepositModal(false)}
                                    className="flex-1 py-4 rounded-2xl font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-brand-yellow text-white py-4 rounded-2xl font-bold hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-lg shadow-brand-yellow/30"
                                >
                                    {loading ? 'Processing...' : 'Deposit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Withdraw Modal */}
            {showWithdrawModal && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 max-w-md w-full animate-fade-in-up">
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Withdraw Money</h3>
                        <p className="text-gray-500 mb-6">Transfer funds to your linked bank account.</p>

                        <form onSubmit={handleWithdraw} className="space-y-6">
                            <div>
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Amount</label>
                                <div className="relative mt-2">
                                    <span className="absolute left-4 top-4 text-brand-yellow font-bold text-xl">₹</span>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-10 pr-4 text-gray-900 text-xl font-bold focus:outline-none focus:border-brand-yellow transition-all"
                                        placeholder="0.00"
                                        autoFocus
                                    />
                                </div>
                                <p className="text-right text-xs text-gray-500 mt-2">Available: ₹{parseFloat(balance).toLocaleString('en-IN')}</p>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowWithdrawModal(false)}
                                    className="flex-1 py-4 rounded-2xl font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-bold hover:bg-red-600 hover:scale-[1.02] transition-all shadow-lg shadow-red-500/20"
                                >
                                    {loading ? 'Processing...' : 'Withdraw'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Dashboard;
