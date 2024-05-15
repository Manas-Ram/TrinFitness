const express = require('express');
const router = express.Router();
const teacherDashboardController = require('../controllers/teacherDashboardController');
const slotRequestController = require('../controllers/slotRequestController');

router.get('/teacherdashboard', teacherDashboardController.getTeacherDashboard);
router.post('/accept-request', slotRequestController.acceptRequest);
router.post('/deny-request', slotRequestController.denyRequest);

module.exports = router;