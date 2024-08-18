function isPasswordStrong(password) {
	return !! password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/);
}

function isValidEmail(email) {
	return !! email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
}


module.exports = {
	isPasswordStrong,
	isValidEmail,
}