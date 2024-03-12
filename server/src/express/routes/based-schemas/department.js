import express from 'express';

import {
  validateDepartmentIdInParams,
  validateStatusOfDepartment,
} from '../../middlewares/validate.js';
import { defaultPaginationParams } from '../../middlewares/query.js';

import {
  departmentsHandler,
  fieldsHandler,
} from '../../controllers/based-schemas/department.js';

const router = express.Router();

router.get(
  '/:id/fields',
  validateDepartmentIdInParams,
  validateStatusOfDepartment,
  fieldsHandler
);

router.get('/', defaultPaginationParams, departmentsHandler);

export default router;
