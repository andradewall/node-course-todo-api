const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5b8e8e00c8c2d9384c44c6e91';
//
// if (!ObjectID.isValid(id)) {
//    console.log('ID not valid');
// }

// Todo.find({
//    _id: id
// }).then((todos) => {
//    console.log('Todos', todos);
// });
//
// Todo.findOne({
//    _id: id
// }).then((todo) => {
//    console.log('Todos', todo);
// });

// Todo.findById(id).then((todo) => {
//    if (!todo) {
//       return console.log('Id not found');
//    }
//    console.log('Todo by Id', todo);
// }).catch((e) => console.log(e));

// User.findById
var id = '5b8d425e56000f2d1a3db5ea';

User.findById(id).then( (user) => {
   if (!user) {
      return console.log('Id not found');
   }

   console.log('User by Id', user);
}).catch((e) => console.log(e));
