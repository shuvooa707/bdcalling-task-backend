const mongoose = require("../db/connection");
const User = require("../models/User");

function UserRepository() {
	return {
		findUserByUsername : async function(username) {
			return User.findOne({ "username": username });
		},
		findUserById: function(username) {
			return username;
		},
		findUserByEmail: function(username) {
			return username;
		},

		// create user
		createUser: async function (name, username, email, password, image= "") {
			await User.create({
				name: name,
				username: username,
				email: email,
				password: password,
				image: image
			});
		}
	}
}


module.exports = UserRepository();