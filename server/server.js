const {mongoose} = require('./db/mongoose.js')



// let newTodo = new Todo({
//   text: "Send Letter to Dad",
//   completedAt: 1955
// });

// newTodo.save().then(
//   doc => {
//     console.log("Save todo", doc);
//   },
//   e => {
//     console.log("Unable to save todo");
//   }
// );



let newUser = new User({
    name: 'John',
    age: 49,
    email: 'jj@ny.com',
    gender: 'male'
});

newUser.save().then(doc => {
    console.log(`Saved user`, doc);
}, (e) => {
    console.log(`Unable to save user`, e);
})

//mongoose.close();
