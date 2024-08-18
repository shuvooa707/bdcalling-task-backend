const AuthService = require("../services/AuthService");
const JwtService = require("../services/JwtService");
const UserRepository = require("../repository/UserRepository");
const UserService = require("../services/UserService");
const multer = require('multer')
const upload = multer({dest: process.env.UPLOAD_FILE})
const User = require("../models/User");
const Task = require("../models/Task");
const TaskService = require("../services/TaskService");

function UserController() {
	return {
		index: async (req, res, next) => {
			let users = null;
			try {
				users = await User.find();
			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				})
			}
			return res.send({
				"message": "success",
				"users": users
			})
		},
		show: async (req, res, next) => {
			let user = null;
			try {
				user = await User.findOne({ "_id": req.params.id });
				if ( !user  ) {
					return res.send({
						"message": "failed",
						"error": "User not found"
					});
				}
			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				})
			}
			return res.send({
				"message": "success",
				"user": user
			})
		},
		create: async (req, res, next) => {
			let user = null;
			try {
				user = await UserService.createUser(req);
			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				});
			}
			return res.send({
				"message": "success",
				"user": user
			});
		},
		update: async (req, res, next) => {
			let user = null;
			try {
				user = await UserService.createUser(req);
			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				});
			}
			return res.send({
				"message": "success",
				"user": user
			});
		},
		destroy: async (req, res, next) => {
			let user = null;
			try {
				user = await UserService.createUser(req);
			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				});
			}
			return res.send({
				"message": "success",
				"user": user
			});
		}
	}
}


module.exports = UserController()