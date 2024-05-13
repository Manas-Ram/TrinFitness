const express = require('express');
const slotRequestController = require('../controllers/slotRequestController');
const wellnessRequestController = require('../controllers/wellnessRequestController');
const userController = require('../controllers/userController');
const menuOptionController = require('../controllers/menuOptionController');
const router = express.Router();

router.get('/api/slot-requests', slotRequestController.getAllSlotRequests);
router.post('/api/update-slot-request', slotRequestController.updateSlotRequest);

router.get('/api/wellness-requests', wellnessRequestController.getAllWellnessRequests);


router.get('/api/users', userController.getAllUsers);


router.get('/api/menu-options', menuOptionController.getAllMenuOptions);

module.exports = router;
