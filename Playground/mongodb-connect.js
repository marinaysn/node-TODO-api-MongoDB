const MongoClient = require("mongodb").MongoClient;

let user = { name: 'Katty', age: 14, location: "Toronto" };
let { name } = user;
console.log(name);

MongoClient.connect(
    "mongodb://localhost:27017/testTodoApp",
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
    //   {
    //     name: "Max",
    //     age: 19,
    //     location: "New York"
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
