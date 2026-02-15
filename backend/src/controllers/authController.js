
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Account = require('../models/Account');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Create user
    const user = await User.create({
        name,
        email,
        password
    });

    // Create default Savings Account for user
    const accountNumber = '4582' + Math.floor(100000000000 + Math.random() * 900000000000);
    await Account.create({
        userId: user.id,
        accountNumber,
        accountType: 'Savings',
        balance: 10000 // Sign up bonus
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
    // In Sequelize, findOne returns the instance with password field if it's not excluded by default scope (User model doesn't exclude it here)
    const user = await User.findOne({ where: { email } });

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
    const user = await User.findByPk(req.user.id);
    const account = await Account.findOne({ where: { userId: req.user.id } });

    // Sequelize returns instance, call .toJSON() or access data directly
    const userData = user.toJSON();
    delete userData.password; // Manually remove password from response

    res.status(200).json({
        success: true,
        data: {
            ...userData,
            accountNumber: account ? account.accountNumber : null,
            balance: account ? parseFloat(account.balance) : 0,
            accountType: account ? account.accountType : null
        }
    });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
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
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
};
