import express from 'express';

import authHandler from '../../middlewares/auth.js';
import {
  departmentHeadValidateField,
  validateDepartmentBeforeAccess,
  validateFieldIdInParams,
} from '../../middlewares/validate.js';

import {
  addFieldHandler,
  updateFieldHandler,
  updateStatusFieldHandler,
} from '../../controllers/based-roles/department-head.js';

const router = express.Router();

router.use(authHandler('DEPARTMENT_HEAD'), validateDepartmentBeforeAccess);

router.put(
  '/fields/:id/status',
  departmentHeadValidateField,
  updateStatusFieldHandler
);

router.route('/fields/:id').put(validateFieldIdInParams, updateFieldHandler);
router.route('/fields').post(addFieldHandler);

export default router;