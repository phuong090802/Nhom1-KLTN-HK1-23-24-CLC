import ErrorHandler from '../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../catch-async-errors.js';

// validate time statistic in body
export const handleValidateTimeForStatisticInBody = catchAsyncErrors(
  async (req, res, next) => {
    const allowTimeUnits = ['month', 'year'];
    const { timeUnit, latestTime } = req.body;
    if (!allowTimeUnits.includes(timeUnit)) {
      return next(new ErrorHandler(400, 'Mốc thời gian không hợp lệ', 4105));
    }
    if (!Number.isInteger(latestTime)) {
      return next(new ErrorHandler(400, 'Thời gian không hợp lệ', 4106));
    }
    // validate month
    // validate year
    switch (timeUnit) {
      case 'month':
        if (latestTime <= 0 || latestTime > 12) {
          const msg = 'Tháng phải nằm trong khoảng từ 1 đến 12';
          return next(new ErrorHandler(400, msg, 4076));
        }
        return next();
      default:
        if (latestTime <= 0) {
          return next(new ErrorHandler(400, 'Năm phải lớn hơn 0', 4077));
        }
        return next();
    }
  }
);
