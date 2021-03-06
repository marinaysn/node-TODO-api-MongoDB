const mongoose = require('mongoose');

let Todo = mongoose.model("Todo", {
    text: {
      type: String,
      required: [true, "Must enter todo text"],
      unique: true,
      minlength: 2,
      maxlength: 25,
      trim: true //removes whitespaces
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator: {
      required: true,
      type: mongoose.Schema.Types.ObjectId
    }
});
  

// let newTodo = new Todo({
//   text: "Send Letter to Dad",
//   completedAt: 1955
// });

// newTodo.save().then(
//   doc => {
//     console.log("Save todo", doc);
//     mongoose.connection.close(); //close connection after save
//   },
//   e => {
//     console.log("Unable to save todo");
//   }
// );


module.exports = { Todo };