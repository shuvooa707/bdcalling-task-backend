var express = require('express');
var router = express.Router();
const JwtService = require("../services/JwtService");

const AuthController = require('../controllers/AuthController');

const uploadUserImageMiddleware = require('../middlewares/UploadUserImageMiddleware');

/* Auth Routes */
router.post('/login', AuthController.login);
router.post('/register', uploadUserImageMiddleware, AuthController.register);
router.post('/change-password', AuthController.changePassword);

module.exports = router;
