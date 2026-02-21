const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Account = require('../models/Account');

// @desc    Get all accounts (for a user)
// @route   GET /api/accounts
// @access  Private
exports.getAccounts = asyncHandler(async (req, res, next) => {
    const accounts = await Account.find({ userId: req.user.id });

    res.status(200).json({
        success: true,
        count: accounts.length,
        data: accounts
    });
});

// @desc    Get single account
// @route   GET /api/accounts/:id
// @access  Private
exports.getAccount = asyncHandler(async (req, res, next) => {
    const account = await Account.findById(req.params.id);

    if (!account) {
        return next(
            new ErrorResponse(`Account not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure user owns account
    if (account.userId.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User ${req.user.id} is not authorized to access this account`, 401)
        );
    }

    res.status(200).json({
        success: true,
        data: account
    });
});

// @desc    Create new account
// @route   POST /api/accounts
// @access  Private
exports.createAccount = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.userId = req.user.id;
    // Auto-generate account number
    req.body.accountNumber = '4582' + Math.floor(100000000000 + Math.random() * 900000000000);

    const account = await Account.create(req.body);

    res.status(201).json({
        success: true,
        data: account
    });
});

// @desc    Update card theme
// @route   PUT /api/accounts/card-theme
// @access  Private
exports.updateCardTheme = asyncHandler(async (req, res, next) => {
    const { theme } = req.body;

    if (!theme) {
        return next(new ErrorResponse('Please provide a theme', 400));
    }

    const account = await Account.findOneAndUpdate(
        { userId: req.user.id },
        { cardTheme: theme },
        { new: true, runValidators: true }
    );

    if (!account) {
        return next(new ErrorResponse('Account not found', 404));
    }

    res.status(200).json({
        success: true,
        data: account
    });
});
