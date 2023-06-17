// create send token function
const sendToken = (user, statusCode, res) => {
  // get token from user model
  const token = user.getJWTToken();
  // options for cookie that how long to store token
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // send user and token
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
// exporting send token function
module.exports = sendToken;
