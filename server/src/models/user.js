import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import validator from 'validator';

import * as userAction from '../constants/actions/user.js';
import { generateOTP } from '../util/auth/email-verify.js';
import ErrorHandler from '../util/error/http-error-handler.js';
import RefreshToken from './refresh-token.js';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập họ và tên'],
    maxLength: [50, 'Tên của bạn không được vượt quá 50 ký tự'],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Vui lòng nhập email'],
    validate: {
      validator: function (v) {
        // lowercase then check format
        const normalizeEmail = v.toLowerCase();
        return validator.isEmail(normalizeEmail);
      },
      message: 'Vui lòng nhập địa chỉ email hợp lệ',
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  verifyEmail: {
    otp: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
  },
  phoneNumber: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Vui lòng nhập số điện thoại'],
    validate: {
      validator: function (v) {
        // check phone with pattern
        const pattern =
          /^(0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/;
        return pattern.test(v);
      },
      message: 'Vui lòng nhập số điện thoại hợp lệ',
    },
  },
  password: {
    type: String,
    required: [true, 'Vui lòng nhập mật khẩu'],
    minlength: [6, 'Mật khẩu của bạn phải ít nhất 6 ký tự'],
    select: false,
  },
  avatar: {
    ref: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
  },
  isEnabled: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    uppercase: true,
    default: 'USER',
    // check if role USER, occupation is required
    validate: {
      validator: function (v) {
        return !(v === 'USER' && this.occupation === undefined);
      },
      message: 'Vui lòng nhập nghề nghiệp',
    },
    enum: {
      values: ['USER', 'COUNSELLOR', 'DEPARTMENT_HEAD', 'SUPERVISOR', 'ADMIN'],
      message: '{VALUE} không được hổ trợ',
    },
  },
  occupation: {
    type: String,
    trim: true,
    enum: {
      values: ['Học sinh', 'Sinh viên', 'Cựu sinh viên', 'Phụ huynh', 'Khác'],
      message: `'{VALUE}' không được hổ trợ`,
    },
  },
  forgotPassword: {
    otp: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
  },
  resetPassword: {
    token: {
      type: String,
    },
    resetTokenExpiresAt: {
      type: Date,
    },
  },
  counsellor: {
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    fields: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field',
      },
    ],
  },
  pushTokens: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// add method
// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
};

// generate refresh token
userSchema.methods.generateRefreshToken = async function () {
  const refreshToken = new RefreshToken({
    branch: new mongoose.Types.ObjectId(),
    owner: this._id,
  });
  return await refreshToken.save();
};

// generate otp and return for forgot password
userSchema.methods.generateForgotPassword = async function () {
  const otp = generateOTP(6);
  this.forgotPassword.otp = otp;
  this.forgotPassword.otpExpiresAt =
    Date.now() +
    process.env.OTP_FORGOT_PASSWORD_EXPIRATION_TIME_IN_SECONDS * 1000; // 1m30s
  await this.save();
  return otp;
};

// generate otp and return for verify email
userSchema.methods.generateVerifyEmail = async function () {
  const otp = generateOTP(6);
  this.verifyEmail.otp = otp;
  this.verifyEmail.otpExpiresAt =
    Date.now() + process.env.OTP_VERIFY_EMAIL_EXPIRATION_TIME_IN_SECONDS * 1000; // 1m30s
  await this.save();
  return otp;
};

// generate reset password token and return resetToken
userSchema.methods.generateResetPasswordToken = async function () {
  // generate token
  const resetToken = crypto.randomBytes(20).toString('hex');
  // hash and set to resetPassword.token
  this.resetPassword.token = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPassword.resetTokenExpiresAt =
    Date.now() +
    process.env.RESET_PASSWORD_TOKEN_EXPIRATION_TIME_IN_MINUTES * 60 * 1000;
  await this.save();
  return resetToken;
};

// set same structure for ...
userSchema.methods.getUserInformation = function (action) {
  let department = null;
  if (this.counsellor.department) {
    department = this.counsellor.department;
  }
  const baseUser = {
    _id: this._id,
    phoneNumber: this.phoneNumber,
    email: this.email,
    role: this.role,
  };
  switch (action) {
    case userAction.LOGIN:
    case userAction.REFRESH_TOKEN:
    case userAction.ME:
      return {
        ...baseUser,
        fullName: this.fullName,
        avatar: this.avatar.url,
        occupation: this.occupation,
        department,
        isEmailVerified: this.isEmailVerified,
      };
    case userAction.ADMIN_GET_USER:
      return {
        ...baseUser,
        isEnabled: this.isEnabled,
        occupation: this.occupation,
        department,
      };
    case userAction.GET_ALL_STAFFS_IN_DEPARTMENT:
      return {
        ...baseUser,
        fullName: this.fullName,
        avatar: this.avatar.url,
        department: department.departmentName,
      };
    default:
      return baseUser;
  }
};

// add hook
// hash password if it is modified
userSchema.pre('save', async function (next) {
  // password is not is isModified
  if (!this.isModified('password')) {
    return next();
  }
  const { password, confirmPassword } = JSON.parse(this.password);
  // check length of password and confirm password
  if (
    !validator.isLength(password.trim(), { min: 6 }) ||
    !validator.isLength(confirmPassword.trim(), { min: 6 })
  ) {
    return next(
      new ErrorHandler(400, 'Mật khẩu của bạn phải ít nhất 6 ký tự', 4025)
    );
  }
  // check password and confirmPassword equals
  if (!validator.equals(password, confirmPassword)) {
    return next(new ErrorHandler(400, 'Nhập lại mật khẩu không khớp', 4003));
  }
  // encode password
  this.password = await bcrypt.hash(password, 10);
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
