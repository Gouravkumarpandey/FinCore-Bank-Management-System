const express = require('express');
const { getStocks, getStock, createStock } = require('../controllers/stockController');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, getStocks);
router.get('/:symbol', protect, getStock);
router.post('/', protect, authorize('admin'), createStock);

module.exports = router;
