import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import validator from 'validator';

import ErrorHandler from '../utils/error-handler.js';
import { generateOTP } from '../utils/auth.js';
import RefreshToken from './refresh-token.js';
import Department from './department.js';

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
      message: '{VALUE} không được hổ trợ',
    },
    // kiểm tra nếu role là user thì bắt buộc
    validate: {
      validator: function (v) {
        return !(this.role === 'USER' && validator.isEmpty(v));
      },
      message: 'Vui lòng nhập nghề nghiệp',
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME_IN_MINUTES,
  });
};

userSchema.methods.generateRefreshToken = async function () {
  const refreshToken = new RefreshToken({
    branch: new mongoose.Types.ObjectId(),
    owner: this._id,
  });
  return await refreshToken.save();
};

userSchema.methods.generateForgotPassword = async function () {
  const otp = generateOTP(6);
  this.forgotPassword.otp = otp;
  this.forgotPassword.otpExpiresAt =
    Date.now() +
    process.env.OTP_FORGOT_PASSWORD_EXPIRATION_TIME_IN_SECONDS * 1000; // 1m30s
  await this.save();
  return otp;
};

userSchema.methods.generateVerifyEmail = async function () {
  const otp = generateOTP(6);
  this.verifyEmail.otp = otp;
  this.verifyEmail.otpExpiresAt =
    Date.now() + process.env.OTP_VERIFY_EMAIL_EXPIRATION_TIME_IN_SECONDS * 1000; // 1m30s
  await this.save();
  return otp;
};

userSchema.methods.generateResetPasswordToken = async function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash and set to resetPassword.token
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

userSchema.methods.adminGetUserInfo = async function () {
  const department = await Department.findById(this.counsellor.department);
  return {
    _id: this._id,
    phoneNumber: this.phoneNumber,
    email: this.email,
    role: this.role,
    occupation: this.occupation,
    isEnabled: this.isEnabled,
    departmentName: department ? department.departmentName : null,
  };
};

userSchema.methods.getUserInfo = async function () {
  const department = await Department.findById(this.counsellor.department);
  return {
    _id: this._id,
    fullName: this.fullName,
    email: this.email,
    phoneNumber: this.phoneNumber,
    avatar: this.avatar.url,
    role: this.role,
    occupation: this.occupation,
    departmentName: department ? department.departmentName : null,
  };
};

userSchema.post('find', function (result) {
  return result.map((user) => {
    user.avatar = user.avatar.url;
    return user;
  });
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const { password, confirmPassword } = JSON.parse(this.password);

  if (
    !validator.isLength(password.trim(), { min: 6 }) ||
    !validator.isLength(confirmPassword.trim(), { min: 6 })
  ) {
    next(new ErrorHandler(400, 'Mật khẩu của bạn phải ít nhất 6 ký tự', 4025));
  }

  if (!validator.equals(password, confirmPassword)) {
    next(new ErrorHandler(400, 'Nhập lại mật khẩu không khớp', 4003));
  }
  this.password = await bcrypt.hash(password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
