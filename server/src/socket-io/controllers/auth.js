import User from '../../models/user.js';
import ErrorHandler from '../../util/error/socket-io-error-handler.js';
import catchAsyncErrors from '../middlewares/catch-async-errors.js';

// namespace: /auth
// listen event (ack): validate-email
// description: xác thực email (cần xác thực người dùng)
export const handleValidateEmail = catchAsyncErrors(
  async (io, socket, payload, callback) => {
    const user = socket.user;
    if (user.isEmailVerified) {
      throw new ErrorHandler('Tài khoản đã được xác thực trước đó', 4066);
    }
    const { email } = payload;
    const foundedUser = await User.findOne({
      _id: { $ne: user._id },
      email: { $regex: new RegExp(email, 'i') },
    });
    if (foundedUser) {
      throw new ErrorHandler('Email đã được sử dụng', 4065);
    }
    callback({
      success: true,
      message: 'Email khả dụng',
      code: 2036,
    });
  }
);

// namespace: /auth
// listen event (ack): verify-email
// description: xác nhận email (cần xác thực người dùng)
export const handleVerifyEmail = catchAsyncErrors(
  async (io, socket, payload, callback) => {
    const user = socket.user;
    const { otp } = payload;
    if (
      !otp ||
      !user.verifyEmail.otp ||
      user.verifyEmail.otp !== otp ||
      user.verifyEmail.otpExpiresAt < Date.now()
    ) {
      throw new ErrorHandler('Mã xác thực không hợp lệ', 4068);
    }
    callback({
      success: true,
      message: 'Mã xác thực hợp lệ',
      code: 2037,
    });
  }
);

// namespace: /
// listen event (ack): register:validate-email
// description: Kiểm tra email trước khi tạo tài khoản
export const handleValidateEmailForRegister = catchAsyncErrors(
  async (io, socket, payload, callback) => {
    const { email } = payload;
    const user = await User.findOne({
      email: { $regex: new RegExp(email, 'i') },
    });
    if (user) {
      throw new ErrorHandler('Email đã được sử dụng', 4004);
    }
    callback({
      success: true,
      message: 'Email khả dụng',
      code: 2002,
    });
  }
);

// namespace: /
// listen event (ack): register:validate-phone-number
// description: Kiểm tra số điện thoại trước khi tạo tài khoản
export const handleValidatePhoneNumberForRegister = catchAsyncErrors(
  async (io, socket, payload, callback) => {
    const { phoneNumber } = payload;
    const user = await User.findOne({ phoneNumber });
    if (user) {
      throw new ErrorHandler('Số điện thoại đã được sử dụng', 4005);
    }
    callback({
      success: true,
      message: 'Số điện thoại khả dụng',
      code: 2003,
    });
  }
);

// namespace: /
// listen event (ack): verify-otp
// description: kiểm tra mã xác thực trước khi nhập mã xác thực để đặt lại mật khẩu
export const handleVerifyOTP = catchAsyncErrors(
  async (io, socket, payload, callback) => {
    const { email, otp } = payload;
    const user = await User.findOne({
      email: { $regex: new RegExp(email, 'i') },
      'forgotPassword.otp': otp,
      'forgotPassword.otpExpiresAt': { $gt: Date.now() },
    });
    if (!user) {
      throw new ErrorHandler('Mã xác thực không hợp lệ', 4039);
    }
    callback({
      success: true,
      message: 'Mã xác thực hợp lệ',
      code: 2024,
    });
  }
);

// namespace: /
// listen event (ack): forgot-password:validate-email
// description: Kiểm tra email trước khi yêu cầu quên mật khẩu
export const handleValidateEmailForForgotPassword = catchAsyncErrors(
  async (io, socket, payload, callback) => {
    const { email } = payload;
    const user = await User.findOne({
      email: { $regex: new RegExp(email, 'i') },
    });
    if (!user) {
      throw new ErrorHandler('Không tìm thấy người dùng với email', 4026);
    }
    if (!user.isEmailVerified) {
      const msg = 'Email liên kết với tài khoản chưa được xác thực';
      throw new ErrorHandler(msg, 4027);
    }
    callback({
      success: true,
      message: 'Email hợp lệ',
      code: 2009,
    });
  }
);
