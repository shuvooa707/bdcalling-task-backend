const mongoose = require('../db/connection');
const Schema = mongoose.Schema;


const TaskAccessRightSchema = new Schema({

	/*** Relationships ****/
	task: { type: Schema.Types.ObjectId, ref: 'Task' },
	user: { type: Schema.Types.ObjectId, ref: 'User' }
});


const TaskAccessRight = mongoose.model("TaskAccessRight", TaskAccessRightSchema);

module.exports = TaskAccessRight;