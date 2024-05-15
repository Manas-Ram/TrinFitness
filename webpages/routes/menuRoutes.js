const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const upload = require('../middlewares/upload'); 
router.get('/menu', menuController.getMenu);
router.post('/menu/upload', upload.single('menuFile'), menuController.uploadMenu);

module.exports = router;