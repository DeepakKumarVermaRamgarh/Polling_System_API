// import mongoose
const mongoose = require("mongoose");

// creating option schema
const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  votedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
// creating question schema
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: [optionSchema],
});
// make a model of question and export
module.exports = mongoose.model("Question", questionSchema);
