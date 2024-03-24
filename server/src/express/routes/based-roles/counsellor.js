import express from 'express';

import {
  validateCounsellorIncludesFieldOfQuestion,
  validateDepartmentIdBeforeForwarding,
  validateFeedbackOfCounsellor,
  validateFieldIdInBodyOfBelongToDepartment,
  validateQuestionBelongToDepartment,
} from '../../middlewares/validate.js';

import {
  deleteFeedbackHandler,
  deleteFeedbacksHandler,
  feedbacksHandler,
  forwardQuestionHandler,
  hasNewQuestionsHandler,
} from '../../controllers/based-roles/counsellor.js';
import {
  validateDepartmentInBody,
  validateRoleAndStatusDepartmentBeforeAccess,
  validateStatusQuestionInParams,
} from '../../middlewares/combine-validate.js';

const router = express.Router();

router
  .route('/questions/:id')
  .put(
    validateRoleAndStatusDepartmentBeforeAccess(
      'DEPARTMENT_HEAD',
      'COUNSELLOR'
    ),
    validateStatusQuestionInParams('unanswered'),
    validateQuestionBelongToDepartment,
    validateCounsellorIncludesFieldOfQuestion,
    validateDepartmentInBody,
    validateDepartmentIdBeforeForwarding,
    validateFieldIdInBodyOfBelongToDepartment,
    forwardQuestionHandler
  );

router
  .route('/questions')
  .get(
    validateRoleAndStatusDepartmentBeforeAccess('COUNSELLOR'),
    hasNewQuestionsHandler
  );

router
  .route('/feedbacks/:id')
  .delete(
    validateRoleAndStatusDepartmentBeforeAccess('COUNSELLOR'),
    validateFeedbackOfCounsellor,
    deleteFeedbackHandler
  );

router
  .route('/feedbacks')
  .get(
    validateRoleAndStatusDepartmentBeforeAccess('COUNSELLOR'),
    feedbacksHandler
  )
  .delete(
    validateRoleAndStatusDepartmentBeforeAccess('COUNSELLOR'),
    deleteFeedbacksHandler
  );

export default router;
