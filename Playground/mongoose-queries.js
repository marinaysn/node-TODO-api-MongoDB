const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");

// import { mongoose } from "./../server/db/mongoose";
// import { Todo } from "/../server/models/todo";


let id = '5c254c076a26881e743c3fef';

Todo.find({
    _id: id,
    completed: false
}).then((todos) => {
    console.log('Todos', todos)
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo: ', todo)
});


Todo.findById(id).then((todo) => {
    console.log('Todo: ', todo)
});

