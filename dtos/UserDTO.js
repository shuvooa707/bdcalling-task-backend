function UserDTO(user, tasks = []) {
	return {
		"id": user._id,
		"email": user.email,
		"name": user.name,
		"image": user.image,
		"status": user.status,
		"role": user.role,
		"tasks": tasks
	}
}


module.exports = UserDTO;