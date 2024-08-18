const Task = require("../../models/Task.js");
const User = require("../../models/User.js");
const TaskService = require("../../services/TaskService");
const TaskAccessRight = require("../../models/TaskAccessRight");
const e = require("express");
const JwtService = require("../../services/JwtService");

function TaskController() {
	return {
		/** fetch all the tasks **/
		index: async (req, res, next) => {
			let tasks = await Task.find();
			// tasks = tasks.map(async task => {
			// 	task.assignedUser = await TaskAccessRight.findOne({ "task": task._id })?.user;
			// 	return task;
			// })
			return res.send({
				"message": "success",
				"tasks": tasks
			})
		},

		/** fetch a single task **/
		show: async (req, res, next) => {
			let task = null;
			let assignedUser = null;
			try {
				task = await Task.findOne({"_id": req.params.id});
				assignedUser = await TaskAccessRight.findOne({ "task": task._id })
				if ( assignedUser ) {
					assignedUser = await User.findOne({ "_id": assignedUser.user });
				} else {
					assignedUser = null;
				}
			} catch (e) {
				return res.send({
					"message": "failed",
					"error": e
				})
			}
			return res.send({
				"message": "success",
				"task": task,
				"assignedUser": assignedUser
			})
		},

		/** create a single task **/
		update: async (req, res, next) => {
			let task = null;
			let taskId = req.params.id;
			try {
				console.log(req.body)
				task = await TaskService.updateTask(taskId, req.body);
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

			let task = null;
			let user = null;

			if (!taskId || !userId) {
				return res.send({
					"message": "failed",
					"error": "entity not valid"
				})
			}

			try {
				task = await Task.findOne({_id: taskId});
				user = await User.findOne({_id: userId});

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
					"message": "success",
					"task": task,
					"assignedUser": user
				});
			}

			access = await TaskAccessRight.findOne({
				task: taskId
			});

			if (access) {
				await TaskAccessRight.deleteOne({
					task: taskId
				});
			}

			const taskAccessRight = await TaskAccessRight.create({
				user: userId,
				task: taskId
			});

			return res.send({
				"message": "success",
				"task": task,
				"assignedUser": user
			});
		},

		/*** Remove Access Right to a User ***/
		removeAccessRight: async (req, res, next) => {
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