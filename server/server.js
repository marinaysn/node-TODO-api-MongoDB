//library imports
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");

//local imports
const { mongoose } = require("./db/mongoose.js");
const { Todo } = require("./models/todo");
const { Users } = require("./models/users");

const app = express();

const port = process.env.PORT || 3000;

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
    Todo.findById(id)
      .then(todo => {
        if (!todo) {
          return res.status(404).send(`User Id ${id} is not found`);
        }
        res.send({
          todo
        });
      })
      .catch(e => res.status(404).send(e));
  }
});


app.delete("/todos/:id", (req, res) => {
  //get id
  // will try for '5c1b3e42c11b522714bad184';

  let id = req.params.id;

  //validate
  if (!ObjectId.isValid) {
    res.status(400).send(`id -  ${id} - is not valid`);
  } else {
    //remove todo by id
    Todo.findByIdAndDelete(id)
      .then(todo => {
        //if todo cannot be found
        if (!todo) {
          return res.status(400).send(`id -  ${id} - cannot be found`);
        }
        res.status(200).send({ todo });
      })
      .catch(e => {
        res.status(404).send(e);
      }); //error - 400
  }
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
