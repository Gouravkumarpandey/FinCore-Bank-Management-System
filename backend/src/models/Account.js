const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    accountType: {
        type: String,
        enum: ['savings', 'current', 'Savings', 'Current'],
        default: 'savings'
    },
    balance: {
        type: Number,
        default: 0
    },
    upiId: {
        type: String,
        unique: true
    },
    upiPin: {
        type: String,
        select: false
    },
    qrCodeData: {
        type: String
    },
    dailyUpiLimit: {
        type: Number,
        default: 100000
    },
    status: {
        type: String,
        enum: ['active', 'frozen'],
        default: 'active'
    },
    // Virtual Card Details
    cardNumber: {
        type: String,
        unique: true
    },
    cardExpiry: {
        type: String
    },
    cardCvv: {
        type: String
    },
    cardTheme: {
        type: String,
        default: 'default'
    },
    cardHolderName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', AccountSchema);
