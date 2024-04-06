import express from 'express';

import * as feedbackController from '../../controllers/based-roles/counsellor/feedback.js';
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
  handleValidateDepartmentIdInBody,
} from '../../middlewares/validate/based-schemas/department.js';
import {
  handleCheckFeedbackBelongToCounsellor,
  handleValidateFeedbackIdInParams,
} from '../../middlewares/validate/based-schemas/feedback.js';
import { handleCheckFieldBelongToDepartment } from '../../middlewares/validate/based-schemas/field.js';
import {
  handleCheckCounsellorIncludesFieldOfQuestion,
  handleValidateDepartmentIdBeforeForwarding,
} from '../../middlewares/validate/based-schemas/forward-question.js';
import {
  handleCheckQuestionBelongToDepartment,
  handleValidateQuestionIdInParams,
  handleValidateStatusOfQuestion,
} from '../../middlewares/validate/based-schemas/question.js';
import { handleGetFields } from '../../controllers/based-roles/counsellor/field.js';

const router = express.Router();

router.use(handleAuthentication);

router.route('/fields').get(
  // auth
  handleAuthorization('DEPARTMENT_HEAD', 'COUNSELLOR'),
  // department - counsellor before access
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor,

  defaultPaginationParams,
  handleGetFields
);

router.route('/questions').get(
  // auth
  handleAuthorization('DEPARTMENT_HEAD', 'COUNSELLOR'),
  // department - counsellor before access
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor,

  defaultPaginationParams,
  questionController.handleGetQuestions
);

router.route('/questions/:id').put(
  // auth
  handleAuthorization('DEPARTMENT_HEAD', 'COUNSELLOR'),
  // department - counsellor before access
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor,
  // question
  handleValidateQuestionIdInParams,
  // status of question
  handleValidateStatusOfQuestion('unanswered'),
  // question belong department
  handleCheckQuestionBelongToDepartment,
  // counsellor have field of question
  handleCheckCounsellorIncludesFieldOfQuestion,
  // validate new department
  handleValidateDepartmentIdInBody,
  // status of new department
  handleCheckStatusOfDepartment,
  // is not same department
  handleValidateDepartmentIdBeforeForwarding,
  // field belong new department
  handleCheckFieldBelongToDepartment,

  questionController.handleForwardQuestion
);

router.route('/questions/unanswered-question').get(
  // auth
  handleAuthorization('COUNSELLOR'),
  // department - counsellor before access
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor,

  questionController.handleCheckUnansweredQuestionExists
);

router.route('/feedbacks/:id').delete(
  // auth
  handleAuthorization('COUNSELLOR'),
  // department - counsellor before access
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor,
  // feedback
  handleValidateFeedbackIdInParams,
  // belong counsellor
  handleCheckFeedbackBelongToCounsellor,

  feedbackController.handleDeleteFeedback
);

router
  .route('/feedbacks')
  .get(
    // auth
    handleAuthorization('COUNSELLOR'),
    // department - counsellor before access
    handleCheckDepartmentOfCounsellor,
    handleCheckStatusDepartmentOfCounsellor,

    feedbackController.handleGetFeedbacks
  )
  .delete(
    // auth
    handleAuthorization('COUNSELLOR'),
    // department - counsellor before access
    handleCheckDepartmentOfCounsellor,
    handleCheckStatusDepartmentOfCounsellor,

    feedbackController.handleDeleteFeedbacks
  );

export default router;
