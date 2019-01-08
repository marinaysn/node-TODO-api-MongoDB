const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

let UserSchema = new mongoose.Schema({
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

UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, [
    "_id",
    "email",
    "name",
    "location",
    "age",
    "gender"
  ]);
};

UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = "auth";
  let token = jwt
    .sign({ _id: user._id, access }, "!someSecretCode88")
    .toString();

  //user.tokens.push({ access, token });
  user.tokens = user.tokens.concat([{ access, token }]);

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, "!someSecretCode88");
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

let User = mongoose.model("User", UserSchema);

module.exports = { User };
