const JwtService = require('../services/JwtService');
const User = require("../models/User");

async function AdminMiddleware (req, res, next) {
	let token = req.headers?.authorization?.split(' ')[1];
	let username = await JwtService.extractUsername(token);


	console.log(username)
	if ( username == null ) {
		return res.status(401).json({"message": "Access denied"});
	}
	let user = await User.findOne({ "username": username.data });

	if ( user != null && user.role === 'admin' ) {
		next();
		return;
	}


	return res.status(401).json({"message": "Access denied"});
}

module.exports = AdminMiddleware;