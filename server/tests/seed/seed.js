const { ObjectId } = require("mongodb");
const { Todo } = require("./../../models/todo");
const { User } = require("./../../models/users");
const jwt = require("jsonwebtoken");

let i;

let obj = new ObjectId();
let obj2 = new ObjectId();

const users = [
  {
    _id: obj,
    location: "Toronto",
    age: 19,
    name: "Jane",
    email: "jane@toronto.ca",
    gender: "female",
    password: "123abc",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({ _id: obj, access: "auth" }, "!someSecretCode88").toString()
      }
    ]
  },
  {
    _id: obj2,
    location: "Toronto",
    age: 22,
    name: "John",
    email: "john@toronto.ca",
    gender: "male",
    password: "abc123"
  }
];

const todos = [
  {
    _id: "5c3571a995c5cc3aa0df2cd4",
    text: "Visit dentist at 18"
  },
  {
    _id: "5c37fd21da4d624ce0fd550e",
    text: "Visit dentist at 21"
  },
  {
    _id: "5c3592f4591e4743fc5f6609",
    text: "Visit dentist at 19 and",
    completed: true,
    completedAt: 333
  },
  {
    _id: "5c37fd21da4d624ce0fd550e",
    text: "Visit dentist at 21",
    completed: false,
    completedAt: null
  },
  {
    _id: new ObjectId(),
    text: "Second todo"
  }
];

let populateTodos = done => {
  //Todo.remove({}).then(() => done());
  Todo.count()
    .then(count => {
      i = count;
      // console.log(` count is : ${i}`);
    })
    .then(() => done());
};

const populateUsers = done => {
  User.remove({})
    .then(() => {
      let userOne = new User(users[0]).save();
      let userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };
