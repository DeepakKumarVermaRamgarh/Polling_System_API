// importing error handler
const ErrorHandler = require("../config/errorHandler");
// importing catch async error middleware
const catchAsyncError = require("../middleware/catchAsyncError");
// importing question model
const Question = require("../models/question");

// create question
exports.createQuestion = catchAsyncError(async (req, res, next) => {
  const question = await Question.create(req.body);
  if (!question)
    return next(new ErrorHandler(500, "Failed to create question"));
  return res.status(201).json({
    success: true,
    message: "Question created successfully",
  });
});

// adding option to the question
exports.addOption = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  const question = await Question.findById(id);
  if (!question) return next(new ErrorHandler(400, "Invalid Question ID"));

  const isAlreadyPresent = question.options.some((option) => {
    return option.text === text;
  });

  if (isAlreadyPresent)
    return next(new ErrorHandler(400, `${text} already in options.`));
  question.options.push({ text });
  await question.save();
  return res.status(200).json({
    success: true,
    message: "Option added successfully",
  });
});

// delete question
exports.deleteQuestion = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  if (!question) return next(new ErrorHandler(400, "Invalid Question ID"));

  if (
    question.options.some((option) => {
      return option.votes > 0;
    })
  )
    return next(new ErrorHandler(400, "Can't be deleted"));

  await question.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Question deleted successfully",
  });
});

// delete option
exports.deleteOption = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findOne({ "options._id": id });
  if (!question) return next(new ErrorHandler(400, "Invalid question id"));
  const option = question.options.id(id);
  if (!option) return next(new ErrorHandler(400, "Invalid option id"));
  if (option.votes > 0) return next(new ErrorHandler(400, "Can't be deleted"));
  await option.deleteOne();
  await question.save();
  return res.status(200).json({
    success: true,
    message: "Option deleted successfully",
  });
});

// adding vote on option
exports.addVote = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const question = await Question.findOne({ "options._id": id });
  const option = question.options.id(id);

  if (option.votedBy.includes(userId))
    return next(new ErrorHandler(400, "Already voted for this option"));

  if (
    question.options.some((option) => {
      return option.votedBy.includes(userId);
    })
  )
    return next(new ErrorHandler(400, "Already voted for this question"));

  option.votes++;
  option.votedBy.push(userId);
  await question.save();
  res.status(200).json({
    success: true,
    question,
  });
});

// get single question details
exports.getQuestion = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id).populate("options.votedBy");
  if (!question) return next(new ErrorHandler(400, "Invalid Question ID"));
  res.status(200).json({
    success: true,
    question,
  });
});

// get all the questions
exports.getAllQuestions = catchAsyncError(async (req, res, next) => {
  const questions = await Question.find({});
  res.status(200).json({
    success: true,
    questions,
  });
});
