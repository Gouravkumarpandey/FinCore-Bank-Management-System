
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { investmentService } from '../services/investmentService';
import {
    TrendingUp, TrendingDown, Wallet, Briefcase, History,
    ArrowUpRight, ArrowDownRight, DollarSign, Activity,
    Search, Filter, Plus, Minus, Info, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Investments = () => {
    const { user, refreshUser } = useAuth();
    const [stocks, setStocks] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('market'); // market, portfolio, history
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStock, setSelectedStock] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [transactionLoading, setTransactionLoading] = useState(false);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchStocks, 30000); // Update market every 30s
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            await Promise.all([fetchStocks(), fetchPortfolio(), fetchHistory()]);
        } catch (error) {
            console.error("Failed to fetch investment data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStocks = async () => {
        const data = await investmentService.getStocks();
        setStocks(data);
    };

    const fetchPortfolio = async () => {
        const data = await investmentService.getPortfolio();
        setPortfolio(data);
    };

    const fetchHistory = async () => {
        const data = await investmentService.getHistory();
        setHistory(data);
    };

    const handleTransaction = async (type) => {
        if (!selectedStock || quantity <= 0) return;
        setTransactionLoading(true);
        try {
            if (type === 'BUY') {
                await investmentService.buyStock(selectedStock.symbol, parseInt(quantity));
            } else {
                await investmentService.sellStock(selectedStock.symbol, parseInt(quantity));
            }
            setSelectedStock(null);
            setQuantity(1);
            fetchData(); // Refresh all data
            await refreshUser(); // Update bank balance in UI
            alert(`Successfully ${type === 'BUY' ? 'purchased' : 'sold'} shares!`);
        } catch (error) {
            alert(error.response?.data?.message || "Transaction failed");
        } finally {
            setTransactionLoading(false);
        }
    };

    const totalPortfolioValue = portfolio.reduce((acc, curr) => acc + curr.currentValue, 0);
    const totalInvested = portfolio.reduce((acc, curr) => acc + curr.totalInvested, 0);
    const totalProfit = totalPortfolioValue - totalInvested;

    const filteredStocks = stocks.filter(s =>
        s.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex bg-brand-dark min-h-screen text-gray-900 font-sans selection:bg-brand-yellow selection:text-white">
            <Sidebar />

            <div className="flex-1 md:ml-64 p-8 transition-all duration-300">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-brand-yellow text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Asset Growth</span>
                            <h1 className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter">Investment <span className="text-brand-yellow">Protocol</span></h1>
                        </div>
                        <p className="text-gray-500 text-sm italic">Simulated market data. Zero risk, maximum learning. 📈</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Available Balance</p>
                            <p className="text-xl font-black text-gray-900 tracking-tighter">₹{user?.account?.balance?.toLocaleString()}</p>
                        </div>
                        <div className="h-10 w-px bg-gray-100"></div>
                        <div className="flex items-center bg-white border border-gray-100 rounded-2xl px-4 py-2 shadow-sm">
                            <TrendingUp className="text-brand-yellow mr-3" size={20} />
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase">Market Status</p>
                                <p className="text-xs font-bold text-green-600 flex items-center gap-1">LIVE <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span></p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 bg-gray-50 p-1 rounded-2xl w-fit border border-gray-100">
                    {[
                        { id: 'market', label: 'Market Explorer', icon: <TrendingUp size={16} /> },
                        { id: 'portfolio', label: 'My Portfolio', icon: <Briefcase size={16} /> },
                        { id: 'history', label: 'Trade Ledger', icon: <History size={16} /> }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-brand-yellow text-white shadow-lg shadow-brand-yellow/20' : 'text-gray-500 hover:text-gray-900 hover:bg-white'
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-yellow"></div>
                    </div>
                ) : (
                    <>
                        {activeTab === 'market' && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="relative group">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-yellow transition-colors" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Search stock symbols or companies..."
                                            className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-yellow transition-all shadow-sm"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {filteredStocks.map(stock => {
                                            const isUp = stock.currentPrice >= (stock.lastPrice || stock.currentPrice);
                                            return (
                                                <div
                                                    key={stock.symbol}
                                                    onClick={() => setSelectedStock(stock)}
                                                    className={`bg-white border ${selectedStock?.symbol === stock.symbol ? 'border-brand-yellow ring-1 ring-brand-yellow/20' : 'border-gray-100 hover:border-gray-200'} p-6 rounded-3xl cursor-pointer transition-all group shadow-sm`}
                                                >
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="text-xl font-black text-gray-900">{stock.symbol}</h3>
                                                                <span className="text-[10px] bg-gray-50 text-gray-400 px-2 py-0.5 rounded uppercase font-bold">{stock.sector}</span>
                                                            </div>
                                                            <p className="text-sm text-gray-500 font-medium">{stock.companyName}</p>
                                                        </div>
                                                        <div className={`p-2 rounded-xl bg-gray-50 ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                                                            {isUp ? <ArrowUpRight /> : <ArrowDownRight />}
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-end">
                                                        <div>
                                                            <p className="text-xs text-gray-400 font-black uppercase mb-1">Current Price</p>
                                                            <p className="text-2xl font-black tracking-tighter text-gray-900">₹{stock.currentPrice.toLocaleString()}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className={`text-sm font-black ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                                                                {isUp ? '+' : ''}{((stock.currentPrice - (stock.lastPrice || stock.currentPrice)) / (stock.lastPrice || stock.currentPrice) * 100).toFixed(2)}%
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Buy/Sell Side Panel */}
                                <div className="lg:col-span-1">
                                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 sticky top-8 shadow-xl">
                                        {selectedStock ? (
                                            <>
                                                <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter text-gray-900">Trade Execution</h3>
                                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-6">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-gray-500 text-sm font-bold">{selectedStock.companyName}</span>
                                                        <span className="text-brand-yellow font-black text-xl tracking-tighter">{selectedStock.symbol}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="text-gray-400">Execution Price</span>
                                                        <span className="text-gray-900 font-bold">₹{selectedStock.currentPrice}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 mb-8">
                                                    <div>
                                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Quantity</label>
                                                        <div className="flex items-center bg-gray-50 rounded-2xl border border-gray-100 px-4">
                                                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 text-gray-400 hover:text-brand-yellow transition-colors"><Minus size={18} /></button>
                                                            <input
                                                                type="number"
                                                                className="w-full bg-transparent border-none text-center font-black text-xl focus:ring-0 py-4 text-gray-900"
                                                                value={quantity}
                                                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                                            />
                                                            <button onClick={() => setQuantity(quantity + 1)} className="p-4 text-gray-400 hover:text-brand-yellow transition-colors"><Plus size={18} /></button>
                                                        </div>
                                                    </div>

                                                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                                        <span className="text-xs text-gray-400 font-bold uppercase">Estimated Total</span>
                                                        <span className="text-xl font-black text-gray-900 tracking-tighter">₹{(selectedStock.currentPrice * quantity).toLocaleString()}</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <button
                                                        onClick={() => handleTransaction('BUY')}
                                                        disabled={transactionLoading || (selectedStock.currentPrice * quantity) > user?.account?.balance}
                                                        className="bg-brand-yellow text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition transform active:scale-95 uppercase tracking-widest text-xs shadow-lg shadow-brand-yellow/30 disabled:opacity-50"
                                                    >
                                                        {transactionLoading ? '...' : 'Open Long'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleTransaction('SELL')}
                                                        disabled={transactionLoading}
                                                        className="bg-red-50 text-red-600 font-black py-4 rounded-2xl hover:bg-red-100 transition transform active:scale-95 uppercase tracking-widest text-xs border border-red-100 disabled:opacity-50"
                                                    >
                                                        {transactionLoading ? '...' : 'Exit Position'}
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center py-20 px-4">
                                                <Activity className="w-12 h-12 text-gray-200 mx-auto mb-4 animate-pulse" />
                                                <h3 className="text-xl font-black text-gray-300 uppercase italic">Select terminal</h3>
                                                <p className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-widest">Select a stock to initialize trading protocol</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'portfolio' && (
                            <div className="space-y-8">
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Value</p>
                                        <h3 className="text-2xl font-black tracking-tighter text-gray-900">₹{totalPortfolioValue.toLocaleString()}</h3>
                                        <div className="flex items-center gap-2 mt-4 text-xs font-bold text-gray-500">
                                            <Wallet size={14} className="text-brand-yellow" /> Net Worth in Shares
                                        </div>
                                    </div>
                                    <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Invested</p>
                                        <h3 className="text-2xl font-black tracking-tighter text-gray-900">₹{totalInvested.toLocaleString()}</h3>
                                        <div className="flex items-center gap-2 mt-4 text-xs font-bold text-gray-500">
                                            <ArrowDownRight size={14} className="text-red-500" /> Capital Deployed
                                        </div>
                                    </div>
                                    <div className={`bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm ${totalProfit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total P&L</p>
                                        <h3 className={`text-2xl font-black tracking-tighter ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            ₹{totalProfit.toLocaleString()} ({totalInvested > 0 ? (totalProfit / totalInvested * 100).toFixed(2) : 0}%)
                                        </h3>
                                        <div className="flex items-center gap-2 mt-4 text-xs font-bold text-gray-500">
                                            {totalProfit >= 0 ? <TrendingUp size={14} className="text-green-600" /> : <TrendingDown size={14} className="text-red-600" />}
                                            Current Realized Gains
                                        </div>
                                    </div>
                                </div>

                                {/* Holding Table */}
                                <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                        <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900">Your Holdings</h3>
                                        <span className="text-[10px] font-black text-gray-400 uppercase bg-white px-3 py-1 rounded-full border border-gray-100">{portfolio.length} Positions</span>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-white/5 text-[10px] uppercase font-black tracking-widest text-gray-600 bg-white/[0.01]">
                                                    <th className="px-8 py-5">Stock</th>
                                                    <th className="px-8 py-5">Qty</th>
                                                    <th className="px-8 py-5">Avg Price</th>
                                                    <th className="px-8 py-5">LTP</th>
                                                    <th className="px-8 py-5">Value</th>
                                                    <th className="px-8 py-5">P&L</th>
                                                    <th className="px-8 py-5 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {portfolio.map(item => (
                                                    <tr key={item.symbol} className="hover:bg-brand-yellow/[0.02] transition-colors group">
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center font-black text-blue-600 border border-blue-100">
                                                                    {item.symbol.substring(0, 2)}
                                                                </div>
                                                                <div className="font-black tracking-tight text-gray-900">{item.symbol}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6 font-bold text-gray-700">{item.quantity}</td>
                                                        <td className="px-8 py-6 text-gray-400 font-medium">₹{item.averageBuyPrice.toFixed(2)}</td>
                                                        <td className="px-8 py-6 font-bold text-gray-900">₹{item.currentPrice.toFixed(2)}</td>
                                                        <td className="px-8 py-6 font-black tracking-tighter text-gray-900">₹{item.currentValue.toLocaleString()}</td>
                                                        <td className={`px-8 py-6 font-bold ${item.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            ₹{item.profit.toLocaleString()}
                                                        </td>
                                                        <td className="px-8 py-6 text-right">
                                                            <button
                                                                onClick={() => { setActiveTab('market'); setSelectedStock(stocks.find(s => s.symbol === item.symbol)); }}
                                                                className="text-gray-500 hover:text-brand-yellow transition font-black text-[10px] uppercase tracking-widest"
                                                            >
                                                                Manage
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {portfolio.length === 0 && (
                                                    <tr>
                                                        <td colSpan="7" className="px-8 py-20 text-center">
                                                            <Briefcase className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                                            <p className="text-gray-400 font-black uppercase italic">Portfolio empty</p>
                                                            <button onClick={() => setActiveTab('market')} className="text-brand-yellow text-xs font-bold uppercase mt-2 hover:text-blue-700 transition tracking-widest">DEPLOY CAPITAL NOW</button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                    <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900">Execution Ledger</h3>
                                    <History className="text-gray-400" size={24} />
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-100 text-[10px] uppercase font-black tracking-widest text-gray-400 bg-gray-50">
                                                <th className="px-8 py-5">Date</th>
                                                <th className="px-8 py-5">Stock</th>
                                                <th className="px-8 py-5">Type</th>
                                                <th className="px-8 py-5">Qty</th>
                                                <th className="px-8 py-5">Price</th>
                                                <th className="px-8 py-5 text-right">Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {history.map(tx => (
                                                <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-8 py-6 text-gray-500 font-medium text-xs">
                                                        {new Date(tx.createdAt).toLocaleString()}
                                                    </td>
                                                    <td className="px-8 py-6 font-black tracking-tight text-gray-900">{tx.symbol}</td>
                                                    <td className="px-8 py-6">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${tx.type === 'BUY' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                                                            }`}>
                                                            {tx.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 font-bold text-gray-700">{tx.quantity}</td>
                                                    <td className="px-8 py-6 font-bold text-gray-400">₹{tx.priceAtExecution.toLocaleString()}</td>
                                                    <td className="px-8 py-6 text-right font-black tracking-tighter text-gray-900">₹{tx.totalAmount.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                            {history.length === 0 && (
                                                <tr>
                                                    <td colSpan="6" className="px-8 py-20 text-center">
                                                        <Activity className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                                        <p className="text-gray-400 font-black uppercase italic">No history recorded</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Investments;
