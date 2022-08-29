const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "UserModel",
  },
  todo: { type: String, min: 2 },
  status: { type: Boolean, default: false },
});

const Todo = new mongoose.model("todos", TodoSchema);
module.exports = Todo;
