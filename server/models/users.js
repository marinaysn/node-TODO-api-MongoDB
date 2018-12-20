

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