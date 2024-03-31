import catchAsyncErrors from '../catch-async-errors.js';

// set default page and size for pagination
export const defaultPayloadDateForStatistic = catchAsyncErrors(
  (req, res, next) => {
    req.body.timeUnit = req.body.timeUnit || 'month';
    req.body.latestTime = req.body.latestTime || 4;
    next();
  }
);
