// imporing express
const express = require("express");
// importing question controller functions
const {
  createQuestion,
  addOption,
  deleteQuestion,
  deleteOption,
  addVote,
  getQuestion,
  getAllQuestions,
} = require("../controllers/questionController");
// importing isAuthenticated middleware to check authentication
const { isAuthenticated } = require("../middleware/auth");

// create router
const router = express.Router();
// url for create new question
router.route("/questions/create").post(isAuthenticated, createQuestion);
// create new option for an question
router.route("/questions/:id/options/create").post(isAuthenticated, addOption);
// delete question
router.route("/questions/:id/delete").delete(isAuthenticated, deleteQuestion);
// delete option
router.route("/options/:id/delete").delete(isAuthenticated, deleteOption);
// add vote for an option
router.route("/options/:id/add_vote").put(isAuthenticated, addVote);
// get a single question details
router.route("/questions/:id").get(getQuestion);
// fetch all the questions
router.route("/questions").get(getAllQuestions);
// exporing router
module.exports = router;
