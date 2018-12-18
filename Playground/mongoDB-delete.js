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

    //deleteMany
    //   db.collection('Users').deleteMany({ name: 'Alex' }).then((result) => {
    //       console.log(result);
    //   });

    //deleteOne
    // db.collection('Todos').deleteOne({ text: 'Eat lunch' }).then((result) => {
    //       console.log(result[0]);
    //   });
    //findOneAndDelete

    // db.collection('Todos').deleteOne({ text: 'Eat lunch' }).then((result) => {
    //     console.log(result[0]);
    //       });

    db.collection("Users")
      .findOneAndDelete({ _id: new ObjectID("5c185ba72b90eccfc0675bce") })
      .then(result => {
        console.log(result);
      });

    client.close();
  }
);
