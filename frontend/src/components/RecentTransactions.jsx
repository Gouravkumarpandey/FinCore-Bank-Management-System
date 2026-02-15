import { ArrowRight, ShoppingBag, DollarSign, Wallet } from 'lucide-react';

const RecentTransactions = ({ transactions }) => {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Transactions</h3>
                <button className="text-sm font-bold text-brand-yellow hover:text-white flex items-center transition-colors">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                </button>
            </div>

            <div className="space-y-4">
                {transactions.slice(0, 5).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group border border-white/5">
                        <div className="flex items-center">
                            <div className={`p-3 rounded-full mr-4 ${tx.category === 'Shopping' ? 'bg-orange-500/20 text-orange-500' :
                                    tx.category === 'Food' ? 'bg-red-500/20 text-red-500' :
                                        tx.category === 'Income' ? 'bg-green-500/20 text-green-500' :
                                            'bg-blue-500/20 text-blue-500'
                                }`}>
                                {tx.category === 'Shopping' ? <ShoppingBag className="h-5 w-5" /> :
                                    tx.category === 'Income' ? <DollarSign className="h-5 w-5" /> :
                                        <Wallet className="h-5 w-5" />}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white group-hover:text-brand-yellow transition">{tx.description}</h4>
                                <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className={`text-right font-bold ${tx.type === 'Income' ? 'text-green-500' : 'text-white'
                            }`}>
                            {tx.type === 'Income' ? '+' : '-'}₹{Math.abs(tx.amount).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
