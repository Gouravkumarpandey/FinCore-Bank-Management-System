const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = asyncHandler(async (req, res, next) => {
    const account = await Account.findOne({ userId: req.user.id });

    if (!account) {
        return next(new ErrorResponse('Account not found', 404));
    }

    const transactions = await Transaction.find({
        $or: [
            { fromAccount: account._id },
            { toAccount: account._id }
        ]
    }).sort('-createdAt');

    res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions
    });
});

// @desc    Transfer funds (BANK mode)
// @route   POST /api/transactions/transfer
// @access  Private
exports.transferFunds = asyncHandler(async (req, res, next) => {
    const { amount, recipientAccountNumber, description } = req.body;
    const transferAmount = parseFloat(amount);

    if (!transferAmount || isNaN(transferAmount) || transferAmount <= 0) {
        return next(new ErrorResponse('Please provide a valid amount', 400));
    }
    if (!recipientAccountNumber) {
        return next(new ErrorResponse('Please provide recipient account number', 400));
    }

    // Atomically deduct from sender (only if sufficient balance)
    const senderAccount = await Account.findOneAndUpdate(
        {
            userId: req.user.id,
            balance: { $gte: transferAmount },
            status: { $ne: 'frozen' }
        },
        { $inc: { balance: -transferAmount } },
        { new: true }
    );

    if (!senderAccount) {
        // Check why it failed
        const check = await Account.findOne({ userId: req.user.id });
        if (!check) return next(new ErrorResponse('Account not found', 404));
        if (check.status === 'frozen') return next(new ErrorResponse('Account is frozen', 403));
        return next(new ErrorResponse('Insufficient funds', 400));
    }

    if (senderAccount.accountNumber === recipientAccountNumber) {
        // Rollback
        await Account.findOneAndUpdate({ userId: req.user.id }, { $inc: { balance: transferAmount } });
        return next(new ErrorResponse('Cannot transfer to yourself', 400));
    }

    // Credit receiver
    const receiverAccount = await Account.findOneAndUpdate(
        { accountNumber: recipientAccountNumber },
        { $inc: { balance: transferAmount } },
        { new: true }
    );

    if (!receiverAccount) {
        // Rollback sender deduction
        await Account.findOneAndUpdate({ userId: req.user.id }, { $inc: { balance: transferAmount } });
        return next(new ErrorResponse('Recipient account not found', 404));
    }

    const transactionId = 'TXN' + crypto.randomBytes(8).toString('hex').toUpperCase();

    const transaction = await Transaction.create({
        transactionId,
        fromAccount: senderAccount._id,
        toAccount: receiverAccount._id,
        amount: transferAmount,
        transactionMode: 'BANK',
        type: 'transfer',
        status: 'success',
        description: description || `Transfer to ${recipientAccountNumber}`
    });

    res.status(200).json({ success: true, data: transaction });
});

// @desc    Deposit funds
// @route   POST /api/transactions/deposit
// @access  Private
exports.depositFunds = asyncHandler(async (req, res, next) => {
    const amount = parseFloat(req.body.amount);

    if (isNaN(amount) || amount <= 0) {
        return next(new ErrorResponse('Please provide a valid deposit amount', 400));
    }

    // Atomically add to balance
    const account = await Account.findOneAndUpdate(
        { userId: req.user.id },
        { $inc: { balance: amount } },
        { new: true }
    );

    if (!account) {
        return next(new ErrorResponse('Account not found', 404));
    }

    const transactionId = 'DEP' + crypto.randomBytes(8).toString('hex').toUpperCase();

    const transaction = await Transaction.create({
        transactionId,
        toAccount: account._id,
        amount,
        transactionMode: 'BANK',
        type: 'deposit',
        status: 'success',
        description: 'Cash Deposit'
    });

    res.status(200).json({ success: true, data: transaction });
});

// @desc    Withdraw funds
// @route   POST /api/transactions/withdraw
// @access  Private
exports.withdrawFunds = asyncHandler(async (req, res, next) => {
    const amount = parseFloat(req.body.amount);

    if (isNaN(amount) || amount <= 0) {
        return next(new ErrorResponse('Please provide a valid withdrawal amount', 400));
    }

    // Atomically deduct (only if balance sufficient)
    const account = await Account.findOneAndUpdate(
        {
            userId: req.user.id,
            balance: { $gte: amount }
        },
        { $inc: { balance: -amount } },
        { new: true }
    );

    if (!account) {
        const check = await Account.findOne({ userId: req.user.id });
        if (!check) return next(new ErrorResponse('Account not found', 404));
        return next(new ErrorResponse('Insufficient funds', 400));
    }

    const transactionId = 'WTH' + crypto.randomBytes(8).toString('hex').toUpperCase();

    const transaction = await Transaction.create({
        transactionId,
        fromAccount: account._id,
        amount,
        transactionMode: 'BANK',
        type: 'withdraw',
        status: 'success',
        description: 'Cash Withdrawal'
    });

    res.status(200).json({ success: true, data: transaction });
});

// @desc    UPI Transfer
// @route   POST /api/transactions/upi-transfer
// @access  Private
exports.upiTransfer = asyncHandler(async (req, res, next) => {
    const { receiverUpiId, upiPin, description } = req.body;
    const amount = parseFloat(req.body.amount);

    if (!amount || isNaN(amount) || amount <= 0) {
        return next(new ErrorResponse('Please provide a valid amount', 400));
    }
    if (!receiverUpiId) {
        return next(new ErrorResponse('Please provide receiver UPI ID', 400));
    }

    // Atomically deduct from sender
    const senderAccount = await Account.findOneAndUpdate(
        {
            userId: req.user.id,
            balance: { $gte: amount },
            status: { $ne: 'frozen' }
        },
        { $inc: { balance: -amount } },
        { new: true }
    );

    if (!senderAccount) {
        const check = await Account.findOne({ userId: req.user.id });
        if (!check) return next(new ErrorResponse('Account not found', 404));
        if (check.status === 'frozen') return next(new ErrorResponse('Account is frozen', 403));
        return next(new ErrorResponse('Insufficient funds', 400));
    }

    if (senderAccount.upiId === receiverUpiId) {
        await Account.findOneAndUpdate({ userId: req.user.id }, { $inc: { balance: amount } });
        return next(new ErrorResponse('Cannot transfer to your own UPI ID', 400));
    }

    // Credit receiver
    const receiverAccount = await Account.findOneAndUpdate(
        { upiId: receiverUpiId },
        { $inc: { balance: amount } },
        { new: true }
    );

    if (!receiverAccount) {
        // Rollback
        await Account.findOneAndUpdate({ userId: req.user.id }, { $inc: { balance: amount } });
        return next(new ErrorResponse('Receiver UPI ID not found', 404));
    }

    const transactionId = 'UPI' + crypto.randomBytes(8).toString('hex').toUpperCase();

    const transaction = await Transaction.create({
        transactionId,
        fromAccount: senderAccount._id,
        toAccount: receiverAccount._id,
        amount,
        transactionMode: 'UPI',
        type: 'transfer',
        upiDetails: {
            senderUpi: senderAccount.upiId,
            receiverUpi: receiverUpiId
        },
        status: 'success',
        description: description || `UPI Transfer to ${receiverUpiId}`
    });

    res.status(200).json({ success: true, data: transaction });
});
