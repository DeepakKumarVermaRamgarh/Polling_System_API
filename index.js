// importing express
const express = require("express");
const app = express();
// importing dotenv
const dotenv = require("dotenv");
// importing database connection
const connectDatabse = require("./config/database");
// importing error middleware
const errorMiddleWare = require("./middleware/Error");
// importing cookieparser
const cookieParser = require("cookie-parser");

// handling uncaught exception errors
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(
    `Shutting down the server due to uncaught exception error in ${err.stack}`
  );
  process.exit(1);
});

// configuration of environment variables
dotenv.config({ path: "./config/config.env" });

// connecting to database
connectDatabse();

// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// routes
const userRoute = require("./routes/userRoutes");
const questionRoute = require("./routes/questionRoutes");

// routes middleware
app.use("/api/v1", userRoute);
app.use("/api/v1", questionRoute);

// error middleware
app.use(errorMiddleWare);

// listening server
const server = app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("error in server listening :", err);
    return;
  }
  console.log(`Server is up and running on port ${process.env.PORT}`);
});

// unhandled rejection error
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(
    `Server is shutting down due to unhandled rejection in ${err.stack}`
  );
  server.close(() => {
    process.exit(1);
  });
});
