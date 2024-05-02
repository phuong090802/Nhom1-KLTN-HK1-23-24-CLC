import jwt from 'jsonwebtoken';

import rolesMapper from '../../constants/mapper/roles.js';
import User from '../../models/user.js';
import ErrorHandler from '../../util/error/http-error-handler.js';
import catchAsyncErrors from './catch-async-errors.js';

// handle authentication
export const handleAuthentication = catchAsyncErrors(async (req, res, next) => {
  const headerAuth = req.headers.authorization;
  if (!headerAuth || !headerAuth.startsWith('Bearer ')) {
    const msg = 'Đăng nhập trước khi truy cập vào tài nguyên này';
    return next(new ErrorHandler(401, msg, 4015));
  }
  const token = headerAuth.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).populate({
    path: 'counsellor.department',
    select: '_id departmentName',
  });
  if (!user.isEnabled) {
    return next(new ErrorHandler(403, 'Tài khoản đã bị khóa', 4114));
  }
  req.user = user;
  next();
});

// handleAuthorization
export const handleAuthorization = (...roles) => {
  return catchAsyncErrors((req, res, next) => {
    const role = req.user.role;
    if (!roles.includes(role)) {
      const msg = `${rolesMapper[role]} không được phép truy cập vào tài nguyên này`;
      return next(new ErrorHandler(403, msg, 4016));
    }
    next();
  });
};

export const handleAuthenticationAndAuthorization = (...roles) => [
  handleAuthentication,
  handleAuthorization(...roles),
];

// Những role bị chặn (trong param)
// tránh tình trạng admin upload trạng thái của bản thân
// tránh tình trạng department upload trạng thái của bản thân hoặc department khác
export const handlePreventRoles = (...roles) => {
  return catchAsyncErrors(async (req, res, next) => {
    const user = req.foundUser;
    if (roles.includes(user.role)) {
      const msg = 'Thao tác không hợp lệ. Lỗi quyền truy cập';
      return next(new ErrorHandler(404, msg, 4069));
    }
    req.foundUser = user;
    next();
  });
};
