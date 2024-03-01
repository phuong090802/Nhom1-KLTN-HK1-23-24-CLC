import jwt from 'jsonwebtoken';

import User from '../../models/user.js';

export const isAuthenticatedHandler = (socket, next) => {
  const header = socket.handshake.headers['authorization'];

  if (!header) {
    const err = new Error('Đăng nhập trước khi truy cập vào tài nguyên này');
    err.data = {
      status: 401,
      message: 'Đăng nhập trước khi truy cập vào tài nguyên này',
      code: 4040,
    };
    return next(err);
  }

  if (!header.startsWith('bearer ')) {
    const err = new Error('Đăng nhập trước khi truy cập vào tài nguyên này');
    err.data = {
      status: 401,
      message: 'Đăng nhập trước khi truy cập vào tài nguyên này',
      code: 4041,
    };
    return next(err);
  }

  const token = header.substring(7);
  jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
    if (error) {
      const err = new Error(
        'Xác thực không thành công. Vui lòng đăng nhập lại'
      );
      err.data = {
        status: 401,
        message: 'Xác thực không thành công. Vui lòng đăng nhập lại',
        code: 4042,
      };
      return next(err);
    }
    socket.user = await User.findById(decoded.id);
    // console.log(socket.user);
    next();
  });
};

export const authorizeRolesHandler = (...roles) => {
  return (socket, next) => {
    const role = socket.user.role;
    if (!roles.includes(role)) {
      const err = new Error(
        `Role ${role} không được phép truy cập vào tài nguyên này`
      );
      err.data = {
        status: 403,
        message: `Role ${role} không được phép truy cập vào tài nguyên này`,
        code: 4043,
      };
      return next(err);
    }
    next();
  };
};
