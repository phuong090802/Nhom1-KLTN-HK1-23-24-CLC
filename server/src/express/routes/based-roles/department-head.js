import express from 'express';

import { departmentHeadValidateField } from '../../middlewares/combine-validate.js';

import {
  validateCounsellorIdInParams,
  validateFieldIdInBodyOfBelongToDepartment,
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

import { validateRoleAndStatusDepartmentBeforeAccess } from '../../middlewares/combine-validate.js';
import {
  defaultPaginationParams,
  departmentHeadLimitFilterRole,
} from '../../middlewares/query.js';

const router = express.Router();

router.use(validateRoleAndStatusDepartmentBeforeAccess('DEPARTMENT_HEAD'));

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
