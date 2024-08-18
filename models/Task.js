const mongoose = require('../db/connection');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
	title: {
		type: String,
		required: true
	}, // String is shorthand for {type: String}
	description: {
		type: String,
		unique: false,
		required: false
	}, // String is shorthand for {type: String}
	priority: {
		type: String,
		enum: ['high', 'low', 'medium'],
		default: 'medium'
	},
	due_date: {
		type: Date,
		default: Date.now
	},
	completion_date: {
		type: Date,
		default: null
	},
	date: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		enum: ['done', 'pending', 'expired', 'cancelled'],
		default: 'pending'
	},
});


const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;