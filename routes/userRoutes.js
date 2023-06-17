// importing express
const express = require("express");
// importing user controller functions
const {
  registerUser,
  loginUser,
  logOutUser,
} = require("../controllers/userController");
// importing authentication middleware
const { isAuthenticated } = require("../middleware/auth");
// creating router
const router = express.Router();
// register a new user url
router.route("/register").post(registerUser);
// login user
router.route("/login").post(loginUser);
// logout user
router.route("/logout").get(isAuthenticated, logOutUser);

// exporting user router
module.exports = router;
