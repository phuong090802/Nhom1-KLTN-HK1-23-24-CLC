import express from 'express';

import { defaultPaginationParams } from '../../middlewares/default-value/query.js';
import { handleCheckStatusOfDepartment } from '../../middlewares/validate/based-schemas/department.js';
import { handleValidateDepartmentIdInParams } from '../../middlewares/validate/based-schemas/department.js';
import * as departmentController from '../../controllers/based-schemas/department.js';

const router = express.Router();

router.get(
  '/:id/fields',
  // department
  handleValidateDepartmentIdInParams,
  // status of department
  handleCheckStatusOfDepartment,
  departmentController.handleGetFieldsOfDepartment
);

router.get(
  '/',
  defaultPaginationParams,
  departmentController.handleGetDepartments
);

export default router;
