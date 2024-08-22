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
			let userWithTasks = [];
			try {
				users =  await User.aggregate([
					{
						$lookup: {
							from: 'taskaccessrights', // The collection to join
							localField: '_id', // Field from the input documents
							foreignField: 'user', // Field from the documents of the "from" collection
							as: 'taskAccessRights' // Output array field
						}
					},
					{
						$lookup: {
							from: 'tasks',
							localField: 'taskAccessRights.task',
							foreignField: '_id',
							as: 'assignedTasks'
						}
					}
				]);
				// console.log(users)
				users.forEach(user => {
					console.log(UserDTO(user, user.assignedTasks))
					userDTOs.push(UserDTO(user, user.assignedTasks));
				})

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
				let assignedTasks = await TaskAccessRight.find({"user": req.params.id})
					.populate('task') // Populates the task information
					.exec();

				user = UserDTO(user, assignedTasks);
				// if (!user) {
				// 	return res.send({
				// 		"message": "failed",
				// 		"error": "User not found"
				// 	});
				// }
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