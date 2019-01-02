const mongoose = require("mongoose");
const validator = require("validator");

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
      validator: v => {
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
    minlength: 6
  },

  tokens: [
    {
      access: {
        type: String,
        require: true
      },
      token: {
        type: String,
        require: true
      }
    }
  ]
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
