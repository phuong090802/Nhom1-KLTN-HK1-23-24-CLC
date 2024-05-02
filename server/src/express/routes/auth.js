import express from 'express';

import * as authController from '../controllers/auth.js';
import {
  handleAuthentication,
  handleAuthenticationAndAuthorization,
} from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', authController.handleRegister);
router.post('/login', authController.handleLogin);
router.post('/refresh-token', authController.handleRefreshToken);
router.post('/logout', authController.handleLogout);
router.get('/me', handleAuthentication, authController.handleGetMe);
router.post('/forgot-password', authController.handleForgotPassword);
router.post('/verify-otp', authController.handleVerifyOTP);
router.post('/reset-password/:token', authController.handleResetPassword);

router.post(
  '/validate-email',
  // auth
  handleAuthentication,
  authController.handleValidateEmail
);

router.post(
  '/verify-email',
  // auth
  handleAuthentication,
  authController.handleVerifyEmail
);

router.put(
  '/password',
  // auth
  handleAuthentication,
  authController.handleChangePassword
);

router.get(
  '/is-verified-email',
  // auth
  ...handleAuthenticationAndAuthorization(
    'USER',
    'COUNSELLOR',
    'DEPARTMENT_HEAD',
    'SUPERVISOR'
  ),
  authController.handleEmailIsVerified
);

export default router;
