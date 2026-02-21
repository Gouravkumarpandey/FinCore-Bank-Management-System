const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    fromAccount: {
        type: mongoose.Schema.ObjectId,
        ref: 'Account',
        default: null
    },
    toAccount: {
        type: mongoose.Schema.ObjectId,
        ref: 'Account',
        default: null
    },
    amount: {
        type: Number,
        required: true
    },
    transactionMode: {
        type: String,
        enum: ['BANK', 'UPI', 'QR'],
        required: true
    },
    type: {
        type: String,
        enum: ['deposit', 'withdraw', 'transfer'],
        required: true
    },
    upiDetails: {
        senderUpi: String,
        receiverUpi: String
    },
    status: {
        type: String,
        enum: ['success', 'failed', 'pending'],
        default: 'pending'
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Transactions should never be edited or deleted
TransactionSchema.pre('save', function (next) {
    if (!this.isNew) {
        throw new Error('Transactions cannot be modified once created.');
    }
    next();
});

module.exports = mongoose.model('Transaction', TransactionSchema);
