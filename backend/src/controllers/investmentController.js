const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Stock = require('../models/Stock');
const Portfolio = require('../models/Portfolio');
const InvestmentTransaction = require('../models/InvestmentTransaction');
const Account = require('../models/Account');

// @desc    Buy stock
// @route   POST /api/investments/buy
// @access  Private
exports.buyStock = asyncHandler(async (req, res, next) => {
    const { symbol, quantity } = req.body;
    const userId = req.user.id;

    if (!symbol || !quantity || quantity <= 0) {
        return next(new ErrorResponse('Please provide valid symbol and quantity', 400));
    }

    const stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
    if (!stock) {
        return next(new ErrorResponse('Stock not found', 404));
    }

    const totalCost = stock.currentPrice * Number(quantity);

    // 1. Atomically deduct from bank account (only if sufficient balance)
    const account = await Account.findOneAndUpdate(
        { userId, balance: { $gte: totalCost } },
        { $inc: { balance: -totalCost } },
        { new: true }
    );

    if (!account) {
        const check = await Account.findOne({ userId });
        if (!check) return next(new ErrorResponse('Bank account not found', 404));
        return next(new ErrorResponse(
            `Insufficient balance. Required: ₹${totalCost.toLocaleString()}, Available: ₹${check.balance.toLocaleString()}`,
            400
        ));
    }

    try {
        // 2. Upsert portfolio entry
        const existingPortfolio = await Portfolio.findOne({ userId, symbol: symbol.toUpperCase() });

        let portfolio;
        if (existingPortfolio) {
            const newQuantity = existingPortfolio.quantity + Number(quantity);
            const newTotalInvested = existingPortfolio.totalInvested + totalCost;
            portfolio = await Portfolio.findOneAndUpdate(
                { userId, symbol: symbol.toUpperCase() },
                {
                    quantity: newQuantity,
                    totalInvested: newTotalInvested,
                    averageBuyPrice: newTotalInvested / newQuantity,
                    updatedAt: Date.now()
                },
                { new: true }
            );
        } else {
            portfolio = await Portfolio.create({
                userId,
                symbol: symbol.toUpperCase(),
                quantity: Number(quantity),
                averageBuyPrice: stock.currentPrice,
                totalInvested: totalCost
            });
        }

        // 3. Log investment transaction
        await InvestmentTransaction.create({
            userId,
            symbol: symbol.toUpperCase(),
            type: 'BUY',
            quantity: Number(quantity),
            priceAtExecution: stock.currentPrice,
            totalAmount: totalCost
        });

        res.status(200).json({
            success: true,
            message: `Successfully purchased ${quantity} shares of ${symbol.toUpperCase()}`,
            data: portfolio
        });

    } catch (error) {
        // Rollback account deduction on failure
        await Account.findOneAndUpdate({ userId }, { $inc: { balance: totalCost } });
        return next(new ErrorResponse('Investment failed: ' + error.message, 500));
    }
});

// @desc    Sell stock
// @route   POST /api/investments/sell
// @access  Private
exports.sellStock = asyncHandler(async (req, res, next) => {
    const { symbol, quantity } = req.body;
    const userId = req.user.id;

    if (!symbol || !quantity || quantity <= 0) {
        return next(new ErrorResponse('Please provide valid symbol and quantity', 400));
    }

    const portfolio = await Portfolio.findOne({ userId, symbol: symbol.toUpperCase() });
    if (!portfolio || portfolio.quantity < Number(quantity)) {
        return next(new ErrorResponse('Insufficient shares in portfolio', 400));
    }

    const stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
    if (!stock) {
        return next(new ErrorResponse('Stock data not found', 404));
    }

    const totalCredit = stock.currentPrice * Number(quantity);

    // 1. Atomically credit bank account
    await Account.findOneAndUpdate(
        { userId },
        { $inc: { balance: totalCredit } }
    );

    try {
        // 2. Update or remove portfolio entry
        const newQuantity = portfolio.quantity - Number(quantity);
        const newTotalInvested = portfolio.totalInvested - (portfolio.averageBuyPrice * Number(quantity));

        let updatedPortfolio;
        if (newQuantity <= 0) {
            await Portfolio.deleteOne({ _id: portfolio._id });
            updatedPortfolio = null;
        } else {
            updatedPortfolio = await Portfolio.findOneAndUpdate(
                { userId, symbol: symbol.toUpperCase() },
                {
                    quantity: newQuantity,
                    totalInvested: Math.max(0, newTotalInvested),
                    updatedAt: Date.now()
                },
                { new: true }
            );
        }

        // 3. Log investment transaction
        await InvestmentTransaction.create({
            userId,
            symbol: symbol.toUpperCase(),
            type: 'SELL',
            quantity: Number(quantity),
            priceAtExecution: stock.currentPrice,
            totalAmount: totalCredit
        });

        res.status(200).json({
            success: true,
            message: `Successfully sold ${quantity} shares of ${symbol.toUpperCase()}`,
            data: updatedPortfolio
        });

    } catch (error) {
        // Rollback account credit on failure
        await Account.findOneAndUpdate({ userId }, { $inc: { balance: -totalCredit } });
        return next(new ErrorResponse('Sale failed: ' + error.message, 500));
    }
});

// @desc    Get user portfolio
// @route   GET /api/investments/portfolio
// @access  Private
exports.getPortfolio = asyncHandler(async (req, res, next) => {
    const portfolio = await Portfolio.find({ userId: req.user.id });

    const enrichedPortfolio = await Promise.all(portfolio.map(async (item) => {
        const stock = await Stock.findOne({ symbol: item.symbol });
        return {
            ...item._doc,
            currentPrice: stock ? stock.currentPrice : 0,
            currentValue: stock ? stock.currentPrice * item.quantity : 0,
            profit: stock ? (stock.currentPrice * item.quantity) - item.totalInvested : 0
        };
    }));

    res.status(200).json({ success: true, data: enrichedPortfolio });
});

// @desc    Get investment history
// @route   GET /api/investments/history
// @access  Private
exports.getHistory = asyncHandler(async (req, res, next) => {
    const history = await InvestmentTransaction.find({ userId: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, data: history });
});
