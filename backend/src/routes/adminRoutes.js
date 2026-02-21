
const express = require('express');
const {
    getUsers,
    toggleBlockUser,
    getAccounts,
    toggleFreezeAccount,
    getAllTransactions,
    getAnalytics,
    createAdmin
} = require('../controllers/adminController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

// All routes here are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getUsers);
router.put('/users/:id/block', toggleBlockUser);

router.get('/accounts', getAccounts);
router.put('/accounts/:id/freeze', toggleFreezeAccount);

router.get('/transactions', getAllTransactions);

router.get('/analytics', getAnalytics);

router.post('/create', createAdmin);

module.exports = router;
