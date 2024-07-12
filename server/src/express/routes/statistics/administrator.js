import express from 'express';

import * as statistic from '../../controllers/statistics/index.js';
import { handleAuthenticationAndAuthorization } from '../../middlewares/auth.js';
import { defaultPayloadDateForStatistic } from '../../middlewares/default-value/body.js';
import { handleValidateDepartmentId } from '../../middlewares/validate/based-schemas/department.js';
import { handleValidateTimeForStatisticInBody } from '../../middlewares/validate/statistic.js';

const router = express.Router();

// Dành cho ADMIN, SUPERVISOR
router.use(handleAuthenticationAndAuthorization('ADMIN', 'SUPERVISOR'));

router.get(
  '/department/:id/field',
  handleValidateDepartmentId(),
  statistic.handleStatisticFields
);

router.post(
  '/user',
  handleValidateTimeForStatisticInBody,
  statistic.handleStatisticUsers
);

router.get(
  '/',
  statistic.handleStatisticCountUsersAndDepartmentsAndFieldsAndQuestions
);

router.post(
  '/question',
  defaultPayloadDateForStatistic,
  handleValidateTimeForStatisticInBody,
  statistic.handleCountOfQuestion
);

export default router;
