const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { checkEmployer } = require('../middleware/roles');
const { processPayment } = require('../controllers/paymentController');

// @route   POST /api/payment
// @desc    Process payment for featured job
router.post('/', auth, checkEmployer, processPayment);

module.exports = router;