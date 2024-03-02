import crypto from 'crypto';

import catchAsyncErrors from '../middlewares/catch-async-errors.js';
import User from '../../models/user.js';
import ErrorHandler from '../../utils/error-handler.js';
import { sendToken, clearToken } from '../../utils/token.js';
import RefreshToken from '../../models/refresh-token.js';
import { sendVerificationEmail } from '../../utils/auth.js';

export const verifyEmailHandler = catchAsyncErrors(async (req, res, next) => {
  const { otp } = req.body;

  const user = req.user;
  if (
    !otp ||
    !user.verifyEmail.otp ||
    user.verifyEmail.otp !== otp ||
    user.verifyEmail.otpExpiresAt < Date.now()
  ) {
    return next(
      new ErrorHandler(400, 'Mã xác thực không hợp lệ. Vui lòng kiểm tra lại', 4062)
    );
  }

  user.isEmailVerified = true;
  user.verifyEmail = null;
  await user.save();

  res.json({
    success: true,
    message: 'Xác thực email thành công',
    code: 2035,
  });
});

export const validateEmailHandler = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = req.user;

  if (user.isEmailVerified) {
    return next(new ErrorHandler(400, 'Email đã được xác thực', 4067));
  }

  if (!email) {
    return next(new ErrorHandler(400, 'Vui lòng nhập email', 4060));
  }

  const foundedUser = await User.findOne({
    _id: { $ne: user._id },
    email: { $regex: new RegExp(email, 'i') },
  });

  if (foundedUser) {
    return next(new ErrorHandler(400, 'Email đã được sử dụng', 4059));
  }

  const otp = await user.generateVerifyEmail();
  const message = `Mã xác thực của bạn là: <span style='font-weight: bold; color: blue; font-size: large'>${otp}</span><br /><strong>Nếu bạn không yêu cầu xác thực email thì hãy bỏ qua nó</strong>`;

  try {
    await sendVerificationEmail({
      email,
      subject: 'Xác thực email Tư Vấn Sinh Viên',
      message,
    });
    res.json({
      success: true,
      message: `Đã gửi email đến: ${user.email}`,
      code: 2034,
    });
  } catch (error) {
    user.verifyEmail = null;
    await user.save();
    return next(new ErrorHandler(500, 'Lỗi gửi email xác thực', 4061));
  }
});

export const registerHandler = catchAsyncErrors(async (req, res, next) => {
  const {
    fullName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    occupation,
  } = req.body;

  const mergePassword = JSON.stringify({ password, confirmPassword });

  await User.create({
    fullName,
    email,
    phoneNumber,
    password: mergePassword,
    occupation,
  });

  res.status(201).json({
    success: true,
    message: 'Tạo tài khoản thành công',
    code: 2001,
  });
});

export const loginHandler = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(
      new ErrorHandler(400, 'Vui lòng nhập tên đăng nhập và mật khẩu', 4006)
    );
  }
  const user = await User.findOne({ phoneNumber: username }).select(
    '+password'
  );
  if (!user) {
    return next(
      new ErrorHandler(
        401,
        'Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu',
        4007
      )
    );
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler(
        401,
        'Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu',
        4008
      )
    );
  }

  if (!user.isEnabled) {
    return next(new ErrorHandler(403, 'Tài khoản đã bị khóa', 4012));
  }

  const token = user.generateAuthToken();
  const refreshToken = await user.generateRefreshToken();
  const userInfo = await user.getUserInfo();

  sendToken(res, token, refreshToken, userInfo);
});

export const refreshTokenHandler = catchAsyncErrors(async (req, res, next) => {
  // string
  const token = req.cookies.refreshToken;

  if (!token) {
    return next(new ErrorHandler(400, 'Yêu cầu không hợp lệ', 4009));
  }

  // object
  const refreshToken = await RefreshToken.findOne({ token });

  if (!refreshToken) {
    clearToken(res);
    return next(new ErrorHandler(400, 'Yêu cầu không hợp lệ', 4010));
  }

  if (!refreshToken.status) {
    // delete all token in branch
    await RefreshToken.deleteMany({ branch: refreshToken.branch });
    clearToken(res);
    return next(new ErrorHandler(400, 'Yêu cầu không hợp lệ', 4011));
  }

  const user = await User.findById(refreshToken.owner);

  if (!user) {
    return next(new ErrorHandler(401, 'Không tìm thấy tài khoản', 4013));
  }

  if (!user.isEnabled) {
    return next(new ErrorHandler(403, 'Tài khoản đã bị khóa', 4014));
  }

  const newToken = user.generateAuthToken();
  const newRefreshToken = await refreshToken.generateRefreshToken();
  const userInfo = await user.getUserInfo();
  sendToken(res, newToken, newRefreshToken, userInfo);
});

export const logoutHandler = catchAsyncErrors(async (req, res, next) => {
  // string
  const token = req.cookies.refreshToken;
  // object
  const refreshToken = await RefreshToken.findOne({ token });

  await RefreshToken.deleteMany({ branch: refreshToken.branch });
  clearToken(res);

  res.json({
    success: true,
    message: 'Đăng xuất thành công',
    code: 2004,
  });
});

export const meHandler = catchAsyncErrors(async (req, res, next) => {
  const user = await req.user.getUserInfo();
  res.json({
    success: true,
    user,
    code: 2005,
  });
});

export const forgotPasswordHandler = catchAsyncErrors(
  async (req, res, next) => {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return next(
        new ErrorHandler(404, 'Không tìm thấy người dùng với email', 4020)
      );
    }

    if (!user.isEmailVerified) {
      return next(
        new ErrorHandler(
          400,
          'Email liên kết với tài khoản chưa được xác thực',
          4022
        )
      );
    }

    const otp = await user.generateForgotPassword();

    const message = `Mã xác thực của bạn là: <span style='font-weight: bold; color: blue; font-size: large'>${otp}</span><br /><strong>Nếu bạn không yêu cầu đặt lại mật khẩu thì hãy bỏ qua nó</strong>`;

    try {
      await sendVerificationEmail({
        email: user.email,
        subject: 'Khôi phục mật khẩu Tư Vấn Sinh Viên',
        message,
      });
      res.json({
        success: true,
        message: `Đã gửi email đến: ${user.email}`,
        code: 2006,
      });
    } catch (error) {
      user.forgotPassword = null;
      await user.save();
      return next(new ErrorHandler(500, 'Lỗi gửi mã xác thực', 4021));
    }
  }
);

export const verifyOTPHandler = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;
  const user = await User.findOne({
    email: { $regex: new RegExp(email, 'i') },
    'forgotPassword.otp': otp,
    'forgotPassword.otpExpiresAt': { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(400, 'Mã xác thực không hợp lệ. Vui lòng kiểm tra lại', 4023)
    );
  }

  const resetPasswordToken = await user.generateResetPasswordToken();

  user.forgotPassword = null;
  await user.save();

  res.json({
    success: true,
    resetPasswordToken,
    code: 2007,
  });
});

export const resetPasswordHandler = catchAsyncErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    'resetPassword.token': resetPasswordToken,
    'resetPassword.resetTokenExpiresAt': { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        400,
        'Đặt lại mật khẩu không thành công. Vui lòng thử lại',
        4024
      )
    );
  }

  const { password, confirmPassword } = req.body;

  const mergePassword = JSON.stringify({ password, confirmPassword });

  user.password = mergePassword;
  user.resetPassword = null;

  await user.save();

  res.json({
    success: true,
    message: 'Đặt lại mật khẩu thành công',
    code: 2008,
  });
});
