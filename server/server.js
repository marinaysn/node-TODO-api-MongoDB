const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost:27017/TodoMApp",
  { useNewUrlParser: true }
);

let Todo = mongoose.model("Todo", {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

let newTodo = new Todo({
  text: "Feed the dog",
    completed: true,
  completedAt: 123
});

newTodo.save().then(
  doc => {
    console.log("Save todo", doc);
  },
  e => {
    console.log("Unable to save todo");
  }
);

//mongoose.close();
