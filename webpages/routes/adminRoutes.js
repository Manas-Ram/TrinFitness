const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAdmin } = require('../middlewares/authMiddleware');

router.get('/adminstatus', ensureAdmin, adminController.getAdminStatus);

module.exports = router;