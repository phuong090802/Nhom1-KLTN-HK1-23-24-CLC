import express from 'express';

import { handleGetNotifications } from '../../controllers/based-roles/user/notification.js';
import { handleGetQuestions } from '../../controllers/based-roles/user/question.js';
import { handleAuthenticationAndAuthorization } from '../../middlewares/auth.js';
import { defaultPaginationParams } from '../../middlewares/default-value/query.js';

const router = express.Router();

router.use(...handleAuthenticationAndAuthorization('USER'));

router.route('/questions').get(defaultPaginationParams, handleGetQuestions);

router
  .route('/notifications')
  .get(defaultPaginationParams, handleGetNotifications);

export default router;
