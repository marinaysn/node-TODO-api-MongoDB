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

    //updateOne
    // db.collection("Todos")
    //   .updateOne(
    //     { "_id": new ObjectID("5c18508f2b90eccfc0675a25") },
    //     { $set: { "completed": true } },
    //     {returnOriginal: false}
    //   )
    //   .then(result => {
    //     console.log(JSON.stringify(result, undefined, 2));
    //   });

    db.collection("Users")
      .updateOne(
        { name: "Jane" },
        {
          $set: { name: "Janet" },
          $inc: { age: 1 }
        },
        { returnOriginal: false }
      )
      .then(result => {
        console.log(JSON.stringify(result, undefined, 3));
      });

    client.close();
  }
);
