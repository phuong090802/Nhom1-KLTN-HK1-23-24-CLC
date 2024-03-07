import jwt from 'jsonwebtoken';

import catchAsyncErrors from './catch-async-errors.js';

import User from '../../models/user.js';

import ErrorHandler from '../../utils/error-handler.js';

// Authentication user
export const isAuthenticatedHandler = catchAsyncErrors(
  async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(
        new ErrorHandler(
          401,
          'Đăng nhập trước khi truy cập vào tài nguyên này',
          4015
        )
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  }
);

// Authorization user by role
export const authorizeRolesHandler = (...roles) => {
  return catchAsyncErrors((req, res, next) => {
    const role = req.user.role;
    if (!roles.includes(role)) {
      return next(
        new ErrorHandler(
          403,
          `Role '${role}' không được phép truy cập vào tài nguyên này`,
          4016
        )
      );
    }
    next();
  });
};

// Combine authentication user + authorization user by role
const authHandler = (...roles) => [
  isAuthenticatedHandler,
  authorizeRolesHandler(...roles),
];
export default authHandler;
