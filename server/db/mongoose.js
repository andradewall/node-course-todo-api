var mongoose = require('mongoose');

let dbuser = 'admin';
let dbpassword = 'admin1'

let db = {
   mlab: `mongodb://${dbuser}:${dbpassword}@ds245532.mlab.com:45532/todoapp`,
   localhost: 'mongodb://localhost:27017/TodoApp'
}

mongoose.Promise = global.Promise;
mongoose.connect(process.env.PORT ? db.localhost : db.mlab);

// Exporting var mongoose
module.exports = {mongoose};
