const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.get('/profile', ensureAuthenticated, userController.getProfile);

module.exports = router;
