// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// findOneAndDelete
	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID('5b89442b664a08144255da9a')
	}, {
		// mongodb update operator
		$set: {
			completed: true
		}
	}, {
		// findOneAndUpdate option	
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID('5b894243a27e801723458a71')
	}, {
		// mongodb update operator
		$set: {
			text: 'Walk the dog'
		},
		$inc: {
			date: 310818
		}
	}, {
		// findOneAndUpdate option	
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	client.close();
});