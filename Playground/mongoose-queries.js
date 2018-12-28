const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");

// import { mongoose } from "./../server/db/mongoose";
// import { Todo } from "/../server/models/todo";


let id = '5c254c076a26881e743c3fef';
let id2 = '5c1b3969e07cc13f10b66152';

// Todo.find({
//     _id: id,
//     completed: false
// }).then((todos) => {
//     console.log('All Todos', todos)
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo: ', todo)
// });


// Todo.findById(id).then((todo) => {
//     console.log('Todo by ID: ', todo)
// });

// Todo.findByIdAndDelete(id2).then((todo) => {
//     console.log('Todo by ID: ', todo)
// });

// Todo.findById(id2).then((todo) => {
//     console.log('Todo by ID: ', todo)
// });

Todo.findOneAndUpdate(id2, { $set: {text: "Call Jane / New York", completed: true}}).then((todo) => {
    console.log('findOneAndUpdate: ', todo)
}); 

