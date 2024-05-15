const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const ensureAuthenticated = require('../middlewares/authMiddleware');
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/profile', ensureAuthenticated, userController.getProfile);

module.exports = router;
