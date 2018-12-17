const MongoClient = require('mongodb').MongoClient;

//C:\Users\Marina\mongo-data
MongoClient.connect('mongodb://localhost:27017/testTodoApp', (err, client) => {
    if (err) {
       return console.log('Unable to connect to MongoDb server');
    }
    console.log('Connected to MongoDb server');

    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false

    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to create nw collection', err)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    db.collection('Users').insertOne({
        name: 'Marina',
        age: 42,
        location: 'Toronto'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to create new collection Users', err)
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
        })
    
    client.close();
});

