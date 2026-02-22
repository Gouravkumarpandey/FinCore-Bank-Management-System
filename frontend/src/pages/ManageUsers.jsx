import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import { Search, MoreVertical, UserCheck, UserX, User } from 'lucide-react';

const ManageUsers = () => {
    const [users] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'User' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', role: 'User' },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', status: 'Suspended', role: 'User' },
        { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Active', role: 'Admin' },
        { id: 5, name: 'Michael Wilson', email: 'michael@example.com', status: 'Pending', role: 'User' },
    ]);

    return (
        <div className="flex bg-brand-dark min-h-screen text-gray-900 font-sans selection:bg-brand-yellow selection:text-white">
            <Sidebar />
            <div className="flex-1 md:ml-64 p-8 transition-all duration-300">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900">Manage Users</h2>
                        <p className="text-gray-500 text-sm">Monitor and control user access.</p>
                    </div>
                    <button className="bg-brand-yellow text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition font-black uppercase tracking-widest text-xs shadow-lg shadow-brand-yellow/20 active:scale-95">
                        Add User
                    </button>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all font-medium text-sm"
                                placeholder="Search by name or email..."
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-gray-50 bg-gray-50/30">
                                    <th className="px-8 py-6 font-black">User Identity</th>
                                    <th className="px-8 py-6 font-black">Role</th>
                                    <th className="px-8 py-6 font-black">Access Status</th>
                                    <th className="px-8 py-6 font-black text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition">
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    <div className="h-12 w-12 rounded-2xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow font-black text-lg">
                                                        {user.name[0]}
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-black text-gray-900 group-hover:text-brand-yellow transition">{user.name}</div>
                                                    <div className="text-xs text-gray-400 font-bold">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div className="text-xs font-black text-gray-500 uppercase tracking-widest bg-gray-100 inline-block px-3 py-1 rounded-lg">{user.role}</div>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-[10px] font-black rounded-lg border uppercase tracking-widest ${user.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' :
                                                user.status === 'Suspended' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-gray-400 hover:text-gray-900 transition p-2 hover:bg-gray-50 rounded-xl">
                                                <MoreVertical className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
