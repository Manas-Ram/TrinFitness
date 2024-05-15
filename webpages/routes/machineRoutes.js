const express = require('express');
const router = express.Router();
const machineController = require('../controllers/machineController');

router.get('/machine/bench-press', machineController.getBenchPress);

module.exports = router;