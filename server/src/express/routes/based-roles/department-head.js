import express from 'express';

import authHandler from '../../middlewares/auth.js';
import {
  departmentHeadValidateField,
  validateCounsellorIdInParams,
  validateDepartmentBeforeAccess,
  validateFieldIdInBodyOfDepartment,
  validateFieldIdInParams,
  validateQuestionIdInParams,
  validateStatusOfQuestion,
} from '../../middlewares/validate.js';

import {
  addCounsellorToDepartment,
  addFieldHandler,
  approveAnswerHandler,
  counsellorsHandler,
  fieldsHandler,
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

router
  .route('/questions/:id')
  .patch(
    validateQuestionIdInParams,
    validateStatusOfQuestion('publicly-answered-pending-approval'),
    approveAnswerHandler
  );

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
