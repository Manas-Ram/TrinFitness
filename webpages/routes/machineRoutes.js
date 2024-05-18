const express = require('express');
const router = express.Router();
const machineController = require('../controllers/machineController');

router.get('/machine/bench-press', machineController.getBenchPress);
router.get('/machine/squat-rack', machineController.getSquatRack);
router.get('/machine/deadlift', machineController.getDeadLift);
module.exports = router;