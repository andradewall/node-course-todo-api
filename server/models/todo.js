var mongoose = require('mongoose');

// Setting the fields. The first param from model() is the name of class and will be the name of the collection in plural
var Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 1, // Empty string will not be accept
		trim: true // Remove empty spaces in the begin and in the end of the string
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	},
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
});

module.exports = {Todo};