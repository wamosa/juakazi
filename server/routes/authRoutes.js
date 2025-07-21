const express = require('express');
const router = express.Router();
const multer = require('multer');
const { register, login } = require('../controllers/authController');

// Configure multer storage (simple disk storage for now)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/register', upload.single('photo'),register);
router.post('/login', login);

module.exports = router;
