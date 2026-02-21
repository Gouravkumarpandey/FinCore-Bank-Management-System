const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Account = require('../models/Account');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const { fullName, email, password, phone, accountType, occupation } = req.body;

    // Create user
    const user = await User.create({
        fullName,
        email,
        password,
        phone,
        occupation
    });

    // Generate unique Account Number
    const accountNumber = '4582' + Math.floor(100000000000 + Math.random() * 900000000000);

    // Generate Virtual Card Details
    const cardNumber = '4582' + Math.floor(100000000000 + Math.random() * 900000000000);
    const cardCvv = Math.floor(100 + Math.random() * 900).toString();
    const now = new Date();
    const cardExpiry = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${(now.getFullYear() + 5).toString().slice(-2)}`;

    // Generate UPI ID (fullName@fincore)
    const upiId = fullName.toLowerCase().replace(/\s+/g, '') + Math.floor(100 + Math.random() * 900) + '@fincore';

    // Create default Account for user with selected type
    await Account.create({
        userId: user._id,
        accountNumber,
        upiId,
        accountType: accountType || 'savings',
        balance: 10000, // Sign up bonus
        cardNumber,
        cardCvv,
        cardExpiry,
        cardHolderName: fullName,
        cardTheme: 'default'
    });

    sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const account = await Account.findOne({ userId: req.user.id });

    res.status(200).json({
        success: true,
        data: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            phone: user.phone,
            occupation: user.occupation,
            isBlocked: user.isBlocked,
            account: account ? {
                accountNumber: account.accountNumber,
                accountType: account.accountType,
                balance: account.balance,
                upiId: account.upiId,
                status: account.status,
                dailyUpiLimit: account.dailyUpiLimit,
                cardNumber: account.cardNumber,
                cardExpiry: account.cardExpiry,
                cardCvv: account.cardCvv,
                cardTheme: account.cardTheme,
                cardHolderName: account.cardHolderName
            } : null
        }
    });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    const options = {
        expires: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
};
