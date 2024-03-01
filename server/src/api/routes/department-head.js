import express from 'express';

import authHandler from '../middlewares/auth.js';
import {
  addFieldHandler,
  updateFieldHandler,
  updateStatusFieldHandler,
} from '../controllers/department-head.js';
import {
  validateDepartmentOfDepartmentHead,
  validateFieldIdInParams,
} from '../middlewares/validate.js';

const router = express.Router();

router.use(authHandler('DEPARTMENT_HEAD'));

router.put(
  '/fields/:id/status',
  validateDepartmentOfDepartmentHead,
  validateFieldIdInParams,
  updateStatusFieldHandler
);

router
  .route('/fields/:id')
  .put(
    validateDepartmentOfDepartmentHead,
    validateFieldIdInParams,
    updateFieldHandler
  );
router
  .route('/fields')
  .post(validateDepartmentOfDepartmentHead, addFieldHandler);

export default router;
