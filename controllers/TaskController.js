const Task = require("../models/Task.js");
const User = require("../models/User.js");
const TaskService = require("../services/TaskService");
const TaskAccessRight = require("../models/TaskAccessRight");
const e = require("express");
const JwtService = require("../services/JwtService");

function TaskController() {
	return {
		/** fetch all the tasks **/
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
					"_id": { $in: taskAccessRightsIds }
				})
				console.log(tasks)
			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				})
			}
			return res.send({
				"message": "success",
				"tasks": tasks
			})
		},

		/** fetch a single task **/
		show: async (req, res, next) => {
			let task = null;
			console.log(req.params.id)
			try {
				task = await Task.findOne({"_id": req.params.id});
			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				})
			}
			return res.send({
				"message": "success",
				"task": task
			})
		},

		/** create a single task **/
		create: async (req, res, next) => {
			let task = null;
			try {
				task = await TaskService.createTask(req.body);
			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				});
			}
			return res.send({
				"message": "success",
				"task": task
			});
		},

		/** remove a single task **/
		remove: async (req, res, next) => {
			let tasks = null;
			try {
				const task = await TaskService.removeById(req.params.id);
			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				});
			}
			return res.send({
				"message": "success",
				"tasks": tasks
			});
		},

		/** update a single task **/
		update: async (req, res, next) => {
			let task = null;
			try {
				task = await TaskService.updateTask(req.params.id, req.body);
			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				})
			}
			return res.send({
				"message": "success",
				"task": task
			})
		},

		/** change a task's status to done **/
		done: async (req, res, next) => {
			let tasks = null;
			try {
				tasks = await TaskService.done(req.params.id);
			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				})
			}
			return res.send({
				"message": "success",
				"tasks": tasks
			});
		},

		/** change a task's status to `pending` **/
		undone: async (req, res, next) => {
			let task = null;
			try {
				task = await TaskService.undone(req.params.id);
			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				})
			}
			return res.send({
				"message": "success",
				"task": task
			})
		},

		/** change a task's status to `cancelled` **/
		cancel: async (req, res, next) => {
			const taskId = req.params.id;
			let task = await TaskService.cancelTask(taskId);
			return res.send({
				"message": "success",
				"task": task
			});
		},

		/** change a task's status to anything other than `cancel` **/
		uncancel: async (req, res, next) => {
			const taskId = req.params.id;
			let task = await TaskService.uncancelTask(taskId);
			return res.send({
				"message": "success",
				"task": task
			});
		},


		/*** Give Access Right to a User ***/
		giveAccessRight: async (req, res, next) => {
			const taskId = req.body.taskId ?? 0;
			const userId = req.body.userId ?? 0;

			if (!taskId || !userId) {
				return res.send({
					"message": "failed",
					"error": "entity not valid"
				})
			}

			try {
				const task = await Task.findOne({_id: taskId});
				const user = await User.findOne({_id: userId});

				if (!task || !user) {
					return res.send({
						"message": "failed",
						"error": "entity not valid"
					});
				}
			} catch (err) {
				return res.send({
					"message": "failed",
					"error": "something went wrong"
				});
			}

			let access = await TaskAccessRight.findOne({
				user: userId,
				task: taskId
			});

			if (access) {
				return res.send({
					"message": "success"
				});
			}

			access = await TaskAccessRight.findOne({
				task: taskId
			});

			if (access) {
				return res.send({
					"message": "failed",
					"error": "Task Is Already Assigned"
				});
			}

			const taskAccessRight = await TaskAccessRight.create({
				user: userId,
				task: taskId
			});

			return res.send({
				"message": "success"
			});
		},

		/*** Remove Access Right to a User ***/
		removeAccessRight: async (req, res, next) =>
		{
			const taskId = req.body.taskId ?? 0;
			const userId = req.body.userId ?? 0;

			if (!taskId || !userId) {
				return res.send({
					"message": "failed",
					"error": "entity not valid"
				})
			}

			try {
				const task = await Task.findOne({_id: taskId});
				const user = await User.findOne({_id: userId});

				if (!task || !user) {
					return res.send({
						"message": "failed",
						"error": "entity not valid"
					})
				}
			} catch (err) {
				return res.send({
					"message": "failed",
					"error": "something went wrong"
				})
			}

			await TaskAccessRight.deleteOne({
				user: userId,
				task: taskId
			});

			return res.send({
				"message": "success"
			})
		}
	}
}


module.exports = TaskController()