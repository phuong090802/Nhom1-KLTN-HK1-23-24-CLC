import express from 'express';

import {
  validateDepartmentIdInParams,
  validateStatusOfDepartment,
} from '../../middlewares/validate.js';

import {
  departmentsHandler,
  fieldsHandler,
} from '../../controllers/based-schemas/departments.js';

const router = express.Router();

router.get(
  '/:id/fields',
  validateDepartmentIdInParams,
  validateStatusOfDepartment,
  fieldsHandler
);

router.get('/', departmentsHandler);

export default router;
