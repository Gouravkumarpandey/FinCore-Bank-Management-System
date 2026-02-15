import React from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import { Users, Activity, ShieldAlert, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            {/* In a real app, Sidebar would be different for Admin, or dynamic */}

            <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Admin Portal</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="flex items-center p-6 border-l-4 border-purple-500">
                        <div className="p-3 bg-purple-100 rounded-full mr-4">
                            <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Users</p>
                            <h3 className="text-2xl font-bold text-gray-900">1,234</h3>
                        </div>
                    </Card>

                    <Card className="flex items-center p-6 border-l-4 border-blue-500">
                        <div className="p-3 bg-blue-100 rounded-full mr-4">
                            <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Deposits</p>
                            <h3 className="text-2xl font-bold text-gray-900">$5.2M</h3>
                        </div>
                    </Card>

                    <Card className="flex items-center p-6 border-l-4 border-green-500">
                        <div className="p-3 bg-green-100 rounded-full mr-4">
                            <Activity className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Active Sessions</p>
                            <h3 className="text-2xl font-bold text-gray-900">56</h3>
                        </div>
                    </Card>

                    <Card className="flex items-center p-6 border-l-4 border-red-500">
                        <div className="p-3 bg-red-100 rounded-full mr-4">
                            <ShieldAlert className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Flagged Txns</p>
                            <h3 className="text-2xl font-bold text-gray-900">3</h3>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent User Signups</h3>
                        <ul className="divide-y divide-gray-200">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <li key={i} className="py-3 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-3">U{i}</div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">New User {i}</p>
                                            <p className="text-xs text-gray-500">user{i}@example.com</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">2 mins ago</span>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">System Alerts</h3>
                        <div className="space-y-4">
                            <div className="flex items-start p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                                <ShieldAlert className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-yellow-800">High Transaction Volume</p>
                                    <p className="text-xs text-yellow-600 mt-1">Unusual activity detected in Region A.</p>
                                </div>
                            </div>
                            <div className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <Activity className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-blue-800">Server Maintenance</p>
                                    <p className="text-xs text-blue-600 mt-1">Scheduled for 2:00 AM UTC.</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
