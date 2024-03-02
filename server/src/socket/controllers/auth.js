import User from '../../models/user.js';

export async function validateEmail(socket, payload, callback) {
  const user = socket.user;

  if (user.isEmailVerified) {
    callback({
      success: false,
      message: 'Tài khoản đã được xác thực',
      code: 4066,
    });
  }

  const { email } = payload;

  const foundedUser = await User.findOne({
    _id: { $ne: user._id },
    email: { $regex: new RegExp(email, 'i') },
  });

  const res = {
    success: true,
    message: 'Email khả dụng',
    code: 2036,
  };

  if (foundedUser) {
    res.success = false;
    res.message = 'Email đã được sử dụng';
    res.code = 4065;
  }

  callback(res);
}

export async function verifyEmail(socket, payload, callback) {
  const user = socket.user;
  const { otp } = payload;

  const res = {
    success: true,
    message: 'Mã xác thực hợp lệ',
    code: 2037,
  };

  if (
    !otp ||
    !user.verifyEmail.otp ||
    user.verifyEmail.otp !== otp ||
    user.verifyEmail.otpExpiresAt < Date.now()
  ) {
    res.success = false;
    res.message = 'Mã xác thực không hợp lệ';
    res.code = 4068;
  }

  callback(res);
}

export const validateEmailForRegister = async (payload, callback) => {
  const { email } = payload;

  const user = await User.findOne({
    email: { $regex: new RegExp(email, 'i') },
  });

  const res = {
    success: true,
    message: 'Email khả dụng',
    code: 2002,
  };

  if (user) {
    res.success = false;
    res.message = 'Email đã được sử dụng';
    res.code = 4004;
  }

  callback(res);
};

export const validatePhoneNumberForRegister = async (payload, callback) => {
  const { phoneNumber } = payload;

  const user = await User.findOne({ phoneNumber });

  const res = {
    success: true,
    message: 'Số điện thoại khả dụng',
    code: 2003,
  };

  if (user) {
    res.success = false;
    res.message = 'Số điện thoại đã được sử dụng';
    res.code = 4005;
  }

  callback(res);
};

export const verifyOTP = async (payload, callback) => {
  const { email, otp } = payload;

  const user = await User.findOne({
    email: { $regex: new RegExp(email, 'i') },
    'forgotPassword.otp': otp,
    'forgotPassword.otpExpiresAt': { $gt: Date.now() },
  });

  const res = {
    success: true,
    message: 'Mã xác thực hợp lệ',
    code: 2024,
  };

  if (!user) {
    res.success = false;
    res.message = 'Mã xác thực không hợp lệ';
    res.code = 4039;
  }

  callback(res);
};

export const validateEmailForForgotPassword = async (payload, callback) => {
  const { email } = payload;

  const user = await User.findOne({
    email: { $regex: new RegExp(email, 'i') },
  });

  const res = {
    success: true,
    message: 'Email hợp lệ',
    code: 2009,
  };

  if (!user) {
    res.success = false;
    res.message = 'Không tìm thấy người dùng với email';
    res.code = 4026;
    return callback(res);
  }

  if (!user.isEmailVerified) {
    res.success = false;
    res.message = 'Email liên kết với tài khoản chưa được xác thực';
    res.code = 4027;
  }

  callback(res);
};
