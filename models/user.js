// import mongoose
const mongoose = require("mongoose");
// import bcrypt for password hashing
const bcrypt = require("bcrypt");
// import jwt for generating login token
const jwt = require("jsonwebtoken");

// creating user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter Username"],
    minLength: [4, "Name should have atleast 4 characters"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minLength: [8, "Password should be greater than 8 characters"],
  },
});

// hasing the password before create or modify the user

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// generating jsonwebtoken for user to login
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

// comparing the entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// exporting user model
module.exports = mongoose.model("User", userSchema);
