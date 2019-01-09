//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb"); //destructuring


MongoClient.connect(
    "mongodb://127.0.0.1:27017/testTodoApp",
    { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to MongoDb server");
    }
    console.log("Connected to MongoDb server");

    const db = client.db("TodoApp");

      //Todo collection
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false

    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to create nw collection', err)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

      
      //Users collection
    // db.collection("Users").insertOne(
    //     {
    //     name: "Katty",
    //     age: 14,
    //     location: "Taxas"
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log("Unable to create new collection Users", err);
    //     }
    //     console.log(
    //       JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2)
    //     );
    //   }
    // );

    client.close();
  }
);
