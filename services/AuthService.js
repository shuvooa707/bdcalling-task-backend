const UserService = require('../services/UserService');
const User = require('../models/User');
const bcrypt = require('bcrypt');

function AuthService() {
	return {
		// used to login and create JWT
		login: async function (username, password) {
			// req.params.username, req.params.password
			let user = await User.findOne({"username": username});
			console.log(username)
			if ( !user ) {
				return false;
			}
			return bcrypt.compare(password, user.password);
		},
		// used to register new user
		register: async function (req, res) {
		}
	}
}

module.exports = AuthService();