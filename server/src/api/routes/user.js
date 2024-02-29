import express from 'express';

import { updateProfile } from '../controllers/user.js';
import { isAuthenticatedHandler } from '../middlewares/auth.js';

const router = express.Router();
router.use(isAuthenticatedHandler);

router.route('/').put(updateProfile);

export default router;
