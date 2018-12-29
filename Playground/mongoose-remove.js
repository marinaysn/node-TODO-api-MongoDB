const { ObjectId } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/users");

// will remove everything from the list
// Todo.remove({}).then((result) => {
//     console.log("Everythign is removed");
//     console.log(result);
//     
// })

//other remove methods
//Todo.findOneAndRemove({})
//Todo.findByIdAndRemove()
//Todo.findOneAndDelete({})
//Todo.findByIdAndDelete()

let id = '5c1e9df56984de2a2cba4fdd'; //"text" : "Wash dishes and do tables"

Todo.findByIdAndDelete(id).then((todo) => {
    console.log(todo);
})

