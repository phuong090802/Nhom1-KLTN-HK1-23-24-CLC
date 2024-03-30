import catchAsyncErrors from '../../catch-async-errors.js';
import User from '../../../../models/user.js';
import ErrorHandler from '../../../../utils/error/http-error-handler.js';
import roles from '../../../../constants/mapper/roles.js';

// check role of user by user id in body
export const handleValidateRoleUser = (role) => {
  return catchAsyncErrors((req, res, next) => {
    const user = req.foundUser;

    if (user.role === role) {
      const msg = `Không tìm thấy tài khoản với vai trò ${roles[
        role
      ].toLowerCase()}`;

      return next(new ErrorHandler(404, msg, 4032));
    }

    next();
  });
};

// kiểm tra id người dùng có tồn tại trong DB không
export const handleValidateUserIdInBody = catchAsyncErrors(
  async (req, res, next) => {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler(404, 'Không tìm thấy tài khoản', 4074));
    }

    req.foundUser = user;
    next();
  }
);

// kiểm tra id người dùng có tồn tại trong DB không
export const handleValidateUserIdInParams = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return next(new ErrorHandler(404, 'Không tìm thấy tài khoản', 4037));
    }

    req.foundUser = user;
    next();
  }
);
