var express = require('express');
var router = express.Router();
const UserController = require('../../controllers/admin/UserController');
const AdminMiddleware = require('../../middlewares/AdminMiddleware');
require("express-group-routes");



router.get('/', AdminMiddleware, UserController.index);
router.get('/:id', AdminMiddleware, UserController.show);
router.post('/remove/:id', AdminMiddleware, UserController.destroy);
router.post('/update/:id', AdminMiddleware, UserController.update);




module.exports = router;
