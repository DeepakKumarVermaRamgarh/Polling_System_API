// import error handler middlware
const ErrorHandler = require("../config/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongoDB ID error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(400, message);
  }

  // mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered.`;
    err = new ErrorHandler(400, message);
  }

  //   wrong json web token error
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid Json Web Token, Try again...`;
    err = new ErrorHandler(400, message);
  }
  // JWT expired error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again...`;
    err = new ErrorHandler(400, message);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
