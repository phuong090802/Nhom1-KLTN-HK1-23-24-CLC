import express from 'express';

import * as departmentController from '../controllers/administrator/department.js';
import { handleAuthenticationAndAuthorization } from '../middlewares/auth.js';
import { defaultPaginationParams } from '../middlewares/default-value/query.js';

const router = express.Router();

router.use(handleAuthenticationAndAuthorization('ADMIN', 'SUPERVISOR'));

router.get(
  '/departments/reminder',
  defaultPaginationParams,
  departmentController.handleGetDepartmentsOverDue
);

export default router;
