var express = require('express');
var router = express.Router();
const TaskController = require('../controllers/TaskController');
const AdminMiddleware = require('../middlewares/AdminMiddleware');
const TaskAccessRightMiddleware = require('../middlewares/TaskAccessRightMiddleware');
require("express-group-routes");


	router.get('/', TaskController.index);

	router.get('/:id', TaskAccessRightMiddleware, TaskController.show);
	router.post('/create', TaskController.create);
	router.post('/remove/:id', AdminMiddleware, TaskController.remove);
	router.post('/update/:id', AdminMiddleware, TaskController.update);

	router.post('/mark-done/:id', AdminMiddleware, TaskController.done);
	router.post('/mark-undone/:id', AdminMiddleware, TaskController.undone);



module.exports = router;
