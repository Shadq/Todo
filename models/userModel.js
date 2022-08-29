const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 1,
    max: 13,
    required: true,
  },
  email: { type: String, required: true },
  password: { type: String, min: 6, max: 26, required: true },
});

const User = new mongoose.model("users", UserSchema);
module.exports = User;
