//const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb"); //destructuring

MongoClient.connect(
  "mongodb://localhost:27017/testTodoApp",
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to MongoDb server");
    }
    console.log("Connected to MongoDb server");

    const db = client.db("TodoApp");

    db.collection("Todos")
      .find({ completed: true })
      .toArray()
      .then(
        docs => {
          console.log("Todos - completed");
          console.log(JSON.stringify(docs, undefined, 2));
        },
        err => {
          console, log("Unable to fetch the data from Todos", err);
        }
      );

    ////////////////////////////////////////////////

    db.collection("Todos")
      .find({
        _id: new ObjectID("5c171f1e4cc82a20706efb05")
      })
      .toArray()
      .then(
        docs => {
          console.log("Todos with id 5c171f1e4cc82a20706efb05");
          console.log(JSON.stringify(docs, undefined, 2));
        },
        err => {
          console, log("Unable to fetch the data from Todos", err);
        }
      );

    ////////////////////////////////////////////////

    db.collection("Todos")
      .find()
      .count()
      .then(
        count => {
          console.log(`Count Todos ${count}`);
        },
        err => {
          console, log("Unable to fetch the data from Todos", err);
        }
      );

    db.collection("Users")
      .find({ location: 'New York' })
      .toArray()
      .then(docs => {
        console.log("Show user from New York");
        console.log(JSON.stringify(docs, undefined, 2));
      });

    client.close();
  }
);
