const express = require('express');
const router = express.Router();
const lunchplanController = require('../controllers/lunchplanController');

router.get('/lunchplan', lunchplanController.getLunchplan);
router.post('/lunchplan', lunchplanController.postLunchplan); // Add this line

module.exports = router;
