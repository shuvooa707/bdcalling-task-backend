var jwt = require('jsonwebtoken');
const log = require('../utils/LoggerHelper.jsx');

function JwtService() {
	return {
		// used to login and create JWT
		createJWT: async function (username = null) {
			if (username == null) throw "Username is required";
			console.log({ expiresIn: process.env.JWT_EXPIRES })
			const token = jwt.sign({
				data: username
			}, process.env.JWT_SECRET, {expiresIn: parseInt(process.env.JWT_EXPIRES) });
			return token;
		},
		// used to register new user
		extractUsername: async function (token) {
			return jwt.decode(token, process.env.JWT_SECRET);
		},
		// check if jwt is valid
		isValid: async function (token) {
			let decoded = await jwt.verify(token, process.env.JWT_SECRET);
			return decoded;
		}
	}
}

module.exports = JwtService();