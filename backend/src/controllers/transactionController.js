
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const { Op } = require('sequelize');
const { sequelize } = require('../config/db');

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = asyncHandler(async (req, res, next) => {
    // Find account for user
    const account = await Account.findOne({ where: { userId: req.user.id } });

    if (!account) {
        return next(new ErrorResponse('Account not found', 404));
    }

    const transactions = await Transaction.findAll({
        where: {
            [Op.or]: [
                { accountId: account.id },
                { recipientAccount: account.accountNumber }
            ]
        },
        order: [['date', 'DESC']]
    });

    res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions
    });
});

// @desc    Transfer funds
// @route   POST /api/transactions/transfer
// @access  Private
exports.transferFunds = asyncHandler(async (req, res, next) => {
    const { amount, recipientAccountNumber, description } = req.body;

    // Validate
    if (!amount || !recipientAccountNumber) {
        return next(new ErrorResponse('Please provide amount and recipient account', 400));
    }

    // Start a proper database transaction
    const t = await sequelize.transaction();

    try {
        // Get Sender Account
        const senderAccount = await Account.findOne({ where: { userId: req.user.id }, transaction: t });
        if (!senderAccount) {
            throw new ErrorResponse('Sender account not found', 404);
        }

        // Check Balance
        if (parseFloat(senderAccount.balance) < parseFloat(amount)) {
            throw new ErrorResponse('Insufficient funds', 400);
        }

        // Get Recipient Account
        const recipientAccount = await Account.findOne({ where: { accountNumber: recipientAccountNumber }, transaction: t });
        if (!recipientAccount) {
            throw new ErrorResponse('Recipient account not found', 404);
        }

        if (senderAccount.accountNumber === recipientAccount.accountNumber) {
            throw new ErrorResponse('Cannot transfer to self', 400);
        }

        // Perform Transfer
        const newSenderBalance = parseFloat(senderAccount.balance) - parseFloat(amount);
        const newRecipientBalance = parseFloat(recipientAccount.balance) + parseFloat(amount);

        await senderAccount.update({ balance: newSenderBalance }, { transaction: t });
        await recipientAccount.update({ balance: newRecipientBalance }, { transaction: t });

        // Create Transaction Record
        const transaction = await Transaction.create({
            accountId: senderAccount.id,
            type: 'Transfer',
            amount,
            recipientAccount: recipientAccountNumber,
            description: description || 'Transfer',
            status: 'Completed'
        }, { transaction: t });

        // Commit the transaction
        await t.commit();

        res.status(200).json({
            success: true,
            data: transaction
        });

    } catch (error) {
        // Rollback on error
        await t.rollback();
        return next(error);
    }
});

// @desc    Deposit funds (Mock)
// @route   POST /api/transactions/deposit
// @access  Private
exports.depositFunds = asyncHandler(async (req, res, next) => {
    const { amount } = req.body;

    const account = await Account.findOne({ where: { userId: req.user.id } });
    if (!account) {
        return next(new ErrorResponse('Account not found', 404));
    }

    const newBalance = parseFloat(account.balance) + parseFloat(amount);
    await account.update({ balance: newBalance });

    const transaction = await Transaction.create({
        accountId: account.id,
        type: 'Deposit',
        amount,
        description: 'Cash Deposit',
        status: 'Completed'
    });

    res.status(200).json({
        success: true,
        data: transaction
    });
});

// @desc    Withdraw funds (Mock)
// @route   POST /api/transactions/withdraw
// @access  Private
exports.withdrawFunds = asyncHandler(async (req, res, next) => {
    const { amount } = req.body;

    const account = await Account.findOne({ where: { userId: req.user.id } });
    if (!account) {
        return next(new ErrorResponse('Account not found', 404));
    }

    if (parseFloat(account.balance) < parseFloat(amount)) {
        return next(new ErrorResponse('Insufficient funds', 400));
    }

    const newBalance = parseFloat(account.balance) - parseFloat(amount);
    await account.update({ balance: newBalance });

    const transaction = await Transaction.create({
        accountId: account.id,
        type: 'Withdrawal',
        amount,
        description: 'ATM Withdrawal',
        status: 'Completed'
    });

    res.status(200).json({
        success: true,
        data: transaction
    });
});
