const AuthService = require("../services/AuthService");
const JwtService = require("../services/JwtService");
const UserRepository = require("../repository/UserRepository");
const UserService = require("../services/UserService");
const multer = require('multer')
const upload = multer({dest: process.env.UPLOAD_FILE})
const UserDTO = require("../dtos/UserDTO");
const TaskService = require("../services/TaskService");

function AuthController() {
	return {
		login: async function (req, res, next) {
			const {username, password} = req.body;
			console.log(username, password);

			if (!await AuthService.login(username, password)) {
				return res.send({
					"message": "failed",
					"error": "Wrong Credentials"
				});
			}

			const token = await JwtService.createJWT(username);
			const user = await UserRepository.findUserByUsername(username);

			const tasks = await TaskService.getAssignedTasksByUserId();

			const userDTO = UserDTO(user, tasks);
			return res.send({
				"message": "success",
				"token": token,
				"user": userDTO
			});
		},
		register: async function (req, res, next) {
			console.log(req.body.name);
			try {
				await UserService.createUser(req, res, next);
			} catch (e) {
				return res.send({
					"message": "error",
					"error": e.toString()
				});
			}

			return res.send({
				"message": "success"
			});
		},
		changePassword: function (req, res, next) {

		}
	}
}


module.exports = AuthController()