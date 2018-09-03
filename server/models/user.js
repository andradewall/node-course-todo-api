var mongoose = require('mongoose');

// Setting the fields. The first param from model() is the name of class and will be the name of the collection in plural
var User = mongoose.model('User', {
	email: {
		type: String,
		minlength: 1,
		required: true,
		trim: true
	}
});

module.exports = {User};