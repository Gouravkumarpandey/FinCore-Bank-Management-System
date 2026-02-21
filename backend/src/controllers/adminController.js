
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
});

// @desc    Block or Unblock user
// @route   PUT /api/admin/users/:id/block
// @access  Private/Admin
exports.toggleBlockUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    if (user.role === 'admin') {
        return next(new ErrorResponse('Cannot block an admin user', 400));
    }

    user.isBlocked = !user.isBlocked;
    user.updatedAt = Date.now();
    await user.save();

    res.status(200).json({ success: true, data: user });
});

// @desc    Get all accounts
// @route   GET /api/admin/accounts
// @access  Private/Admin
exports.getAccounts = asyncHandler(async (req, res, next) => {
    const accounts = await Account.find().populate('userId', 'fullName email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: accounts.length, data: accounts });
});

// @desc    Freeze or Unfreeze account
// @route   PUT /api/admin/accounts/:id/freeze
// @access  Private/Admin
exports.toggleFreezeAccount = asyncHandler(async (req, res, next) => {
    const account = await Account.findById(req.params.id);

    if (!account) {
        return next(new ErrorResponse(`Account not found with id of ${req.params.id}`, 404));
    }

    account.status = account.status === 'frozen' ? 'active' : 'frozen';
    await account.save();

    res.status(200).json({ success: true, data: account });
});

// @desc    Get all transactions
// @route   GET /api/admin/transactions
// @access  Private/Admin
exports.getAllTransactions = asyncHandler(async (req, res, next) => {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: transactions.length, data: transactions });
});

// @desc    Get admin analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
exports.getAnalytics = asyncHandler(async (req, res, next) => {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalAccounts = await Account.countDocuments();
    const totalTransactions = await Transaction.countDocuments();

    // Total balance in the system
    const totalBalanceResult = await Account.aggregate([
        { $group: { _id: null, total: { $sum: "$balance" } } }
    ]);
    const totalBalance = totalBalanceResult.length > 0 ? totalBalanceResult[0].total : 0;

    // Transaction volume (sum of all successes)
    const transactionVolumeResult = await Transaction.aggregate([
        { $match: { status: 'success' } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalVolume = transactionVolumeResult.length > 0 ? transactionVolumeResult[0].total : 0;

    res.status(200).json({
        success: true,
        data: {
            totalUsers,
            totalAccounts,
            totalTransactions,
            totalBalance,
            totalVolume
        }
    });
});

// @desc    Create an admin user
// @route   POST /api/admin/create
// @access  Private/Admin
exports.createAdmin = asyncHandler(async (req, res, next) => {
    const { fullName, email, password, phone } = req.body;

    const user = await User.create({
        fullName,
        email,
        password,
        phone,
        role: 'admin'
    });

    res.status(201).json({ success: true, data: user });
});
