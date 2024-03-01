import User from '../../models/user.js';

async function registerValidateEmail(payload, callback) {
  const { email } = payload;

  const user = await User.findOne({
    email: { $regex: new RegExp(email, 'i') },
  });

  const res = {
    success: true,
    message: 'Email khả dụng',
    exist: false,
    code: 2002,
  };

  if (user) {
    res.message = 'Email đã được sử dụng';
    res.exist = true;
    res.code = 4004;
  }

  callback(res);
}

async function registerValidatePhoneNumber(payload, callback) {
  const { phoneNumber } = payload;

  const user = await User.findOne({ phoneNumber });

  const res = {
    success: true,
    message: 'Số điện thoại khả dụng',
    exist: false,
    code: 2003,
  };

  if (user) {
    res.message = 'Số điện thoại đã được sử dụng';
    res.exist = true;
    res.code = 4005;
  }

  callback(res);
}

async function verifyOTP(payload, callback) {
  const { email, otp } = payload;

  const user = await User.findOne({
    email: { $regex: new RegExp(email, 'i') },
    'forgotPassword.otp': otp,
    'forgotPassword.otpExpiresAt': { $gt: Date.now() },
  });

  const res = {
    success: true,
    message: 'Mã xác thực hợp lệ',
    valid: true,
    code: 2024,
  };

  if (!user) {
    res.message = 'Mã xác thực không hợp lệ';
    res.valid = false;
    res.code = 4039;
  }

  callback(res);
}

async function forgotPasswordValidateEmail(payload, callback) {
  const { email } = payload;

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
    return callback(res);
  }

  if (!user.isEmailVerified) {
    res.message = 'Email liên kết với tài khoản chưa được xác thực';
    res.valid = false;
    res.code = 4027;
  }

  callback(res);
}

export default function authHandlers(socket) {
  socket.on('register:validate-email', registerValidateEmail);
  socket.on('register:validate-phone-number', registerValidatePhoneNumber);
  socket.on('forgot-password:validate-email', forgotPasswordValidateEmail);
  socket.on('verify-otp', verifyOTP);
}
