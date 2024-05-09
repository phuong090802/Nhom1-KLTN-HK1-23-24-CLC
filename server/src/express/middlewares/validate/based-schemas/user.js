import roles from '../../../../constants/mapper/roles.js';
import User from '../../../../models/user.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../catch-async-errors.js';

// check role of user by user id in body
export const handleValidateRoleUser = (role) => {
  return catchAsyncErrors((req, res, next) => {
    const user = req.foundUser;
    if (user.role !== role) {
      const msg = `Không tìm thấy tài khoản với vai trò ${roles[
        role
      ].toLowerCase()}`;
      return next(new ErrorHandler(404, msg, 4032));
    }
    next();
  });
};

// kiểm tra id người dùng có tồn tại trong DB không
export const handleValidateUserId = (location = 'params', key = 'id') => {
  return catchAsyncErrors(async (req, res, next) => {
    const id = req[location][key];
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorHandler(404, 'Không tìm thấy tài khoản', 4074));
    }
    req.foundUser = user;
    next();
  });
};
