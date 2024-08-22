const mongoose = require('mongoose');


const MONGO_CONNECTION_STRING = "mongodb+srv://shuvooa707:ZwfsjKj8EwV7A0PO@cluster0.jgrv2ty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGO_CONNECTION_STRING);

module.exports = mongoose;