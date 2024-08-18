var express = require('express');
var router = express.Router();
const TaskController = require('../../controllers/admin/TaskController');
const AdminMiddleware = require('../../middlewares/AdminMiddleware');
require("express-group-routes");



router.get('/', AdminMiddleware, TaskController.index);
router.get('/:id', AdminMiddleware, TaskController.show);
router.post('/create', AdminMiddleware, TaskController.create);
router.post('/remove/:id', AdminMiddleware, TaskController.remove);
router.post('/update/:id', AdminMiddleware, TaskController.update);

router.post('/cancel/:id', AdminMiddleware, TaskController.cancel);
router.post('/uncancel/:id', AdminMiddleware, TaskController.uncancel);

router.post('/giveAccessRight', AdminMiddleware, TaskController.giveAccessRight);
router.post('/removeAccessRight', AdminMiddleware, TaskController.removeAccessRight);



module.exports = router;
