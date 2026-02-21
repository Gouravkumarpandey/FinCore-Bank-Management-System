const mongoose = require('mongoose');
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = asyncHandler(async (req, res, next) => {
    // Find account for user
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

    if (!amount || !recipientAccountNumber) {
        return next(new ErrorResponse('Please provide amount and recipient account', 400));
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const senderAccount = await Account.findOne({ userId: req.user.id }).session(session);
        if (!senderAccount) throw new ErrorResponse('Account not found', 404);
        if (senderAccount.status === 'frozen') throw new ErrorResponse('Account is frozen', 403);
        if (senderAccount.balance < parseFloat(amount)) throw new ErrorResponse('Insufficient funds', 400);

        const receiverAccount = await Account.findOne({ accountNumber: recipientAccountNumber }).session(session);
        if (!receiverAccount) throw new ErrorResponse('Recipient account not found', 404);

        if (senderAccount.accountNumber === receiverAccount.accountNumber) {
            throw new ErrorResponse('Cannot transfer to self', 400);
        }

        // Atomically update balances
        senderAccount.balance -= parseFloat(amount);
        receiverAccount.balance += parseFloat(amount);

        await senderAccount.save({ session });
        await receiverAccount.save({ session });

        // Generate Transaction ID
        const transactionId = 'TXN' + crypto.randomBytes(8).toString('hex').toUpperCase();

        const transaction = await Transaction.create([{
            transactionId,
            fromAccount: senderAccount._id,
            toAccount: receiverAccount._id,
            amount,
            transactionMode: 'BANK',
            type: 'transfer',
            status: 'success',
            description: description || `Transfer to ${recipientAccountNumber}`
        }], { session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ success: true, data: transaction[0] });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
});

// @desc    Deposit funds
// @route   POST /api/transactions/deposit
// @access  Private
exports.depositFunds = asyncHandler(async (req, res, next) => {
    const { amount } = req.body;

    const account = await Account.findOne({ userId: req.user.id });
    if (!account) return next(new ErrorResponse('Account not found', 404));

    account.balance += parseFloat(amount);
    await account.save();

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
    const { amount } = req.body;

    const account = await Account.findOne({ userId: req.user.id });
    if (!account) return next(new ErrorResponse('Account not found', 404));

    if (account.balance < parseFloat(amount)) {
        return next(new ErrorResponse('Insufficient funds', 400));
    }

    account.balance -= parseFloat(amount);
    await account.save();

    const transactionId = 'WDL' + crypto.randomBytes(8).toString('hex').toUpperCase();

    const transaction = await Transaction.create({
        transactionId,
        fromAccount: account._id,
        amount,
        transactionMode: 'BANK',
        type: 'withdraw',
        status: 'success',
        description: 'Atm Withdrawal'
    });

    res.status(200).json({ success: true, data: transaction });
});

// @desc    UPI Transfer
// @route   POST /api/transactions/upi-transfer
// @access  Private
exports.upiTransfer = asyncHandler(async (req, res, next) => {
    const { amount, receiverUpiId, upiPin, description } = req.body;

    if (!amount || !receiverUpiId) {
        return next(new ErrorResponse('Please provide amount and receiver UPI ID', 400));
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const senderAccount = await Account.findOne({ userId: req.user.id }).session(session);
        if (!senderAccount) throw new ErrorResponse('Account not found', 404);
        if (senderAccount.status === 'frozen') throw new ErrorResponse('Account is frozen', 403);
        if (senderAccount.balance < parseFloat(amount)) throw new ErrorResponse('Insufficient funds', 400);

        // Verification of UPI PIN would go here (omitted for simple demo but in a real app, hash and check)

        const receiverAccount = await Account.findOne({ upiId: receiverUpiId }).session(session);
        if (!receiverAccount) throw new ErrorResponse('Receiver UPI ID not found', 404);

        senderAccount.balance -= parseFloat(amount);
        receiverAccount.balance += parseFloat(amount);

        await senderAccount.save({ session });
        await receiverAccount.save({ session });

        const transactionId = 'UPI' + crypto.randomBytes(8).toString('hex').toUpperCase();

        const transaction = await Transaction.create([{
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
        }], { session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ success: true, data: transaction[0] });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
});
