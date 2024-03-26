import express from 'express';

import {
  departmentHeadValidateField,
  validateFAQ,
} from '../../middlewares/combine-validate.js';

import {
  validateCounsellorIdInParams,
  validateFieldIdInBodyOfBelongToDepartment,
  validateFieldIdInParams,
} from '../../middlewares/validate.js';

import {
  addCounsellorToDepartment,
  addFieldHandler,
  counsellorsHandler,
  createFAQHandler,
  deleteFAQHandler,
  fieldsHandler,
  hasNewAnswersHandler,
  hasNewQuestionsHandler,
  removeFieldOfCounsellor,
  updateFAQHandler,
  updateFieldHandler,
  updateFieldToCounsellor,
  updateIsEnabledCounsellorHandler,
  updateStatusFieldHandler,
} from '../../controllers/based-roles/department-head.js';

import { validateRoleAndStatusDepartmentBeforeAccess } from '../../middlewares/combine-validate.js';
import {
  defaultPaginationParams,
  departmentHeadLimitFilterRole,
} from '../../middlewares/query.js';
import {
  optionalUploadFileToFirebaseHandler,
  uploadImageOrDocumentHandler,
} from '../../middlewares/upload-file.js';

const router = express.Router();

router.use(validateRoleAndStatusDepartmentBeforeAccess('DEPARTMENT_HEAD'));

router
  .route('/faqs/:id')
  .put(
    // đem lên cùng để multer lấy giá trị chuỗi của form-data và chuyển nó thành req.body
    validateFAQ,
    uploadImageOrDocumentHandler.single('file'),
    validateFieldIdInBodyOfBelongToDepartment,
    optionalUploadFileToFirebaseHandler('faqs'),
    updateFAQHandler
  )
  .delete(validateFAQ, deleteFAQHandler);

router.route('/faqs').post(
  // đem lên cùng để multer lấy giá trị chuỗi của form-data và chuyển nó thành req.body
  uploadImageOrDocumentHandler.single('file'),
  validateFieldIdInBodyOfBelongToDepartment,
  optionalUploadFileToFirebaseHandler('faqs'),
  createFAQHandler
);

router.route('/answers').get(hasNewAnswersHandler);

router.route('/questions').get(hasNewQuestionsHandler);

router
  .route('/counsellors/:id')
  .put(validateCounsellorIdInParams, updateFieldToCounsellor)
  .delete(
    validateCounsellorIdInParams,
    validateFieldIdInBodyOfBelongToDepartment,
    removeFieldOfCounsellor
  )
  .patch(validateCounsellorIdInParams, updateIsEnabledCounsellorHandler);

router
  .route('/counsellors')
  .get(
    defaultPaginationParams,
    departmentHeadLimitFilterRole,
    counsellorsHandler
  )
  .post(addCounsellorToDepartment);

router
  .route('/fields/:id')
  .put(validateFieldIdInParams, updateFieldHandler)
  .patch(departmentHeadValidateField, updateStatusFieldHandler);

router
  .route('/fields')
  .get(defaultPaginationParams, fieldsHandler)
  .post(addFieldHandler);

export default router;
