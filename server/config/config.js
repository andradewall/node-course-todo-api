var env = process.env.NODE_ENV || 'development';
console.log('env ******', env);

let dbuser = 'admin';
let dbpassword = 'admin1'


if (env === 'development') {
	process.env.PORT = 3000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
	process.env.PORT = 3000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
} else if (env === 'production') {
   process.env.MONGODB_URI =  `mongodb://${dbuser}:${dbpassword}@ds245532.mlab.com:45532/todoapp`;
}
