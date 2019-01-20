require("./config/config");

//library imports
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

//local imports
const { mongoose } = require("./db/mongoose.js");
const { Todo } = require("./models/todo");
const { User } = require("./models/users");
const { authenticate } = require("./middleware/authenticate");

const app = express();

const port = process.env.PORT;

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

// deleting
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
          return res.status(406).send(`id -  ${id} - cannot be found`);
        }
        res.status(200).send({ todo });
      })
      .catch(e => {
        res.status(400).send(e);
      }); //error - 400
  }
});

app.patch("/todos/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["text", "completed"]);

  if (!ObjectId.isValid) {
    return res.status(400).send(`id -  ${id} - is not valid`);
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      //if todo cannot be found
      if (!todo) {
        return res.status(404).send(`id -  ${id} - cannot be found`);
      }
      res.status(200).send({ todo });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

/********* USERS ********** */

app.post("/users", (req, res) => {
  let body = _.pick(req.body, [
    "name",
    "email",
    "location",
    "age",
    "gender",
    "password"
  ]);
  let user = new User(body);

  // // generate auth token here for users to login and save history
  user
    .save()
    .then(() => {
      //res.send(doc);
      return user.generateAuthToken();
    })
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

//POST /users/login {email, password}

app.post("/users/login", (req, res) => {
  let body = _.pick(req.body, ["email", "password"]);


  //res.send(body);

  User.findByCredentials(body.email, body.password).then((user) => {

    res.send(user);

  }).catch((e) => {
    res.status(400).send();
  })


  //res.send(body);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      //res.send(user);
      user.generateAuthToken().then(token => {
        res.header("x-auth", token).send(user);
      });
    })
    .catch(e => {
      res.status(407).send();
    });

});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
