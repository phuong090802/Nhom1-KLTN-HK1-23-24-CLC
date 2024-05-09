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
  handleValidateFAQId,
} from '../../middlewares/validate/based-schemas/faq.js';
import {
  handleCheckFieldBelongToDepartment,
  handleValidateFieldId,
} from '../../middlewares/validate/based-schemas/field.js';
import {
  handleValidateRoleUser,
  handleValidateUserId,
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
  .all(
    // faq
    handleValidateFAQId(),
    // faq belong department
    handleCheckFAQBelongDepartment
  )
  .put(
    // đem lên cùng để multer lấy giá trị chuỗi của form-data và chuyển nó thành req.body
    handleUploadImageOrDocument.single('file'),
    // new field
    handleValidateFieldId('body', 'fieldId'),
    // new field belong department
    handleCheckFieldBelongToDepartment,
    // status of new field
    handleCheckStatusOfField,
    handleOptionalUploadFileToFirebase('faqs'),
    faqController.handleUpdateFAQ
  )
  .delete(faqController.handleDeleteFAQ);

router
  .route('/faqs')
  .get(defaultPaginationParams, faqController.handleGetFAQs)
  .post(
    // đem lên cùng để multer lấy giá trị chuỗi của form-data và chuyển nó thành req.body
    handleUploadImageOrDocument.single('file'),
    // field
    handleValidateFieldId('body', 'fieldId'),
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
  .all(
    // user
    handleValidateUserId(),
    // role counsellor
    handleValidateRoleUser('COUNSELLOR'),
    // counsellor belong department
    handleCheckCounsellorBelongDepartment
  )
  .put(counsellorController.handleAddFieldToCounsellor)
  .delete(
    handleValidateFieldId('body', 'fieldId'),
    handleCheckFieldBelongToDepartment,
    counsellorController.handleRemoveFieldOfCounsellor
  )
  .patch(counsellorController.handleUpdateStatusOfCounsellor);

router
  .route('/counsellors')
  .get(defaultPaginationParams, counsellorController.handleGetCounsellors)
  .post(counsellorController.handleCreateCounsellor);

router
  .route('/fields/:id')
  .all(
    // field
    handleValidateFieldId(),
    // field belong department
    handleCheckFieldBelongToDepartment
  )
  .put(
    // status of field
    handleCheckStatusOfField,
    fieldController.handleRenameField
  )
  .patch(
    handleCheckFieldBelongToDepartment,
    fieldController.handleUpdateStatusOfField
  );

router
  .route('/fields')
  .get(defaultPaginationParams, fieldController.handleGetFields)
  .post(fieldController.handleCreateField);

export default router;
