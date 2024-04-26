import jwt from 'jsonwebtoken';

import rolesMapper from '../../constants/mapper/roles.js';
import User from '../../models/user.js';

export const handleAuthentication = (socket, next) => {
  const header = socket.handshake.headers['authorization'];

  if (!header) {
    const message = 'Đăng nhập trước khi truy cập vào tài nguyên này';
    const err = new Error(message);
    err.data = {
      status: 401,
      message,
      code: 4040,
    };
    return next(err);
  }

  if (!header.startsWith('bearer ')) {
    const message = 'Đăng nhập trước khi truy cập vào tài nguyên này';
    const err = new Error(message);
    err.data = {
      status: 401,
      message,
      code: 4041,
    };
    return next(err);
  }

  const token = header.substring(7);
  jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
    if (error) {
      const message = 'Xác thực không thành công. Vui lòng đăng nhập lại';
      const err = new Error(message);
      err.data = {
        status: 401,
        message,
        code: 4042,
      };
      return next(err);
    }
    socket.user = await User.findById(decoded.id);
    next();
  });
};

export const handleAuthorization = (...roles) => {
  return (socket, next) => {
    const role = socket.user.role;
    if (!roles.includes(role)) {
      const message = `${rolesMapper[role]} không được phép truy cập vào tài nguyên này`;
      const err = new Error();
      err.data = {
        status: 403,
        message,
        code: 4043,
      };
      return next(err);
    }
    next();
  };
};
