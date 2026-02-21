const express = require('express');
const {
    getTransactions,
    transferFunds,
    depositFunds,
    withdrawFunds,
    upiTransfer
} = require('../controllers/transactionController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/').get(getTransactions);
router.route('/transfer').post(transferFunds);
router.route('/deposit').post(depositFunds);
router.route('/withdraw').post(withdrawFunds);
router.route('/upi-transfer').post(upiTransfer);

module.exports = router;
