// import mongoose
const mongoose = require("mongoose");
// create connect to database function
const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      console.log(`MongoDB is connected with server : ${db.connection.host}`);
    });
};

// exporting connect function
module.exports = connectDB;
