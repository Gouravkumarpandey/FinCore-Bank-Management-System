const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    companyName: {
        type: String,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    lastPrice: {
        type: Number
    },
    volatility: {
        type: Number,
        default: 0.05 // 5% fluctuation
    },
    sector: {
        type: String,
        default: 'General'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Stock', StockSchema);
