import express from 'express';

import { handleAuthenticationAndAuthorization } from '../../middlewares/auth.js';
import { defaultPaginationParams } from '../../middlewares/query.js';
import {
  handleOptionalUploadFileToFirebase,
  handleUploadImageOrDocument,
} from '../../middlewares/upload-file.js';
import {
  handleCheckCounsellorBelongDepartment,
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor,
} from '../../middlewares/validate/based-roles/counsellor.js';
import {
  handleCheckFieldBelongToDepartment,
  handleValidateFieldIdInBody,
  handleValidateFieldIdInParams,
} from '../../middlewares/validate/based-schemas/field.js';
import { handleCheckStatusOfField } from '../../middlewares/validate/based-roles/department-head.js';
import {
  handleCheckFAQBelongDepartment,
  validateFAQIdInParams,
} from '../../middlewares/validate/based-schemas/faq.js';
import {
  handleValidateRoleUser,
  handleValidateUserIdInParams,
} from '../../middlewares/validate/based-schemas/user.js';
import { handleCheckUnapprovedAnswerExists } from '../../controllers/based-roles/department-head/answer.js';
import { handleCheckUnansweredQuestionExits } from '../../controllers/based-roles/department-head/question.js';
import * as counsellorController from '../../controllers/based-roles/department-head/counsellor.js';
import * as fieldController from '../../controllers/based-roles/department-head/field.js';
import * as faqController from '../../controllers/based-roles/department-head/faq.js';

const router = express.Router();

// check status
router.use(
  ...handleAuthenticationAndAuthorization('DEPARTMENT_HEAD'),
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor
);

router
  .route('/faqs/:id')
  .put(
    // đem lên cùng để multer lấy giá trị chuỗi của form-data và chuyển nó thành req.body
    handleUploadImageOrDocument.single('file'),
    validateFAQIdInParams,
    handleCheckFAQBelongDepartment,
    handleValidateFieldIdInBody,
    handleCheckFieldBelongToDepartment,
    handleCheckStatusOfField,
    handleOptionalUploadFileToFirebase('faqs'),
    faqController.handleUpdateFAQ
  )
  .delete(
    validateFAQIdInParams,
    handleCheckFAQBelongDepartment,
    faqController.handleDeleteFAQ
  );

router
  .route('/faqs')
  .get(defaultPaginationParams, faqController.handleGetFAQs)
  .post(
    // đem lên cùng để multer lấy giá trị chuỗi của form-data và chuyển nó thành req.body
    handleUploadImageOrDocument.single('file'),
    handleValidateFieldIdInBody,
    handleCheckFieldBelongToDepartment,
    handleOptionalUploadFileToFirebase('faqs'),
    faqController.handleCreateFAQ
  );

router
  .route('/answers/unapproved-answer-exists')
  .get(handleCheckUnapprovedAnswerExists);

router
  .route('/questions/unanswered-question')
  .get(handleCheckUnansweredQuestionExits);

router
  .route('/counsellors/:id')
  .put(
    handleValidateUserIdInParams,
    handleValidateRoleUser('COUNSELLOR'),
    handleCheckCounsellorBelongDepartment,
    counsellorController.handleAddFieldToCounsellor
  )
  .delete(
    handleValidateUserIdInParams,
    handleValidateRoleUser('COUNSELLOR'),
    handleCheckCounsellorBelongDepartment,
    handleValidateFieldIdInBody,
    handleCheckFieldBelongToDepartment,
    counsellorController.handleRemoveFieldOfCounsellor
  )
  .patch(
    handleValidateUserIdInParams,
    handleValidateRoleUser('COUNSELLOR'),
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
    handleValidateFieldIdInParams,
    handleCheckFieldBelongToDepartment,
    handleCheckStatusOfField,
    fieldController.handleRenameField
  )
  .patch(
    handleValidateFieldIdInParams,
    handleCheckFieldBelongToDepartment,
    fieldController.handleUpdateStatusOfField
  );

router
  .route('/fields')
  .get(defaultPaginationParams, fieldController.handleGetFields)
  .post(fieldController.handleCreateField);

export default router;
