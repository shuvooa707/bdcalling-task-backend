const Task = require('../models/Task');

function TaskService() {
	return {
		createTask: async function (data) {
			return Task.create({
				title: data.title,
				description: data.description,
				priority: data.priority,
				due_date: data.due_date,
			})
		},
		removeById: async function removeById(id) {
			return Task.deleteOne({_id: id});
		},
		updateTask: async function (id, body) {
			return Task.updateOne({_id: id}, {
				title: body.title,
				description: body.description,
				priority: body.priority,
				due_date: body.due_date
			});
		},
		done: async function (id, body) {
			return Task.updateOne({_id: id}, {
				status: "done",
				completion_date: Date.now()
			});
		},
		undone: async function (id, body) {
			return Task.updateOne({_id: id}, {
				status: "pending",
				completion_date: null
			});
		},

		cancelTask: async taskId => {
			return Task.updateOne({_id: taskId}, {
				status: "cancelled"
			});
		},

		uncancelTask: async taskId => {
			return Task.updateOne({_id: taskId}, {
				status: "pending"
			});
		},


		getAssignedTasksByUserId: async (userId) => {
			return Task.find({
				user: userId
			});
		}
	}
}


module.exports = TaskService();