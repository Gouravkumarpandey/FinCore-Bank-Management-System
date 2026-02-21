
const express = require('express');
const {
    getAccounts,
    getAccount,
    createAccount,
    updateCardTheme
} = require('../controllers/accountController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.put('/card-theme', updateCardTheme);

router
    .route('/')
    .get(getAccounts)
    .post(createAccount);

router
    .route('/:id')
    .get(getAccount);

module.exports = router;
