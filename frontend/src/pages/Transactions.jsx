
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bankService } from '../services/bankService';
import Sidebar from '../components/Sidebar';
import { Search, Calendar, Filter, ArrowUpRight, ArrowDownLeft, Download } from 'lucide-react';

const Transactions = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState('All'); // All, Income, Expense

    useEffect(() => {
        const fetchTransactions = async () => {
            if (user) {
                const txs = await bankService.getTransactions();
                setTransactions(txs);
            }
        };
        fetchTransactions();
    }, [user]);

    const filteredTransactions = transactions.filter(tx => {
        const matchesSearch = (tx.description?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            tx.amount?.toString().includes(searchTerm);

        const isIncome = ['deposit'].includes(tx.type) || (tx.type === 'transfer' && String(tx.toAccount) === String(user?.account?._id));
        const isExpense = ['withdraw'].includes(tx.type) || (tx.type === 'transfer' && String(tx.fromAccount) === String(user?.account?._id));

        let matchesFilter = true;
        if (filterType === 'Income') matchesFilter = isIncome;
        if (filterType === 'Expense') matchesFilter = isExpense;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="flex bg-black min-h-screen text-white font-sans selection:bg-brand-yellow selection:text-black">
            <Sidebar />
            <div className="flex-1 md:ml-64 p-8 transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
                    <div>
                        <h2 className="text-3xl font-black text-white">Transactions History</h2>
                        <p className="text-gray-400 text-sm">Track your financial journey.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            className="flex items-center px-4 py-2 border border-white/10 rounded-xl text-sm font-bold text-gray-300 hover:bg-white/10 hover:text-white transition"
                        >
                            <Download className="mr-2 h-4 w-4" /> Export CSV
                        </button>
                    </div>
                </div>

                <div className="bg-brand-card rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-12 pr-4 py-3 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all font-medium text-sm"
                                placeholder="Search by description or amount..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex space-x-2 w-full md:w-auto overflow-x-auto">
                            {['All', 'Income', 'Expense'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filterType === type
                                        ? 'bg-brand-yellow text-black'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-gray-500 text-xs uppercase tracking-wider border-b border-white/10 bg-white/5">
                                    <th className="px-6 py-4 font-bold">Description</th>
                                    <th className="px-6 py-4 font-bold">Date</th>
                                    <th className="px-6 py-4 font-bold">Type</th>
                                    <th className="px-6 py-4 font-bold">Status</th>
                                    <th className="px-6 py-4 font-bold text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredTransactions.length > 0 ? filteredTransactions.map((tx) => {
                                    const isIncome = ['deposit'].includes(tx.type) || (tx.type === 'transfer' && String(tx.toAccount) === String(user?.account?._id));

                                    return (
                                        <tr key={tx.transactionId} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className={`p-2 rounded-full mr-3 ${isIncome ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                        {isIncome ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                                                    </div>
                                                    <div className="text-sm font-bold text-white group-hover:text-brand-yellow transition">{tx.description}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                {new Date(tx.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-400 font-medium uppercase">{tx.type} | {tx.transactionMode}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-lg border uppercase ${tx.status === 'success' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                                                    {tx.status}
                                                </span>
                                            </td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-bold ${isIncome ? 'text-green-400' : 'text-white'}`}>
                                                {isIncome ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium">
                                            No transactions found using current filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-white/5 bg-white/5 flex justify-between items-center text-xs text-gray-500 uppercase font-bold tracking-wider">
                        <span>Showing {filteredTransactions.length} Transactions</span>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 rounded-lg hover:bg-white/10 hover:text-white transition disabled:opacity-50" disabled>Prev</button>
                            <button className="px-3 py-1 rounded-lg hover:bg-white/10 hover:text-white transition disabled:opacity-50" disabled>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
