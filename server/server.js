//library imports
const express = require("express");
const bodyParser = require("body-parser");

//local imports
const { mongoose } = require("./db/mongoose.js");
const { Todo } = require("./models/todo");
const { Users } = require("./models/users");
const { ObjectId } = require("mongodb");

const app = express();
app.use(bodyParser.json()); // middlewere

app.post("/todos", (req, res) => {
  //console.log(req.body);

  let todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({
        todos,
        code: 123
      });
    },
    e => {
      res.status(404).send(e);
    }
  );
});

app.get("/todos/:id", (req, res) => {
  let id = req.params.id;
  // res.send(req.params);

  if (!ObjectId.isValid(id)) {
    //res.status(400).send(res)
    res.status(400).send(`User Id ${id} is not valid`);
  } else {

    Todo.findById(id).then(
      (todo) => {
        if (!todo) {
          return res.status(404).send(`User Id ${id} is not found`);
        }
        res.send({
          todo
        });
      }
    ).catch((e) => res.status(404).send(e));
  }

});

app.listen(3000, () => {
  console.log("Started on port 3000");
});

module.exports = { app };
