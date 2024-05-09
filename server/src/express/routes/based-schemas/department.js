import express from 'express';

import * as departmentController from '../../controllers/based-schemas/department.js';
import { defaultPaginationParams } from '../../middlewares/default-value/query.js';
import {
  handleCheckStatusOfDepartment,
  handleValidateDepartmentId,
} from '../../middlewares/validate/based-schemas/department.js';

const router = express.Router();

router.get(
  '/:id/fields',
  // department
  handleValidateDepartmentId(),
  // status of department
  handleCheckStatusOfDepartment,
  departmentController.handleGetFieldsOfDepartment
);

router.get(
  '/staff',
  defaultPaginationParams,
  departmentController.handleGetStaffsInDepartment
);

router.get(
  '/',
  defaultPaginationParams,
  departmentController.handleGetDepartments
);

export default router;
