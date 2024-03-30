import express from 'express';

import {
  handleCheckCounsellorIncludesFieldOfQuestion,
  handleValidateDepartmentIdBeforeForwarding,
} from '../../middlewares/validate/based-schemas/forward-question.js';
import { defaultPaginationParams } from '../../middlewares/query.js';
import {
  handleAuthentication,
  handleAuthenticationAndAuthorization,
} from '../../middlewares/auth.js';
import {
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor,
} from '../../middlewares/validate/based-roles/counsellor.js';
import {
  handleValidateDepartmentIdInBody,
  handleCheckStatusOfDepartment,
} from '../../middlewares/validate/based-schemas/department.js';
import {
  handleCheckFeedbackBelongToCounsellor,
  handleValidateFeedbackIdInParams,
} from '../../middlewares/validate/based-schemas/feedback.js';
import { handleCheckFieldBelongToDepartment } from '../../middlewares/validate/based-schemas/field.js';
import {
  handleCheckQuestionBelongToDepartment,
  handleValidateQuestionIdInParams,
  handleValidateStatusOfQuestion,
} from '../../middlewares/validate/based-schemas/question.js';
import * as feedbackController from '../../controllers/based-roles/counsellor/feedback.js';
import * as questionController from '../../controllers/based-roles/counsellor/question.js';

const router = express.Router();

router
  .route('/questions')
  .get(
    ...handleAuthenticationAndAuthorization('DEPARTMENT_HEAD', 'COUNSELLOR'),
    handleCheckDepartmentOfCounsellor,
    handleCheckStatusDepartmentOfCounsellor,
    defaultPaginationParams,
    questionController.handleGetQuestions
  );

router
  .route('/questions/:id')
  .put(
    ...handleAuthenticationAndAuthorization('DEPARTMENT_HEAD', 'COUNSELLOR'),
    handleCheckDepartmentOfCounsellor,
    handleCheckStatusDepartmentOfCounsellor,
    handleValidateQuestionIdInParams,
    handleValidateStatusOfQuestion('unanswered'),
    handleCheckQuestionBelongToDepartment,
    handleCheckCounsellorIncludesFieldOfQuestion,
    handleValidateDepartmentIdInBody,
    handleCheckStatusOfDepartment,
    handleValidateDepartmentIdBeforeForwarding,
    handleCheckFieldBelongToDepartment,
    questionController.handleForwardQuestion
  );

router
  .route('/questions/unanswered-question')
  .get(
    ...handleAuthenticationAndAuthorization('COUNSELLOR'),
    handleCheckDepartmentOfCounsellor,
    handleCheckStatusDepartmentOfCounsellor,
    questionController.handleCheckUnansweredQuestionExists
  );

router
  .route('/feedbacks/:id')
  .delete(
    ...handleAuthenticationAndAuthorization('COUNSELLOR'),
    handleCheckDepartmentOfCounsellor,
    handleCheckStatusDepartmentOfCounsellor,
    handleValidateFeedbackIdInParams,
    handleCheckFeedbackBelongToCounsellor,
    feedbackController.handleDeleteFeedback
  );

router
  .route('/feedbacks')
  .get(
    ...handleAuthenticationAndAuthorization('COUNSELLOR'),
    handleCheckDepartmentOfCounsellor,
    handleCheckStatusDepartmentOfCounsellor,
    feedbackController.handleGetFeedbacks
  )
  .delete(
    ...handleAuthenticationAndAuthorization('COUNSELLOR'),
    handleCheckDepartmentOfCounsellor,
    handleCheckStatusDepartmentOfCounsellor,
    feedbackController.handleDeleteFeedbacks
  );

export default router;
