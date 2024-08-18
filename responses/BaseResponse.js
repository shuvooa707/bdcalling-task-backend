function BaseResponse(message = "success") {
	return {
		"message": message,
	}
}

module.exports = BaseResponse;