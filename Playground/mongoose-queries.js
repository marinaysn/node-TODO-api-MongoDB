const { ObjectId } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/users");

//let id = "5c254c076a26881e743c3fef";
let id = '5c254c076a26881e743c3feff';
let id2 = "5c1b3969e07cc13f10b66152";

if (!ObjectId.isValid(id)) {
  console.log(`Id ${id} is not valid`);
} else {
  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return console.log(`Id ${id} is not found`);
      }
      console.log("Todo by ID: ", todo);
    })
    .catch(e => console.log(e));

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
}

let u_id = "5c187f69b9ed58273c29bb92";

if (!ObjectId.isValid(u_id)) {
    console.log(`User Id ${u_id} is not valid`)
}
else {
    User.findById(u_id).then((user) => {
        if (!user) {
            return console.log(`User with Id ${u_id} is not found`)
        }
        console.log(`User with Id ${u_id} : `, user)
    }).catch((e) => {
        console.log(e);
    })
}