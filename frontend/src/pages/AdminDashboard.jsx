
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminService } from '../services/adminService';
import Sidebar from '../components/Sidebar';
import {
    Users,
    ShieldAlert,
    DollarSign,
    Activity,
    Search,
    Filter,
    UserX,
    UserCheck,
    Snowflake,
    Sun,
    ArrowUpRight,
    ArrowDownLeft,
    PieChart,
    BarChart3,
    Clock,
    UserPlus,
    Lock
} from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [analytics, setAnalytics] = useState(null);
    const [users, setUsers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [adminFormData, setAdminFormData] = useState({ fullName: '', email: '', password: '', phone: '' });

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [analyticsData, usersData, accountsData, txData] = await Promise.all([
                adminService.getAnalytics(),
                adminService.getUsers(),
                adminService.getAccounts(),
                adminService.getAllTransactions()
            ]);
            setAnalytics(analyticsData);
            setUsers(usersData);
            setAccounts(accountsData);
            setTransactions(txData);
        } catch (error) {
            console.error("Failed to fetch admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        try {
            await adminService.createAdmin(adminFormData);
            alert("Admin created successfully!");
            setShowAdminModal(false);
            setAdminFormData({ fullName: '', email: '', password: '', phone: '' });
            fetchInitialData();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleToggleBlock = async (userId) => {
        try {
            await adminService.toggleBlockUser(userId);
            setUsers(users.map(u => u._id === userId ? { ...u, isBlocked: !u.isBlocked } : u));
        } catch (error) {
            alert(error.message);
        }
    };

    const handleToggleFreeze = async (accountId) => {
        try {
            await adminService.toggleFreezeAccount(accountId);
            setAccounts(accounts.map(a => a._id === accountId ? { ...a, status: a.status === 'frozen' ? 'active' : 'frozen' } : a));
        } catch (error) {
            alert(error.message);
        }
    };

    if (user?.role !== 'admin') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="bg-brand-card border border-red-500/20 p-8 rounded-3xl max-w-md text-center">
                    <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-black text-white mb-2">Access Denied</h2>
                    <p className="text-gray-400">Strictly for system administrators only. Your attempt has been logged. 🛡️</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex bg-black min-h-screen text-white font-sans selection:bg-brand-yellow selection:text-black">
            <Sidebar />

            <div className="flex-1 md:ml-64 p-8 transition-all duration-300">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-brand-yellow text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Admin Panel</span>
                            <h1 className="text-3xl font-black text-white">System Controller</h1>
                        </div>
                        <p className="text-gray-400 text-sm italic">Monitoring FinCore infrastructure in real-time. ⚡</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowAdminModal(true)}
                            className="bg-brand-yellow text-black px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition flex items-center gap-2"
                        >
                            <UserPlus className="w-4 h-4" /> Create Admin
                        </button>
                        <div className="flex items-center bg-brand-card border border-white/10 rounded-2xl px-4 py-2">
                            <div className="flex flex-col items-end mr-4">
                                <span className="text-xs text-gray-500 font-bold uppercase">Superuser</span>
                                <span className="text-sm font-black text-white">{user?.fullName}</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-black font-black">
                                {user?.fullName?.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Tab Navigation */}
                <div className="flex space-x-2 mb-8 bg-brand-card/30 p-1 rounded-2xl border border-white/5 w-fit">
                    {['overview', 'users', 'accounts', 'transactions'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all uppercase tracking-widest ${activeTab === tab
                                ? 'bg-brand-yellow text-black'
                                : 'text-gray-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-yellow"></div>
                    </div>
                ) : (
                    <div className="animate-fade-in-up">
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                {/* Analytics Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <StatCard icon={<Users />} title="Total Users" value={analytics?.totalUsers} color="yellow" />
                                    <StatCard icon={<DollarSign />} title="Total Liquidity" value={`₹${analytics?.totalBalance?.toLocaleString()}`} color="green" />
                                    <StatCard icon={<Activity />} title="Tx Volume" value={`₹${analytics?.totalVolume?.toLocaleString()}`} color="zinc" />
                                    <StatCard icon={<ShieldAlert />} title="Total Accounts" value={analytics?.totalAccounts} color="blue" />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="bg-brand-card rounded-3xl p-8 border border-white/5">
                                        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                                            <Clock className="text-brand-yellow" /> System Pulse
                                        </h3>
                                        {/* Mock System Logs */}
                                        <div className="space-y-4">
                                            <LogItem type="success" msg="Database integrity check passed (99.9% uptime)" time="Just now" />
                                            <LogItem type="warning" msg="Unusual transfer volume detected in Noida region" time="5 mins ago" />
                                            <LogItem type="info" msg="Admin Gourav updated system interest rate parameters" time="1 hour ago" />
                                            <LogItem type="error" msg="Failed login attempt from IP: 192.168.1.45" time="2 hours ago" />
                                        </div>
                                    </div>

                                    <div className="bg-brand-card rounded-3xl p-8 border border-white/5 flex flex-col justify-center items-center text-center">
                                        <PieChart className="w-24 h-24 text-brand-yellow/20 mb-6" />
                                        <h3 className="text-xl font-black mb-2">Asset Distribution</h3>
                                        <p className="text-gray-400 text-sm max-w-xs">84% of total volume is concentrated in Savings accounts. Review liquidity protocols.</p>
                                        <button className="mt-8 border border-brand-yellow/30 text-brand-yellow px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-yellow hover:text-black transition">Download Full Report</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="bg-brand-card rounded-3xl border border-white/5 overflow-hidden">
                                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                                    <h3 className="text-xl font-black">Registered Users ({users.length})</h3>
                                    <div className="relative w-full md:w-64">
                                        <input
                                            type="text"
                                            placeholder="Search users..."
                                            className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-yellow"
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                                <th className="px-6 py-4">Full Name</th>
                                                <th className="px-6 py-4">Role</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4">Joined</th>
                                                <th className="px-6 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {users.filter(u => u.fullName.toLowerCase().includes(searchTerm.toLowerCase())).map((u) => (
                                                <tr key={u._id} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold">{u.fullName}</div>
                                                        <div className="text-[10px] text-gray-500">{u.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-500' : 'bg-blue-500/20 text-blue-500'
                                                            }`}>{u.role}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`w-2 h-2 rounded-full inline-block mr-2 ${u.isBlocked ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></span>
                                                        <span className="text-xs">{u.isBlocked ? 'Blocked' : 'Active'}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        {u.role !== 'admin' && (
                                                            <button
                                                                onClick={() => handleToggleBlock(u._id)}
                                                                className={`p-2 rounded-lg transition-transform hover:scale-110 ${u.isBlocked ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                                                                    }`}
                                                                title={u.isBlocked ? "Unblock User" : "Block User"}
                                                            >
                                                                {u.isBlocked ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'accounts' && (
                            <div className="bg-brand-card rounded-3xl border border-white/5 overflow-hidden">
                                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                                    <h3 className="text-xl font-black">Financial Assets ({accounts.length})</h3>
                                    <div className="relative w-full md:w-64">
                                        <input
                                            type="text"
                                            placeholder="Search Acc No..."
                                            className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-yellow"
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                                <th className="px-6 py-4">Account Number</th>
                                                <th className="px-6 py-4">Holder</th>
                                                <th className="px-6 py-4">Balance</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {accounts.filter(a => a.accountNumber.includes(searchTerm)).map((a) => (
                                                <tr key={a._id} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 font-mono text-xs">{a.accountNumber}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-sm">{a.userId?.fullName || 'N/A'}</div>
                                                        <div className="text-[10px] text-gray-500">{a.accountType}</div>
                                                    </td>
                                                    <td className="px-6 py-4 font-black text-sm">₹{a.balance.toLocaleString()}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${a.status === 'frozen' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                                                            }`}>{a.status}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button
                                                            onClick={() => handleToggleFreeze(a._id)}
                                                            className={`p-2 rounded-lg transition-transform hover:scale-110 ${a.status === 'frozen' ? 'bg-brand-yellow/20 text-brand-yellow' : 'bg-blue-500/20 text-blue-500'
                                                                }`}
                                                            title={a.status === 'frozen' ? "Unfreeze Account" : "Freeze Account"}
                                                        >
                                                            {a.status === 'frozen' ? <Sun className="w-4 h-4" /> : <Snowflake className="w-4 h-4" />}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'transactions' && (
                            <div className="bg-brand-card rounded-3xl border border-white/5 overflow-hidden">
                                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                                    <h3 className="text-xl font-black">Master Ledger ({transactions.length})</h3>
                                    <button className="bg-brand-yellow/10 text-brand-yellow px-4 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-2">
                                        <Filter className="w-4 h-4" /> Filter Log
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                                <th className="px-6 py-4">Transaction ID</th>
                                                <th className="px-6 py-4">Type</th>
                                                <th className="px-6 py-4">Amount</th>
                                                <th className="px-6 py-4">Mode</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {transactions.map((tx) => (
                                                <tr key={tx._id} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 font-mono text-[10px] text-brand-yellow">{tx.transactionId}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-sm uppercase">{tx.type}</div>
                                                        <div className="text-[10px] text-gray-500 truncate max-w-[150px]">{tx.description}</div>
                                                    </td>
                                                    <td className="px-6 py-4 font-black">₹{tx.amount.toLocaleString()}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase">{tx.transactionMode}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${tx.status === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                                                            }`}>{tx.status}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-[10px] text-gray-500">{new Date(tx.createdAt).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Create Admin Modal */}
            {showAdminModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-brand-card border border-white/10 p-8 rounded-[2rem] w-full max-w-md animate-fade-in-up">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-black">Create Administrator</h3>
                            <button onClick={() => setShowAdminModal(false)} className="text-gray-500 hover:text-white"><Lock size={20} /></button>
                        </div>
                        <form onSubmit={handleCreateAdmin} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-yellow"
                                    value={adminFormData.fullName}
                                    onChange={(e) => setAdminFormData({ ...adminFormData, fullName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-yellow"
                                    value={adminFormData.email}
                                    onChange={(e) => setAdminFormData({ ...adminFormData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Security Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-yellow"
                                    value={adminFormData.password}
                                    onChange={(e) => setAdminFormData({ ...adminFormData, password: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-yellow"
                                    value={adminFormData.phone}
                                    onChange={(e) => setAdminFormData({ ...adminFormData, phone: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="w-full bg-brand-yellow text-black font-black py-4 rounded-2xl hover:bg-yellow-400 transition transform active:scale-95 uppercase tracking-widest mt-4">
                                Initialize Admin
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ icon, title, value, color }) => {
    const colorClasses = {
        yellow: 'bg-brand-yellow/10 text-brand-yellow',
        green: 'bg-green-500/10 text-green-500',
        zinc: 'bg-zinc-500/10 text-zinc-400',
        blue: 'bg-blue-500/10 text-blue-400'
    };

    return (
        <div className="bg-brand-card p-6 rounded-3xl border border-white/5 hover:bg-white/5 transition group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${colorClasses[color]}`}>
                {React.cloneElement(icon, { size: 24 })}
            </div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{title}</p>
            <h3 className="text-2xl font-black text-white mt-1">{value || '0'}</h3>
        </div>
    );
};

const LogItem = ({ type, msg, time }) => {
    const iconColor = {
        success: 'text-green-500',
        warning: 'text-brand-yellow',
        error: 'text-red-500',
        info: 'text-blue-500'
    };

    return (
        <div className="flex items-start gap-4 p-4 hover:bg-white/5 rounded-2xl transition">
            <div className={`w-2 h-2 rounded-full mt-1.5 ${type === 'success' ? 'bg-green-500' : type === 'warning' ? 'bg-brand-yellow' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
            <div className="flex-1">
                <p className="text-sm font-medium text-white">{msg}</p>
                <span className="text-[10px] text-gray-500 flex items-center gap-1 mt-1 font-bold italic"><Clock size={10} /> {time}</span>
            </div>
        </div>
    );
};

export default AdminDashboard;
