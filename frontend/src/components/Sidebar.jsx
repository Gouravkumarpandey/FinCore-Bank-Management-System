import { useState } from 'react';
import { Home, List, Send, User, LogOut, LayoutDashboard, CreditCard, PieChart, TrendingUp, Settings, HelpCircle, Zap } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Transactions', icon: List, path: '/transactions' },
        { name: 'Accounts', icon: User, path: '/accounts' },
        { name: 'Investments', icon: TrendingUp, path: '/investments' },
        { name: 'Credit Cards', icon: CreditCard, path: '/cards' },
        { name: 'Loans', icon: PieChart, path: '/loans' },
    ];

    const secondaryItems = [
        { name: 'Get Help', icon: HelpCircle, path: '/help' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ]

    return (
        <div className="hidden md:flex flex-col h-screen w-64 bg-black border-r border-white/5 shadow-2xl fixed left-0 top-0 z-50">
            <div className="flex items-center justify-center h-24 border-b border-white/5">
                <Link to="/" className="flex items-center group">
                    <Zap className="h-8 w-8 text-brand-yellow group-hover:scale-110 transition-transform" />
                    <span className="ml-3 text-2xl font-black text-white tracking-tight">FinCore.</span>
                </Link>
            </div>

            <div className="flex-1 flex flex-col overflow-y-auto px-4 py-8 space-y-2">
                <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Menu</p>
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`group flex items-center px-4 py-3.5 text-sm font-bold rounded-2xl transition-all duration-300 ${isActive(item.path)
                            ? 'bg-brand-yellow text-black shadow-[0_0_15px_rgba(252,207,8,0.4)] transform scale-105'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white hover:pl-6'
                            }`}
                    >
                        <item.icon className={`h-5 w-5 mr-3 transition-colors ${isActive(item.path) ? 'text-black' : 'group-hover:text-brand-yellow text-gray-500'
                            }`} />
                        {item.name}
                    </Link>
                ))}

                <div className="pt-8 pb-2">
                    <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Support</p>
                    {secondaryItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`group flex items-center px-4 py-3.5 text-sm font-bold rounded-2xl transition-all duration-300 ${isActive(item.path)
                                ? 'bg-white/10 text-white'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white hover:pl-6'
                                }`}
                        >
                            <item.icon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white transition-colors" />
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="p-6 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-sm font-bold text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all duration-200 group"
                >
                    <LogOut className="h-5 w-5 mr-3 group-hover:-translate-x-1 transition-transform" />
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
