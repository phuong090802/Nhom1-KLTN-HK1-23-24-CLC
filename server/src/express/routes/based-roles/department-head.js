import express from 'express';

import authHandler from '../../middlewares/auth.js';
import {
  departmentHeadValidateField,
  validateDepartmentBeforeAccess,
  validateFieldIdInParams,
} from '../../middlewares/validate.js';

import {
  addFieldHandler,
  fieldsHandler,
  updateFieldHandler,
  updateStatusFieldHandler,
} from '../../controllers/based-roles/department-head.js';

import { defaultPaginationParams } from '../../middlewares/query.js';

const router = express.Router();

router.use(authHandler('DEPARTMENT_HEAD'), validateDepartmentBeforeAccess);

router
  .route('/fields/:id')
  .put(validateFieldIdInParams, updateFieldHandler)
  .patch(departmentHeadValidateField, updateStatusFieldHandler);

router
  .route('/fields')
  .get(defaultPaginationParams, fieldsHandler)
  .post(addFieldHandler);

export default router;
