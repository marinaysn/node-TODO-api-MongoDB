const mongoose = require('mongoose');

let User = mongoose.model("User", {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      minlength: 6,
      require: true,
      trim: true
    },
    location: {
      type: String,
      default: "New York"
    },
    age: {
      type: Number,
      default: 15
    },
    gender: {
      type: String
    }
});
  


// let newUser = new User({
//     name: 'John',
//     age: 49,
//     email: 'jj@ny.com',
//     gender: 'male'
// });

// newUser.save().then(doc => {
//     console.log(`Saved user`, doc);
// }, (e) => {
//     console.log(`Unable to save user`, e);
// })

module.exports = { User }; 