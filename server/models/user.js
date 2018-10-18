const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		minlength: 1,
		required: true,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString()}, process.env.JWT_SECRET).toString();

	user.tokens = user.tokens.concat({access, token});
	
	return user.save().then(() => {
		return token;
	});
};

UserSchema.methods.removeToken = function (token) {
	var user = this;
	return user.updateOne({
		// remove do objeto instancias que sejam iguais as informadas
		$pull: {
			tokens: {token}
		}
	});
};

// Busca um user pelo token
UserSchema.statics.findByToken = function (token) {
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		return Promise.reject();
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	})
};

UserSchema.statics.findByCredentials = function (email, password) {
	var User = this;

	return User.findOne({email}).then((user) => {
		// se não houver email no bd
		if (!user) {
			// este retorno aciona o catch() no server.js
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user);
				} else {
					reject();
				}
			});
		});
	});
};

// Roda o código antes do evento informado ocorrer
UserSchema.pre('save', function (next) {
	var user = this;

	if (user.isModified('password')) {
		// user.password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
		// user.password = hash
		// next();
	} else {
		next();
	}
});

// Setting the fields. The first param from model() is the name of class and will be the name of the collection in plural
var User = mongoose.model('User', UserSchema);

module.exports = {User};
