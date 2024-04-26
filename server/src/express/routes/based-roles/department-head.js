import express from 'express';

import { handleCheckUnapprovedAnswerExists } from '../../controllers/based-roles/department-head/answer.js';
import * as counsellorController from '../../controllers/based-roles/department-head/counsellor.js';
import * as faqController from '../../controllers/based-roles/department-head/faq.js';
import * as fieldController from '../../controllers/based-roles/department-head/field.js';
import * as questionController from '../../controllers/based-roles/department-head/question.js';
import { handleAuthenticationAndAuthorization } from '../../middlewares/auth.js';
import { defaultPaginationParams } from '../../middlewares/default-value/query.js';
import {
  handleOptionalUploadFileToFirebase,
  handleUploadImageOrDocument,
} from '../../middlewares/upload-file.js';
import {
  handleCheckCounsellorBelongDepartment,
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor,
} from '../../middlewares/validate/based-roles/counsellor.js';
import { handleCheckStatusOfField } from '../../middlewares/validate/based-roles/department-head.js';
import {
  handleCheckFAQBelongDepartment,
  handleValidateFAQIdInParams,
} from '../../middlewares/validate/based-schemas/faq.js';
import {
  handleCheckFieldBelongToDepartment,
  handleValidateFieldIdInBody,
  handleValidateFieldIdInParams,
} from '../../middlewares/validate/based-schemas/field.js';
import {
  handleValidateRoleUser,
  handleValidateUserIdInParams,
} from '../../middlewares/validate/based-schemas/user.js';

const router = express.Router();

// check status
router.use(
  // auth
  ...handleAuthenticationAndAuthorization('DEPARTMENT_HEAD'),
  // department - department head before access
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor
);

router
  .route('/faqs/:id')
  .put(
    // đem lên cùng để multer lấy giá trị chuỗi của form-data và chuyển nó thành req.body
    handleUploadImageOrDocument.single('file'),
    // faq
    handleValidateFAQIdInParams,
    // faq belong department
    handleCheckFAQBelongDepartment,
    // new field
    handleValidateFieldIdInBody,
    // new field belong department
    handleCheckFieldBelongToDepartment,
    // status of new field
    handleCheckStatusOfField,

    handleOptionalUploadFileToFirebase('faqs'),
    faqController.handleUpdateFAQ
  )
  .delete(
    // faq
    handleValidateFAQIdInParams,
    // faq belong department
    handleCheckFAQBelongDepartment,

    faqController.handleDeleteFAQ
  );

router
  .route('/faqs')
  .get(defaultPaginationParams, faqController.handleGetFAQs)
  .post(
    // đem lên cùng để multer lấy giá trị chuỗi của form-data và chuyển nó thành req.body
    handleUploadImageOrDocument.single('file'),
    // field
    handleValidateFieldIdInBody,
    // field belong department
    handleCheckFieldBelongToDepartment,

    handleOptionalUploadFileToFirebase('faqs'),
    faqController.handleCreateFAQ
  );

router
  .route('/answers/unapproved-answer-exists')
  .get(handleCheckUnapprovedAnswerExists);

router
  .route('/questions/unanswered-question')
  .get(questionController.handleCheckUnansweredQuestionExits);

router
  .route('/questions')
  .get(
    defaultPaginationParams,
    questionController.handleGetQuestionsIsPendingApproval
  );

router
  .route('/counsellors/:id')
  .put(
    // user
    handleValidateUserIdInParams,
    // role counsellor
    handleValidateRoleUser('COUNSELLOR'),
    // counsellor belong department
    handleCheckCounsellorBelongDepartment,

    counsellorController.handleAddFieldToCounsellor
  )
  .delete(
    // user
    handleValidateUserIdInParams,
    // counsellor
    handleValidateRoleUser('COUNSELLOR'),
    // counsellor belong department
    handleCheckCounsellorBelongDepartment,

    counsellorController.handleRemoveFieldOfCounsellor
  )
  .patch(
    // user
    handleValidateUserIdInParams,
    // counsellor
    handleValidateRoleUser('COUNSELLOR'),
    // belong department
    handleCheckCounsellorBelongDepartment,
    counsellorController.handleUpdateStatusOfCounsellor
  );

router
  .route('/counsellors')
  .get(defaultPaginationParams, counsellorController.handleGetCounsellors)
  .post(counsellorController.handleCreateCounsellor);

router
  .route('/fields/:id')
  .put(
    // field
    handleValidateFieldIdInParams,
    // field belong department
    handleCheckFieldBelongToDepartment,
    // status of field
    handleCheckStatusOfField,
    fieldController.handleRenameField
  )
  .patch(
    // field
    handleValidateFieldIdInParams,
    // field belong department
    handleCheckFieldBelongToDepartment,
    fieldController.handleUpdateStatusOfField
  );

router
  .route('/fields')
  .get(defaultPaginationParams, fieldController.handleGetFields)
  .post(fieldController.handleCreateField);

export default router;
