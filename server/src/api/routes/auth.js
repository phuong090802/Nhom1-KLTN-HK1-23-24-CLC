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
} from '../controllers/auth.js';
import { isAuthenticatedHandler } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/refresh-token', refreshTokenHandler);
router.post('/logout', logoutHandler);

// outsourcing to const authAllRole = [isAuthenticatedUser, authorizeRoles('USER', 'COUNSELLOR', 'DEPARTMENT_HEAD', 'SUPERVISOR', 'ADMIN')]
// then router.use(authAllRole)
// router.use(authHandler('USER', 'COUNSELLOR', 'DEPARTMENT_HEAD', 'SUPERVISOR', 'ADMIN'));
router.get('/me', isAuthenticatedHandler, meHandler);
router.post('/forgot-password', forgotPasswordHandler);
router.post('/verify-otp', verifyOTPHandler);
router.post('/reset-password/:token', resetPasswordHandler);

export default router;
