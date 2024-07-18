import express from 'express';

import { handleGetNotifications } from '../../controllers/based-roles/user/notification.js';
import {
  handleGetLikedQuestions,
  handleGetQuestions,
  handleLikeQuestion,
  handleRatingQuestion,
} from '../../controllers/based-roles/user/question.js';
import {
  handleAuthorization,
  handleOptionalAuthentication,
} from '../../middlewares/auth.js';
import { defaultPaginationParams } from '../../middlewares/default-value/query.js';
import {
  handleCheckRating,
  handleCheckRatingValue,
} from '../../middlewares/validate/based-roles/user.js';
import {
  handleValidateQuestionId,
  handleValidateStatusOfQuestion,
} from '../../middlewares/validate/based-schemas/question.js';

const router = express.Router();

router.use(handleOptionalAuthentication());

router
  .route('/questions/liked')
  .all(handleAuthorization('USER'))
  .get(defaultPaginationParams, handleGetLikedQuestions);

router
  .route('/questions/:id/rating')
  .put(
    handleValidateQuestionId(),
    handleValidateStatusOfQuestion('publicly-answered-and-approved'),
    handleCheckRating,
    handleCheckRatingValue,
    handleRatingQuestion
  );

router
  .route('/questions/:id')
  .all(handleAuthorization('USER'))
  .post(
    handleValidateQuestionId(),
    handleValidateStatusOfQuestion('publicly-answered-and-approved'),
    handleLikeQuestion
  );

router
  .route('/questions')
  .all(handleAuthorization('USER'))
  .get(defaultPaginationParams, handleGetQuestions);

router
  .route('/notifications')
  .get(defaultPaginationParams, handleGetNotifications);

export default router;
