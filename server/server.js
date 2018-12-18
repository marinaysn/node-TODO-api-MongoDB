const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost:27017/TodoMApp",
  { useNewUrlParser: true }
);

// let Todo = mongoose.model("Todo", {
//   text: {
//     type: String,
//     required: [true, "Must enter todo text"],
//     unique: true,
//     minlength: 2,
//     maxlength: 25,
//     trim: true //removes whitespaces
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//       type: Number,
//       default: null
//   }
// });

// let newTodo = new Todo({
//   text: "Send Letter to Dad",
//   completedAt: 1955
// });

// newTodo.save().then(
//   doc => {
//     console.log("Save todo", doc);
//   },
//   e => {
//     console.log("Unable to save todo");
//   }
// );

let User = mongoose.model("User", {
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    minlength: 6,
    require: true,
    trim: true
  },
  location: {
    type: String,
    default: "New York"
  },
  age: {
    type: Number,
    default: 15
  },
  gender: {
    type: String
  }
});

let newUser = new User({
    name: 'Paul',
    age: 42,
    email: 'paul@ny.com',
    gender: 'male'
});

newUser.save().then(doc => {
    console.log(`Saved user`);
}, (e) => {
    console.log(`Unable to save user`);
})

//mongoose.close();
