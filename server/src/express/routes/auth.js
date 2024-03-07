import express from 'express';

import {
  loginHandler,
  logoutHandler,
  meHandler,
  refreshTokenHandler,
  registerHandler,
  forgotPasswordHandler,
  verifyOTPHandler,
  resetPasswordHandler,
  validateEmailHandler,
  verifyEmailHandler,
} from '../controllers/auth.js';
import { isAuthenticatedHandler } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/refresh-token', refreshTokenHandler);
router.post('/logout', logoutHandler);

router.get('/me', isAuthenticatedHandler, meHandler);
router.post('/forgot-password', forgotPasswordHandler);
router.post('/verify-otp', verifyOTPHandler);
router.post('/reset-password/:token', resetPasswordHandler);

router.post('/validate-email', isAuthenticatedHandler, validateEmailHandler);
router.post('/verify-email', isAuthenticatedHandler, verifyEmailHandler);

export default router;
