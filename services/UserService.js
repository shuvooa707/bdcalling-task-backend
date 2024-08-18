const UserRepository = require('../repository/UserRepository');
const fs = require('fs');
const multer  = require('multer')
const upload = multer({ dest: process.env.UPLOAD_FILE })
const JwtService = require('../services/JwtService');
const bcrypt = require('bcrypt');

function UserService() {
	return {
		createUser: async (req, res, next) => {
			const data = req.body;
			if ( !data.name ) {
				throw Error("Name is required");
			}
			if ( !data.username ) {
				throw Error("Username is required");
			}
			if ( !data.password ) {
				throw Error("Password is required");
			}
			if ( !data.email ) {
				throw Error("Email is required");
			}
			// if ( !data.image ) {
			// 	throw Error("Image is required");
			// }

			const imageUrl = req.imageUrl;
			console.log(req.imageUrl)

			const password = await bcrypt.hash(data.password, 8);

			await UserRepository.createUser(data.name, data.username, data.email, password, imageUrl);
		}
	}
}

module.exports = UserService();