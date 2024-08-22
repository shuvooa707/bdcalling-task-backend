function TaskDTO(task, tasks = []) {
	return {
		title: task.title,
		description: task.description,
		priority: task.priority,
		due_date: task.due_date,
		completion_date: task.completion_date,
		date: task.date,
		status: task.status,
	}
}


module.exports = UserDTO;