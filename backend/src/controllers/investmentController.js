const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Stock = require('../models/Stock');
const Portfolio = require('../models/Portfolio');
const InvestmentTransaction = require('../models/InvestmentTransaction');
const Account = require('../models/Account');
const mongoose = require('mongoose');

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

    const totalCost = stock.currentPrice * quantity;

    // Check user's bank balance
    const account = await Account.findOne({ userId });
    if (!account) {
        return next(new ErrorResponse('Bank account not found', 404));
    }

    if (account.balance < totalCost) {
        return next(new ErrorResponse(`Insufficient balance. Required: ₹${totalCost.toLocaleString()}, Available: ₹${account.balance.toLocaleString()}`, 400));
    }

    // Start a session for atomicity
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // 1. Deduct from bank account
        account.balance -= totalCost;
        await account.save({ session });

        // 2. Add to or update portfolio
        let portfolio = await Portfolio.findOne({ userId, symbol: symbol.toUpperCase() });

        if (portfolio) {
            const newTotalInvested = portfolio.totalInvested + totalCost;
            const newQuantity = portfolio.quantity + quantity;
            portfolio.averageBuyPrice = newTotalInvested / newQuantity;
            portfolio.quantity = newQuantity;
            portfolio.totalInvested = newTotalInvested;
            portfolio.updatedAt = Date.now();
        } else {
            portfolio = new Portfolio({
                userId,
                symbol: symbol.toUpperCase(),
                quantity,
                averageBuyPrice: stock.currentPrice,
                totalInvested: totalCost
            });
        }
        await portfolio.save({ session });

        // 3. Log transaction
        await InvestmentTransaction.create([{
            userId,
            symbol: symbol.toUpperCase(),
            type: 'BUY',
            quantity,
            priceAtExecution: stock.currentPrice,
            totalAmount: totalCost
        }], { session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: `Successfully purchased ${quantity} shares of ${symbol}`,
            data: portfolio
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
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
    if (!portfolio || portfolio.quantity < quantity) {
        return next(new ErrorResponse('Insufficient shares in portfolio', 400));
    }

    const stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
    if (!stock) {
        return next(new ErrorResponse('Stock data mismatch', 404));
    }

    const totalCredit = stock.currentPrice * quantity;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // 1. Add to bank account
        const account = await Account.findOne({ userId });
        account.balance += totalCredit;
        await account.save({ session });

        // 2. Update portfolio
        portfolio.quantity -= quantity;
        portfolio.totalInvested -= (portfolio.averageBuyPrice * quantity);

        if (portfolio.quantity === 0) {
            await Portfolio.deleteOne({ _id: portfolio._id }, { session });
        } else {
            portfolio.updatedAt = Date.now();
            await portfolio.save({ session });
        }

        // 3. Log transaction
        await InvestmentTransaction.create([{
            userId,
            symbol: symbol.toUpperCase(),
            type: 'SELL',
            quantity,
            priceAtExecution: stock.currentPrice,
            totalAmount: totalCredit
        }], { session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: `Successfully sold ${quantity} shares of ${symbol}`,
            data: portfolio.quantity > 0 ? portfolio : null
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return next(new ErrorResponse('Sale failed: ' + error.message, 500));
    }
});

// @desc    Get user portfolio
// @route   GET /api/investments/portfolio
// @access  Private
exports.getPortfolio = asyncHandler(async (req, res, next) => {
    const portfolio = await Portfolio.find({ userId: req.user.id });

    // Enrich with current prices
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
