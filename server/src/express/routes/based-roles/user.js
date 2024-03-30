import express from 'express';

import { handleAuthenticationAndAuthorization } from '../../middlewares/auth.js';
import { defaultPaginationParams } from '../../middlewares/query.js';
import { handleGetQuestions } from '../../controllers/based-roles/user/question.js';

const router = express.Router();

router.use(...handleAuthenticationAndAuthorization('USER'));

router.route('/questions').get(defaultPaginationParams, handleGetQuestions);

export default router;
