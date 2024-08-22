const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const formidable = require('express-formidable');
const fileUpload = require('express-fileupload');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const cors = require('cors')
const TaskAccessRight = require("./models/TaskAccessRight")
// config .env
require("dotenv").config({ "path": "./.env" });


const indexRouter = require('./routes/indexRoutes');
const usersRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const profileRoutes = require('./routes/profileRoutes');

const adminTaskRoutes = require('./routes/admin/adminTaskRoutes');
const adminUserRoutes = require('./routes/admin/adminUserRoutes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(formidable());

app.use('/', indexRouter);

/********** API routes ***********/

/* Auth routes */
app.use('/api/auth', authRouter);

/* User routes */
app.use('/api/users', usersRouter);

/* Profile routes */
app.use('/api/profile', profileRoutes);

/* Task routes */
app.use('/api/tasks', taskRoutes);

 // Admin Routes
/* Task routes */
app.use('/api/admin/tasks', adminTaskRoutes);
/* User routes */
app.use('/api/admin/users', adminUserRoutes);



app.get("/model-test/:userId", async  (req, res) => {
	// let access = await TaskAccessRight.find();
	const tasks = await TaskAccessRight.find({ user: req.params.userId })
		.populate('task')
		.exec();
	return res.send({
		"tasks" : tasks
	});
});


app.listen(process.env.PORT || 3000, () => {
	console.log(`App listening on port ${process.env.PORT || 3000}!`);
});


module.exports = app;
