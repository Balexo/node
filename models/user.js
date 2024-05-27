const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Schema
const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

userSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
