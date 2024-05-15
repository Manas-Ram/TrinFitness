const express = require('express');
const router = express.Router();
const demosController = require('../controllers/demosController');

router.get('/demos', demosController.getDemos);

module.exports = router;