// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isLoggedOut } = require('../middleware/auth');

router.get('/register', isLoggedOut, authController.getRegister);
router.post('/register', isLoggedOut, authController.postRegister);

router.get('/login', isLoggedOut, authController.getLogin);
router.post('/login', isLoggedOut, authController.postLogin);

router.post('/logout', authController.logout);

module.exports = router;
