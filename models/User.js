const mongoose = require('../db/connection');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
	name: {
		type: String, required: true
	}, // String is shorthand for {type: String}
	username: {
		type: String, unique: true, required: true
	}, // String is shorthand for {type: String}
	image: {
		type: String
	},
	email: {
		type: String, unique: true, required: true
	},
	password: {
		type: String, required: true
	},
	date: {
		type: Date, default: Date.now
	},
	status: {
		type: String,
		enum: ['active', 'inactive'],
		default: 'active'
	},
	role: {
		type: String,
		enum: ['admin', 'user'],  // Only these values are allowed
		default: 'user'  // Default value if not provided
	},

});


const User = mongoose.model("User", UserSchema);

module.exports = User;