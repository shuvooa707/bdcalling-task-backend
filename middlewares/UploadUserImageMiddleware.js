// external imports
const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

function uploader(allowed_file_types, max_file_size, error_msg) {
	// File upload folder
	const UPLOADS_FOLDER = `${__dirname}/../public/images/`;

	// define the storage
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, UPLOADS_FOLDER);
		},
		filename: (req, file, cb) => {
			const fileExt = path.extname(file.originalname);
			const fileName = file.originalname
				.replace(fileExt, "")
				.toLowerCase()
				.split(" ")
				.join("-") + "-" + Date.now();

			req.imageUrl = "images/" + fileName + fileExt;

			cb(null, fileName + fileExt);
		},
	});

	// prepare the final multer upload object
	const upload = multer({
		storage: storage,
		limits: {
			fileSize: max_file_size,
		},
		fileFilter: (req, file, cb) => {
			if (allowed_file_types.includes(file.mimetype)) {
				cb(null, true);
			} else {
				cb(createError(error_msg));
			}
		},
	});

	return upload;
}


function uploadUserImageMiddleware(req, res, next) {

	const upload = uploader(
		["image/jpeg", "image/jpg", "image/png"],
		1000000,
		"Only .jpg, jpeg or .png format allowed!"
	);

	// call the middleware function
	upload.any()(req, res, (err) => {
		if (err) {
			res.status(500).json({
				errors: {
					avatar: {
						msg: err.message,
					},
				},
			});
		} else {
			next();
		}
	});
}

module.exports = uploadUserImageMiddleware;