import rolesMapper from '../../../constants/mapper/roles.js';
import ErrorHandler from '../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../catch-async-errors.js';

export const handleValidateRole = (location, ...roles) => {
  return catchAsyncErrors((req, res, next) => {
    const role = req[location].role;
    if (!roles.includes(role)) {
      const msg = `${rolesMapper[role]} không được hổ trợ`;
      return next(new ErrorHandler(400, msg, 4029));
    }
    next();
  });
};
