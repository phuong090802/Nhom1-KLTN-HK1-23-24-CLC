import express from 'express';

import { makeQuestionHandler, updateProfile } from '../controllers/user.js';
import { isAuthenticatedHandler } from '../middlewares/auth.js';

const router = express.Router();
router.use(isAuthenticatedHandler);

router.route('/users').put(updateProfile);
router.route('/questions').post(makeQuestionHandler);

export default router;
