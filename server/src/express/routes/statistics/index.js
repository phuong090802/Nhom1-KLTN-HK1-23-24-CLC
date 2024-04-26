import express from 'express';

import * as statistic from '../../controllers/statistics/index.js';
import { handleAuthenticationAndAuthorization } from '../../middlewares/auth.js';
import { handleValidateDepartmentIdInParams } from '../../middlewares/validate/based-schemas/department.js';

const router = express.Router();

// Dành cho ADMIN, SUPERVISOR
router.use(...handleAuthenticationAndAuthorization('ADMIN', 'SUPERVISOR'));

router.get(
  '/department/:id/field',
  handleValidateDepartmentIdInParams,
  statistic.handleStatisticFields
);

router.post('/user', statistic.handleStatisticUsers);

router.get(
  '/',
  statistic.handleStatisticCountUsersAndDepartmentsAndFieldsAndQuestions
);

export default router;
