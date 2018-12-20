

let Todo = mongoose.model("Todo", {
    text: {
      type: String,
      required: [true, "Must enter todo text"],
      unique: true,
      minlength: 2,
      maxlength: 25,
      trim: true //removes whitespaces
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
  });