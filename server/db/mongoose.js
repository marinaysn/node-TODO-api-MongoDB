const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// let db = {
//   localhost: 'mongodb://127.0.0.1:27017/TodoMApp',
//   mlab: 'mongodb://<dbuser>:<dbpassword>@ds145304.mlab.com:45304/todoapp'
// };
// mongoose.connect(process.env.POST ? db.mlab : db.localhost, { useNewUrlParser: true })

//or
//run on command line with valid credentials
//heroku config: set MONGODB_URI = mongodb://<dbuser>:<dbpassword>@ds145304.mlab.com:45304/todoapp

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
);

module.exports = {
  mongoose
};

//"mongodb://localhost:27017/TodoMApp",
