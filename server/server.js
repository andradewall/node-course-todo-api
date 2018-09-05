// Libraries import
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// Local import
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// Init Express creating a new var
var app = express();
const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
	   return res.status(404).send();
	}

	Todo.findById(id).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
})

app.delete('/todos/:id', (req, res) => {
	// get the id
	var id = req.params.id;

	// validate the id -> not valid? return 404
	if (!ObjectID.isValid(id)) {
	   return res.status(404).send();
	}

	// remove todo by id
	Todo.findByIdAndRemove(id).then((todo) => {
		// success
		if (!todo) {
			// if no doc, send 404
			return res.status(404).send();
		}
		// if doc, send doc back with 200
		res.send({todo});

	// error
	}).catch((e) => {
		// 400 with empty body
		res.status(400).send();
	});
});

// Starting Express
app.listen(port, () => {
	console.log(`Started up at port ${port}`);
})

module.exports = {app};
