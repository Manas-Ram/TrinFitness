const express = require('express');
const router = express.Router();
const slotRequestController = require('../controllers/slotRequestController');

router.post('/request-slot', slotRequestController.requestSlot);

module.exports = router;
