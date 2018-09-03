// Libraries import
var express = require('express');
var bodyParser = require('body-parser');

// Local import
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// Init Express creating a new var
var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

// Starting Express
app.listen(3000, () => {
	console.log('Started on port 3000.');
})