const { ObjectId } = require("mongodb");
const { Todo } = require("./../../models/todo");
const { User } = require("./../../models/users");
const jwt = require('jsonwebtoken');

let i;

let obj = new ObjectId();
let obj2 = new ObjectId();

const users = [
    {
        _id: obj,
        location: 'Toronto' ,
        age: 19,
        name: 'Jane',
        email: 'jane@toronto.ca',
        gender: 'female',
        password: '123abc',
        tokens: [
            {
            access: 'auth',
                token: jwt.sign({ _id: obj, access: 'auth' }, 'secret123').toString()
            }
        ]
    },
    {
        _id: obj2,
        location: 'Toronto' ,
        age: 22,
        name: 'John',
        email: 'john@toronto.ca',
        gender: 'male',
        password: 'abc123'
    }

];


const todos = [
    {
      _id: "5c355fc590e892388c7f9731",
      text: "Visit dentist at 11"
    },
    {
      _id: "5c35635603b6a6161c7d3a12",
      text: "Visit dentist at 12"
    },
    {
      _id: "5c355fc590e892388c7f9731",
      text: "Visit dentist today",
      completed: true,
      completedAt: 333
    },
    {
      _id: "5c1c77b968289803b0418234",
      text: "Wash dishes please",
      completed: false,
      completedAt: null
    },
    {
      _id: new ObjectId(),
      text: "Second todo"
    }
  ];
  

let populateTodos = (done) => {
    //Todo.remove({}).then(() => done());
    Todo.count()
      .then(count => {
          i = count;
        // console.log(` count is : ${i}`);
      })
      .then(() => done());
};
  

const populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

       return Promise.all([userOne, userTwo])
    }).then(() => done());
}


  
module.exports = { todos , populateTodos, users, populateUsers, tCount};
