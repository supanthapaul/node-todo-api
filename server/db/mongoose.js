const mongoose = require('mongoose');

//mongodb://<dbuser>:<dbpassword>@ds123963.mlab.com:23963/todo-api-db

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };