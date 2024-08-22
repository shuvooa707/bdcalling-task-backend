const JwtService = require('../services/JwtService');
const User = require("../models/User");
const Task = require("../models/Task");
const TaskAccessRight = require("../models/TaskAccessRight");

async function TaskAccessRightMiddleware(req, res, next) {
	let token, username;
	try {
		token = req.headers?.authorization?.split(' ')[1];
		username = await JwtService.extractUsername(token);
	} catch (e) {
		return res.status(401).json({"message": "Access denied"});
	}


	if (username == null) {
		return res.status(401).json({"message": "Access denied"});
	}


	let user = await User.findOne({"username": username.data});
	let task = await Task.findOne({"_id": req.params.id});

	if (task == null || user == null) {
		return res.status(401).json({"message": "Access denied"});
	}


	// if user is `admin` then let them pass
	if (user && user.role === 'admin') {
		next();
		return;
	}

	const accessRight = await TaskAccessRight.findOne({
		"user": user._id,
		"task": task._id
	});


	if (accessRight != null) {
		next();
		return;
	}
	console.log({
		"user": user._id,
		"task": task._id
	})


	return res.status(401).json({"message": "Access denied"});
}

module.exports = TaskAccessRightMiddleware;