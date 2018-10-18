var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
	var config = require('./config.json');
	var envConfig = config[env];
	
	Object.keys(envConfig).forEach((key) => {
		process.env[key] = envConfig[key];
	});
}

let dbuser = 'admin';
let dbpassword = 'admin1'

if (env === 'production') {
   process.env.MONGODB_URI =  `mongodb://${dbuser}:${dbpassword}@ds245532.mlab.com:45532/todoapp`;
}