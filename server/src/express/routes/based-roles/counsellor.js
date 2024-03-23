import express from 'express';

import authHandler from '../../middlewares/auth.js';
import {
  validateDepartmentBeforeAccess,
  validateFeedbackOfCounsellor
} from '../../middlewares/validate.js';

import {
  deleteFeedbackHandler,
  deleteFeedbacksHandler,
  feedbacksHandler,
  hasNewQuestionsHandler
} from '../../controllers/based-roles/counsellor.js';

const router = express.Router();

router
  .route('/questions')
  .get(
    authHandler('COUNSELLOR'),
    validateDepartmentBeforeAccess,
    hasNewQuestionsHandler
  );

router
  .route('/feedbacks/:id')
  .delete(
    authHandler('COUNSELLOR'),
    validateDepartmentBeforeAccess,
    validateFeedbackOfCounsellor,
    deleteFeedbackHandler
  );

router
  .route('/feedbacks')
  .get(
    authHandler('COUNSELLOR'),
    validateDepartmentBeforeAccess,
    feedbacksHandler
  )
  .delete(
    authHandler('COUNSELLOR'),
    validateDepartmentBeforeAccess,
    deleteFeedbacksHandler
  );

export default router;
