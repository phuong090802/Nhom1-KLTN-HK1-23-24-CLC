// handle error if occurred when handler executing
const catchAsyncErrors = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

export default catchAsyncErrors;
