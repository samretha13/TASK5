const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  available: Boolean
});

module.exports = mongoose.model("User", userSchema);
