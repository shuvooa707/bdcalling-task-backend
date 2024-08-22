var express = require('express');
var router = express.Router();
const User = require('../models/User');
const ProfileController = require('../controllers/ProfileController');
const UserMiddleware = require('../middlewares/UserMiddleware');
const AdminMiddleware = require('../middlewares/AdminMiddleware');

/* GET users listing. */
router.get('/get-profile', ProfileController.index);
router.get('/profile/update', ProfileController.update);

module.exports = router;
