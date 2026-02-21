const mongoose = require('mongoose');

const BeneficiarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    beneficiaryName: {
        type: String,
        required: true
    },
    beneficiaryAccountNumber: {
        type: String
    },
    beneficiaryUpiId: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Beneficiary', BeneficiarySchema);
