import express from 'express';

import { handleGetNotifications } from '../../controllers/based-roles/user/notification.js';
import {
  handleGetLikedQuestions,
  handleGetQuestions,
  handleLikeQuestion,
} from '../../controllers/based-roles/user/question.js';
import { handleAuthenticationAndAuthorization } from '../../middlewares/auth.js';
import { defaultPaginationParams } from '../../middlewares/default-value/query.js';
import {
  handleValidateQuestionId,
  handleValidateStatusOfQuestion,
} from '../../middlewares/validate/based-schemas/question.js';

const router = express.Router();

router
  .route('/questions/liked')
  .all(handleAuthenticationAndAuthorization('USER'))
  .get(defaultPaginationParams, handleGetLikedQuestions);

router
  .route('/questions/:id')
  .all(handleAuthenticationAndAuthorization('USER'))
  .post(
    handleValidateQuestionId(),
    handleValidateStatusOfQuestion('publicly-answered-and-approved'),
    handleLikeQuestion
  );

router
  .route('/questions')
  .all(handleAuthenticationAndAuthorization('USER'))
  .get(defaultPaginationParams, handleGetQuestions);

router
  .route('/notifications')
  .get(defaultPaginationParams, handleGetNotifications);

export default router;
