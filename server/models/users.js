const mongoose = require('mongoose');
const validator = require('validator');

// {
//   emails: "",
//     password: "myPass123",
//     tokens: [
//       {
//         access: 'auth',
//       token: 'dfdsfjkjdsf4534jkdjfdls'},
      
//       ]
// }
let User = mongoose.model("User", {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      minlength: 6,
      require: true,
      trim: true,
      unique: true,
      validate: {
        validator: (v) => {
          //return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
        return validator.isEmail(v);
        },
        message: props => `${props.value} is not a valid email address`
      }
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
  },
  password: {
    type: String,
    require: true,
    minlength: 20
  },
  
  tokens: [{
    access: {
      type: string,
      require: true
    },
    token: {
      type: string,
      require: true
    }
  }]
});
  


// let newUser = new User({
//     name: 'Peppa L. Lange',
//     age: 27,
//     email: 'peppa@ny.com',
//     gender: 'female'
// });

// newUser.save().then(doc => {
//     console.log(`Saved user`, doc);
//     mongoose.connection.close(); //close connection after save
// }, (e) => {
//     console.log(`Unable to save user`, e);
// })

module.exports = { User }; 