// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// deleteMany
	// db.collection('Todos').deleteMany({text: 'Walk with the dog'}).then((result) => {
	// 	console.log(result);
	// });

	// deleteOne
	// db.collection('Todos').deleteOne({text: 'Walk with the dog'}).then((result) => {
	// 	console.log(result);
	// });

	// findOneAndDelete
	db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
		console.log(result);
	});

	client.close();
});