import User from '../../models/user.js';

export const authHandler = (namespace, socket) => {
  socket.on('check-email-exists', async (email, callback) => {
    const user = await User.findOne({
      email: { $regex: new RegExp(email, 'i') },
    });
    const res = {
      success: true,
      message: 'Email khả dụng',
      exists: false,
      code: 2002,
    };
    if (user) {
      res.message = 'Email đã được sử dụng';
      res.exists = true;
      res.code = 4004;
    }
    callback(res);
  });

  socket.on('check-phone-number-exists', async (phoneNumber, callback) => {
    const user = await User.findOne({
      phoneNumber,
    });
    const res = {
      success: true,
      message: 'Số điện thoại khả dụng',
      exists: false,
      code: 2003,
    };
    if (user) {
      res.message = 'Số điện thoại đã được sử dụng';
      res.exists = true;
      res.code = 4005;
    }
    callback(res);
  });

  socket.on('verify-email', async (email, callback) => {
    const user = await User.findOne({
      email: { $regex: new RegExp(email, 'i') },
    });

    const res = {
      success: true,
      message: 'Email hợp lệ',
      valid: true,
      code: 2009,
    };

    if (!user) {
      res.message = 'Không tìm thấy người dùng với email';
      res.valid = false;
      res.code = 4026;
    }

    if (!user.isEmailVerified) {
      res.message = 'Email liên kết với tài khoản chưa được xác thực';
      res.valid = false;
      res.code = 4027;
    }

    callback(res);
  });
};
