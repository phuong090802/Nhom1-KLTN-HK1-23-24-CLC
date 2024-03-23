import express from 'express';

import authHandler from '../../middlewares/auth.js';
import {
  departmentHeadValidateField,
  validateCounsellorIdInParams,
  validateDepartmentBeforeAccess,
  validateFieldIdInBodyOfDepartment,
  validateFieldIdInParams,
} from '../../middlewares/validate.js';

import {
  addCounsellorToDepartment,
  addFieldHandler,
  counsellorsHandler,
  fieldsHandler,
  hasNewAnswersHandler,
  hasNewQuestionsHandler,
  removeFieldOfCounsellor,
  updateFieldHandler,
  updateFieldToCounsellor,
  updateIsEnabledCounsellorHandler,
  updateStatusFieldHandler,
} from '../../controllers/based-roles/department-head.js';

import {
  defaultPaginationParams,
  departmentHeadLimitFilterRole,
} from '../../middlewares/query.js';

const router = express.Router();

router.use(authHandler('DEPARTMENT_HEAD'), validateDepartmentBeforeAccess);

router.route('/answers').get(hasNewAnswersHandler);

router.route('/questions').get(hasNewQuestionsHandler);

router
  .route('/counsellors/:id')
  .put(validateCounsellorIdInParams, updateFieldToCounsellor)
  .delete(
    validateCounsellorIdInParams,
    validateFieldIdInBodyOfDepartment,
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
