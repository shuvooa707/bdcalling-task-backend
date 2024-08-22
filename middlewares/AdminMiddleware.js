const JwtService = require('../services/JwtService');
const User = require("../models/User");
const log = require("../utils/LoggerHelper.jsx");

async function AdminMiddleware(req, res, next) {
	let token = req.headers?.authorization?.split(' ')[1];
	try {
		let decoded = await JwtService.isValid(token);
	} catch (e) {
		return res.status(401).json({
			"message": "Access denied",
			"error": e
		});
	}


	let username = await JwtService.extractUsername(token);


	if (username == null) {
		return res.status(401).json({"message": "Access denied"});
	}
	let user = await User.findOne({"username": username.data});

	if (user != null && user.role === 'admin') {
		next();
		return;
	}


	return res.status(401).json({"message": "Access denied"});
}

module.exports = AdminMiddleware;