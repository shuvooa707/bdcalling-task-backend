var express = require('express');
var router = express.Router();
const User = require('../models/User');
const UserController = require('../controllers/UserController');
const UserMiddleware = require('../middlewares/UserMiddleware');
const AdminMiddleware = require('../middlewares/AdminMiddleware');

/* GET users listing. */
router.get('/',[AdminMiddleware], UserController.index);
router.get('/:id',[AdminMiddleware], UserController.show);
router.post('/create',[AdminMiddleware], UserController.create);
router.post('/update/:id',[AdminMiddleware], UserController.update);
router.post('/destroy/:id',[AdminMiddleware], UserController.destroy);

module.exports = router;
