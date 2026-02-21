const express = require('express');
const { buyStock, sellStock, getPortfolio, getHistory } = require('../controllers/investmentController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/buy', buyStock);
router.post('/sell', sellStock);
router.get('/portfolio', getPortfolio);
router.get('/history', getHistory);

module.exports = router;
