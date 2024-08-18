const AuthService = require("../../services/AuthService");
const JwtService = require("../../services/JwtService");
const UserRepository = require("../../repository/UserRepository");
const UserService = require("../../services/UserService");
const multer = require('multer')
const upload = multer({dest: process.env.UPLOAD_FILE})
const User = require("../../models/User");
const Task = require("../../models/Task");
const TaskAccessRight = require("../../models/TaskAccessRight");
const TaskService = require("../../services/TaskService");
const UserDTO = require("../../dtos/UserDTO");

function UserController() {
	return {
		index: async (req, res, next) => {
			let users = null;
			let userDTOs = [];
			try {
				users = await User.find();

				for (let i = 0; i < users.length; i++) {
					let access = await TaskAccessRight.find({ "user": users[i]._id });
					let tasks = await Task.find({
						"task": { $in : access.map(ar => ar.task.toString()) }
					});
					console.log(tasks)
					userDTOs.push( UserDTO(users[i], tasks) );
				}

				// console.log(userDTOs)
			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				})
			}
			return res.send({
				"message": "success",
				"users": userDTOs
			})
		},
		show: async (req, res, next) => {
			let user = null;
			try {
				user = await User.findOne({"_id": req.params.id});
				if (!user) {
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