// importing error handler
const ErrorHandler = require("../config/errorHandler");
// importing catch async error middleware
const catchAsyncError = require("./catchAsyncError");
// import json web token
const jwt = require("jsonwebtoken");
// import user model
const User = require("../models/user");

// checking if user is logged in or not
exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  // checking for the token cookie present or not in the req.cookies
  const { token } = req.cookies;
  // if not present it means user is not login yet
  if (!token) return next(new ErrorHandler(401, "Please Login First"));
  // if logged in already then verify the token cookie with jwt
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // if the token is correct search the user and return to next
  req.user = await User.findById(decodedData.id);
  next();
});
