const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Stock = require('../models/Stock');

// @desc    Get all stocks
// @route   GET /api/stocks
// @access  Private
exports.getStocks = asyncHandler(async (req, res, next) => {
    const stocks = await Stock.find();
    res.status(200).json({ success: true, data: stocks });
});

// @desc    Get single stock
// @route   GET /api/stocks/:symbol
// @access  Private
exports.getStock = asyncHandler(async (req, res, next) => {
    const stock = await Stock.findOne({ symbol: req.params.symbol.toUpperCase() });
    if (!stock) {
        return next(new ErrorResponse(`Stock not found with symbol ${req.params.symbol}`, 404));
    }
    res.status(200).json({ success: true, data: stock });
});

// @desc    Create a stock (Admin only)
// @route   POST /api/stocks
// @access  Private/Admin
exports.createStock = asyncHandler(async (req, res, next) => {
    const stock = await Stock.create(req.body);
    res.status(201).json({ success: true, data: stock });
});

// Simulation logic (could be moved to a service)
exports.simulateMarket = async () => {
    const stocks = await Stock.find();

    for (const stock of stocks) {
        const changePercent = (Math.random() * stock.volatility * 2) - stock.volatility;
        const newPrice = stock.currentPrice * (1 + changePercent);

        stock.lastPrice = stock.currentPrice;
        stock.currentPrice = parseFloat(newPrice.toFixed(2));
        await stock.save();
    }
};
