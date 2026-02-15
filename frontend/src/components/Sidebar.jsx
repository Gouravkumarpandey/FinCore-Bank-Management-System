
import { useState } from 'react';
import { Home, List, Send, User, LogOut, LayoutDashboard, CreditCard, PieChart, TrendingUp, Settings, HelpCircle, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { isCollapsed, toggleSidebar } = useSidebar();

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
        { name: 'Cards', icon: CreditCard, path: '/cards' }, // Renamed from "Credit Cards" to fit better
        { name: 'Loans', icon: PieChart, path: '/loans' },
    ];

    const secondaryItems = [
        { name: 'Support', icon: HelpCircle, path: '/help' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ]

    return (
        <div
            className={`hidden md:flex flex-col h-screen bg-black border-r border-white/5 shadow-2xl fixed left-0 top-0 z-50 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}
        >
            {/* Header / Collapse Toggle */}
            <div className={`flex items-center h-24 border-b border-white/5 relative ${isCollapsed ? 'justify-center' : 'justify-start pl-6'}`}>
                <Link to="/" className="flex items-center group">
                    <Zap className={`text-brand-yellow transition-all ${isCollapsed ? 'h-8 w-8' : 'h-8 w-8 mr-3group-hover:scale-110'}`} />
                    {!isCollapsed && <span className="ml-3 text-2xl font-black text-white tracking-tight animate-fade-in">FinCore.</span>}
                </Link>

                <button
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-10 bg-brand-yellow text-black p-1 rounded-full shadow-lg hover:scale-110 transition z-50 border-2 border-black"
                >
                    {isCollapsed ? <ChevronRight size={14} strokeWidth={3} /> : <ChevronLeft size={14} strokeWidth={3} />}
                </button>
            </div>

            {/* Scrollable Content - scrollbar-hide usually implies custom class or standard tailwind utilities if configured */}
            <div className="flex-1 flex flex-col overflow-y-auto px-2 py-6 space-y-2 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {!isCollapsed && <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 animate-fade-in">Menu</p>}

                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`group flex items-center py-3 text-sm font-bold rounded-xl transition-all duration-200 relative ${isActive(item.path)
                                ? 'bg-brand-yellow text-black'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            } ${isCollapsed ? 'justify-center px-0 mx-2' : 'px-4 mx-2'}`}
                        title={isCollapsed ? item.name : ''}
                    >
                        <item.icon className={`transition-colors ${isCollapsed ? 'h-6 w-6' : 'h-5 w-5 mr-3'} ${isActive(item.path) ? 'text-black' : 'group-hover:text-brand-yellow text-gray-500'}`} />
                        {!isCollapsed && <span className="truncate">{item.name}</span>}

                        {/* Tooltip for collapsed state */}
                        {isCollapsed && (
                            <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                                {item.name}
                            </div>
                        )}
                    </Link>
                ))}

                <div className={`pt-6 pb-2 ${isCollapsed ? 'border-t border-white/5 mx-2 mt-4' : ''}`}>
                    {!isCollapsed && <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 animate-fade-in">Support</p>}
                    {secondaryItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`group flex items-center py-3 text-sm font-bold rounded-xl transition-all duration-200 relative ${isActive(item.path)
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                } ${isCollapsed ? 'justify-center px-0 mx-2' : 'px-4 mx-2'}`}
                            title={isCollapsed ? item.name : ''}
                        >
                            <item.icon className={`transition-colors ${isCollapsed ? 'h-6 w-6' : 'h-5 w-5 mr-3'} text-gray-500 group-hover:text-white`} />
                            {!isCollapsed && <span className="truncate">{item.name}</span>}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className={`flex items-center w-full py-3 text-sm font-bold text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-200 group ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}
                    title="Log Out"
                >
                    <LogOut className={`transition-transform ${isCollapsed ? 'h-6 w-6' : 'h-5 w-5 mr-3'} group-hover:-translate-x-1`} />
                    {!isCollapsed && <span>Log Out</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
