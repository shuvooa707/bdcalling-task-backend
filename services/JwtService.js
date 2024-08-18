var jwt = require('jsonwebtoken');

function JwtService() {
	return {
		// used to login and create JWT
		createJWT: async function (username = null) {
			if (username == null) throw "Username is required";

			const token = jwt.sign({
				data: username
			}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
			console.log(token)
			return token;
		},
		// used to register new user
		extractUsername: async function (token) {
			return jwt.decode(token, process.env.JWT_SECRET);
		}
	}
}

module.exports = JwtService();