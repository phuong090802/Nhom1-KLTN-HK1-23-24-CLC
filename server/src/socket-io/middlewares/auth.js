import jwt from 'jsonwebtoken';

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
    const user = await User.findById(decoded.id);
    if (!user.isEnabled) {
      return next(new ErrorHandler(403, 'Tài khoản đã bị khóa', 4115));
    }
    socket.user = user;
    next();
  });
};
