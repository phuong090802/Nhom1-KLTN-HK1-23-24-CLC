import catchAsyncErrors from '../catch-async-errors.js';
import ErrorHandler from '../../../utils/error/http-error-handler.js';
import rolesMapper from '../../../constants/mapper/roles.js';

export const handleValidateRoleInBody = (...roles) => {
  return catchAsyncErrors((req, res, next) => {
    const role = req.body.role;
    if (!roles.includes(role)) {
      const msg = `${rolesMapper[role]} không được hổ trợ`;
      return next(new ErrorHandler(400, msg, 4029));
    }
    next();
  });
};
