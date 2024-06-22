import express from 'express';

import { handleGetNotifications } from '../../controllers/based-roles/user/notification.js';
import {
  handleGetLikedQuestions,
  handleGetQuestions,
  handleLikeQuestion,
} from '../../controllers/based-roles/user/question.js';
import { handleAuthenticationAndAuthorization } from '../../middlewares/auth.js';
import { defaultPaginationParams } from '../../middlewares/default-value/query.js';
import { handleValidateQuestionId } from '../../middlewares/validate/based-schemas/question.js';

const router = express.Router();

router.use(handleAuthenticationAndAuthorization('USER'));

router
  .route('/questions/liked')
  .get(defaultPaginationParams, handleGetLikedQuestions);

router
  .route('/questions/:id')
  .post(handleValidateQuestionId(), handleLikeQuestion);

router.route('/questions').get(defaultPaginationParams, handleGetQuestions);

router
  .route('/notifications')
  .get(defaultPaginationParams, handleGetNotifications);

export default router;
