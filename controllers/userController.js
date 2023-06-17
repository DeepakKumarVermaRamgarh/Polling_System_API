// importing catch async error middleware
const catchAsyncErrors = require("../middleware/catchAsyncError");
// import user model
const User = require("../models/user");
// import send token middlware function
const sendToken = require("../middleware/jwtToken");
// import error handler middware
const ErrorHandler = require("../config/errorHandler");

// registering a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.create(req.body);
  sendToken(user, 201, res);
});

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ErrorHandler(400, "Please entered required fields"));
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user) return next(new ErrorHandler(401, "Invalid email or password"));

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched)
    return next(new ErrorHandler(401, "Invalid email or password"));

  sendToken(user, 200, res);
});

// logout user
exports.logOutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});
