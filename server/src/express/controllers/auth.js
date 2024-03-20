import crypto from 'crypto';

import User from '../../models/user.js';
import RefreshToken from '../../models/refresh-token.js';

import catchAsyncErrors from '../middlewares/catch-async-errors.js';

import ErrorHandler from '../../util/error/http-error-handler.js';
import { sendToken, clearToken } from '../../util/auth/token.js';
import { sendVerificationEmail } from '../../util/auth/email-verify.js';

// endpoint: /api/auth/password
// method: PUT
// description: Đổi mật khẩu
// role: all role
export const passwordHandler = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  const { password, confirmPassword } = req.body;

  const mergePassword = JSON.stringify({ password, confirmPassword });

  user.password = mergePassword;

  await user.save();

  await RefreshToken.deleteMany({ owner: user });
  clearToken(res);

  res.json({
    success: true,
    message: 'Đổi mật khẩu thành công',
    code: 2049,
  });
});

// endpoint: /api/auth/verify-email
// method: POST
// description: xác nhận email
// role: all role
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
      new ErrorHandler(
        400,
        'Mã xác thực không hợp lệ. Vui lòng kiểm tra lại',
        4062
      )
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

// endpoint: /api/auth/validate-email
// method: POST
// description: xác thực email
// role: All role
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
    return next(new ErrorHandler(500, 'Lỗi gửi xác thực email', 4061));
  }
});

// endpoint: /api/auth/register
// method: POST
// description: đăng ký tài khoản
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

// endpoint: /api/auth/register
// method: POST
// description: đăng nhập
export const loginHandler = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(
      new ErrorHandler(422, 'Vui lòng nhập tên đăng nhập và mật khẩu', 4006)
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

  const accessToken = user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  const userInformation = await user.userRequestInformation();

  sendToken(res, accessToken, refreshToken, userInformation);
});

// endpoint: /api/auth/refresh-token
// method: POST
// description: yêu cầu cấp mới access token
export const refreshTokenHandler = catchAsyncErrors(async (req, res, next) => {
  // string
  const token = req.cookies.refreshToken;

  if (!token) {
    return next(new ErrorHandler(422, 'Yêu cầu không hợp lệ', 4009));
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

  const newAccessToken = user.generateAccessToken();
  const newRefreshToken = await refreshToken.generateRefreshToken();
  const userInformation = await user.userRequestInformation();
  sendToken(res, newAccessToken, newRefreshToken, userInformation);
});

// endpoint: /api/auth/logout
// method: POST
// description: đăng xuất
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

// endpoint: /api/auth/me
// method: GET
// description: lấy thông tin cá nhân
// role: all role
export const meHandler = catchAsyncErrors(async (req, res, next) => {
  const userInformation = await req.user.userRequestInformation();

  res.json({
    success: true,
    user: userInformation,
    code: 2005,
  });
});

// endpoint: /api/auth/forgot-password
// method: POST
// description: yêu cầu đặt lại mật khẩu
export const forgotPasswordHandler = catchAsyncErrors(
  async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({
      email: { $regex: new RegExp(email, 'i') },
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
      return next(
        new ErrorHandler(500, 'Lỗi gửi mã xác thực đặt lại mật khẩu', 4021)
      );
    }
  }
);

// endpoint: /api/auth/verify-otp
// method: POST
// description: xác thực OTP sau khi yêu cầu đặt lại mật khẩu
export const verifyOTPHandler = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await User.findOne({
    email: { $regex: new RegExp(email, 'i') },
    'forgotPassword.otp': otp,
    'forgotPassword.otpExpiresAt': { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        400,
        'Mã xác thực không hợp lệ. Vui lòng kiểm tra lại',
        4023
      )
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

// endpoint: /api/auth/reset-password/:token
// method: POST
// description: đặt lại mật khẩu sau khi xác nhận mã OTP thành công (quên mật khẩu)
export const resetPasswordHandler = catchAsyncErrors(async (req, res, next) => {
  // hash URL token
  // hash request token and then find with hash token in DB
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

  await RefreshToken.deleteMany({ owner: user });
  clearToken(res);

  res.json({
    success: true,
    message: 'Đặt lại mật khẩu thành công',
    code: 2008,
  });
});
