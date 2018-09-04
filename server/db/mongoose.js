var mongoose = require('mongoose');
var dbuser = 'admin';
var dbpassword = 'admin1'

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect(`mongodb://${dbuser}:${dbpassword}@ds245532.mlab.com:45532/todoapp`);

// Exporting var mongoose
module.exports = {mongoose};
