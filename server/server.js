//library imports

const express = require('express');
const bodyParser = require('body-parser');

//local imports
const { mongoose } = require('./db/mongoose.js');
const { Todo } = require('./models/todo');
const { Users } = require('./models/users');

const app = express();
app.use(bodyParser.json()); // middlewere

app.post('/todos', (req, res) => {
  //console.log(req.body);

  let todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
      res.status(400).send(e);
  });
});



app.listen(3000, () => {
  console.log('Started on port 3000');
})
