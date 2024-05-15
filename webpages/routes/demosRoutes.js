const express = require('express');
const router = express.Router();
const demosController = require('../controllers/demosController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/demos', demosController.getDemos);
router.post('/demos/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.render('demos', { message: 'File uploaded successfully', filePath: '/uploads/' + req.file.filename });
    } else {
        res.render('demos', { message: 'File upload failed', filePath: null });
    }
});

module.exports = router;
