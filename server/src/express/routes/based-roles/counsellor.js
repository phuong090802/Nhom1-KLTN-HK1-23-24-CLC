import express from 'express';

import * as feedbackController from '../../controllers/based-roles/counsellor/feedback.js';
import { handleGetFields } from '../../controllers/based-roles/counsellor/field.js';
import * as questionController from '../../controllers/based-roles/counsellor/question.js';
import {
  handleAuthentication,
  handleAuthorization,
} from '../../middlewares/auth.js';
import { defaultPaginationParams } from '../../middlewares/default-value/query.js';
import {
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor,
} from '../../middlewares/validate/based-roles/counsellor.js';
import {
  handleCheckStatusOfDepartment,
  handleValidateDepartmentId,
} from '../../middlewares/validate/based-schemas/department.js';
import {
  handleCheckFeedbackBelongToCounsellor,
  handleValidateFeedbackId,
} from '../../middlewares/validate/based-schemas/feedback.js';
import {
  handleCheckFieldBelongToDepartment,
  handleValidateFieldId,
} from '../../middlewares/validate/based-schemas/field.js';
import {
  handleCheckCounsellorIncludesFieldOfQuestion,
  handleValidateDepartmentIdBeforeForwarding,
} from '../../middlewares/validate/based-schemas/forward-question.js';
import {
  handleCheckQuestionBelongToDepartment,
  handleValidateQuestionId,
  handleValidateStatusOfQuestion,
} from '../../middlewares/validate/based-schemas/question.js';

const router = express.Router();

router.use(handleAuthentication);

router
  .route('/fields')
  .all(
    // auth
    handleAuthorization('DEPARTMENT_HEAD', 'COUNSELLOR'),
    // department - counsellor before access
    handleCheckDepartmentOfCounsellor,
    handleCheckStatusDepartmentOfCounsellor
  )
  .get(defaultPaginationParams, handleGetFields);

router
  .route('/questions')
  .all(
    // auth
    handleAuthorization('DEPARTMENT_HEAD', 'COUNSELLOR'),
    // department - counsellor before access
    handleCheckDepartmentOfCounsellor,
    handleCheckStatusDepartmentOfCounsellor
  )
  .get(defaultPaginationParams, questionController.handleGetQuestions);

router
  .route('/questions/:id')
  .all(
    // auth
    handleAuthorization('DEPARTMENT_HEAD', 'COUNSELLOR'),
    // department - counsellor before access
    handleCheckDepartmentOfCounsellor,
    handleCheckStatusDepartmentOfCounsellor
  )
  .put(
    // question
    handleValidateQuestionId(),
    // status of question
    handleValidateStatusOfQuestion('unanswered'),
    // question belong department
    handleCheckQuestionBelongToDepartment,
    // counsellor have field of question
    handleCheckCounsellorIncludesFieldOfQuestion,
    // validate new department
    handleValidateDepartmentId('body', 'departmentId'),
    // status of new department
    handleCheckStatusOfDepartment,
    // is not same department
    handleValidateDepartmentIdBeforeForwarding,
    // validate field in body
    handleValidateFieldId('body', 'fieldId'),
    // field belong new department
    handleCheckFieldBelongToDepartment,
    questionController.handleForwardQuestion
  );

router
  .route('/questions/unanswered-question')
  .all(
    // auth
    handleAuthorization('COUNSELLOR'),
    // department - counsellor before access
    handleCheckDepartmentOfCounsellor,
    handleCheckStatusDepartmentOfCounsellor
  )
  .get(questionController.handleCheckUnansweredQuestionExists);

router
  .route('/feedbacks/:id')
  .all(
    // auth
    handleAuthorization('COUNSELLOR'),
    // department - counsellor before access
    handleCheckDepartmentOfCounsellor,
    handleCheckStatusDepartmentOfCounsellor
  )
  .delete(
    // feedback
    handleValidateFeedbackId(),
    // belong counsellor
    handleCheckFeedbackBelongToCounsellor,
    feedbackController.handleDeleteFeedback
  );

router
  .route('/feedbacks')
  .all(
    // auth
    handleAuthorization('COUNSELLOR'),
    // department - counsellor before access
    handleCheckDepartmentOfCounsellor,
    handleCheckStatusDepartmentOfCounsellor
  )
  .get(feedbackController.handleGetFeedbacks)
  .delete(feedbackController.handleDeleteFeedbacks);

export default router;
