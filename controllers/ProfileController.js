const AuthService = require("../services/AuthService");
const JwtService = require("../services/JwtService");
const UserRepository = require("../repository/UserRepository");
const UserService = require("../services/UserService");
const multer = require('multer')
const upload = multer({dest: process.env.UPLOAD_FILE})
const User = require("../models/User");
const Task = require("../models/Task");
const TaskService = require("../services/TaskService");
const TaskAccessRight = require("../models/TaskAccessRight");
const UserDTO = require("../dtos/UserDTO");

function ProfileController() {
	return {
		index: async (req, res, next) => {
			let token = req.headers?.authorization?.split(' ')[1];
			let username = await JwtService.extractUsername(token);
			let user = await User.findOne({ "username": username.data });
			let tasks = [];
			let taskAccessRights = null;
			try {
				taskAccessRights = await TaskAccessRight.find({
					"user": user._id
				});
				let taskAccessRightsIds = taskAccessRights.map(tar => tar.task);
				tasks = await Task.find({
					"_id": { $in: taskAccessRightsIds },
					"status": "pending",
				})
			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				})
			}

			const userDTO = UserDTO(user, tasks);
			return res.send({
				"message": "success",
				"user": userDTO
			})
		},
		update: async (req, res, next) => {
			let token = req.headers?.authorization?.split(' ')[1];
			let username = await JwtService.extractUsername(token);
			let user = await User.findOne({ "username": username.data });


			try {

			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				})
			}


			return res.send({
				"message": "success"
			})
		}
	}
}


module.exports = ProfileController()