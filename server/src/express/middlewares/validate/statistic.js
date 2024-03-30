import catchAsyncErrors from '../catch-async-errors.js';
import ErrorHandler from '../../../utils/error/http-error-handler.js';

// validate time statistic in body
export const handleValidateTimeForStatisticInBody = catchAsyncErrors(
  async (req, res, next) => {
    const allowTimeUnits = ['month', 'year'];
    const { timeUnit, timestamp } = req.body;
    if (!allowTimeUnits.includes(timeUnit)) {
      return next(new ErrorHandler(400, 'Mốc thời gian không hợp lệ', 4105));
    }

    if (!Number.isInteger(timestamp)) {
      return next(new ErrorHandler(400, 'Thời gian không hợp lệ', 4106));
    }

    next();
  }
);
