const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

// Array de 2 users que seedamos
// Primeiro user tem auth token, o segundo não tem
const users = [{
	_id: userOneId,
	email: 'pedro@email.com',
	password: 'pedro123',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
	}]
}, {
	_id: userTwoId,
	email: 'ana@email.com',
	password: 'ana123'
}];

const todos = [{
	_id: new ObjectID(),
	text: 'First test todo'
}, {
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: true,
	completedAt: 333
}];

beforeEach((done) => {
	Todo.deleteMany({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
});

// Cria função que popula o obj Todos com todos os todos
const populateTodos = (done) => {
	Todo.deleteMany({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
};

const populateUsers = (done) => {
	User.deleteMany({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		return Promise.all([userOne, userTwo]);
	}).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};