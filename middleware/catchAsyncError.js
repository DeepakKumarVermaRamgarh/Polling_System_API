// custom function to get async functions and resolve them if not then catch the error and return to next
module.exports = (asyncFunction) => (req, res, next) => {
  Promise.resolve(asyncFunction(req, res, next)).catch(next);
};
