
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./src/config/db');
const errorHandler = require('./src/middleware/error');

// Load env vars
dotenv.config();

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/accounts', require('./src/routes/accountRoutes'));
app.use('/api/transactions', require('./src/routes/transactionRoutes'));
app.use('/api/admin', require('./src/routes/adminRoutes'));
app.use('/api/stocks', require('./src/routes/stockRoutes'));
app.use('/api/investments', require('./src/routes/investmentRoutes'));

const { simulateMarket } = require('./src/controllers/stockController');
const Stock = require('./src/models/Stock');

const seedStocks = async () => {
    const stockCount = await Stock.countDocuments();
    if (stockCount === 0) {
        const stocks = [
            { symbol: 'FINC', companyName: 'FinCore Technologies', currentPrice: 500, volatility: 0.05, sector: 'FinTech' },
            { symbol: 'RELI', companyName: 'Reliance Industries', currentPrice: 2450, volatility: 0.02, sector: 'Energy' },
            { symbol: 'TCS', companyName: 'Tata Consultancy Services', currentPrice: 3500, volatility: 0.015, sector: 'IT Services' },
            { symbol: 'HDFC', companyName: 'HDFC Bank', currentPrice: 1600, volatility: 0.02, sector: 'Banking' },
            { symbol: 'ZOMA', companyName: 'Zomato Ltd', currentPrice: 120, volatility: 0.08, sector: 'Food Delivery' },
            { symbol: 'TATA', companyName: 'Tata Motors', currentPrice: 900, volatility: 0.04, sector: 'Automobile' },
            { symbol: 'ADAN', companyName: 'Adani Enterprises', currentPrice: 3200, volatility: 0.07, sector: 'Infrastructure' }
        ];
        await Stock.insertMany(stocks);
        console.log('Virtual Stocks Seeded! 📈');
    }
};

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to DB
const startServer = async () => {
    const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    await connectDB();
    await seedStocks();

    // Start Market Simulation every 60 seconds
    setInterval(() => {
        simulateMarket();
        console.log('Market price updated... 🔄');
    }, 60000);

    process.on('unhandledRejection', (err, promise) => {
        console.log(`Error: ${err.message}`);
        // Close server & exit process
        server.close(() => process.exit(1));
    });
};


startServer();

