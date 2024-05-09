import express from 'express';

import * as adminStatistic from '../../../controllers/statistics/based-roles/admin.js';
import { handleAuthenticationAndAuthorization } from '../../../middlewares/auth.js';
import { defaultPayloadDateForStatistic } from '../../../middlewares/default-value/body.js';
import { defaultPaginationParams } from '../../../middlewares/default-value/query.js';
import { handleValidateDepartmentId } from '../../../middlewares/validate/based-schemas/department.js';
import { handleValidateTimeForStatisticInBody } from '../../../middlewares/validate/statistic.js';

const router = express.Router();

router.use(...handleAuthenticationAndAuthorization('ADMIN'));

router.post(
  '/question',
  defaultPayloadDateForStatistic,
  handleValidateTimeForStatisticInBody,
  adminStatistic.handleCountOfQuestion
);

router.post(
  '/department/:id/question',
  handleValidateDepartmentId(),
  defaultPayloadDateForStatistic,
  handleValidateTimeForStatisticInBody,
  adminStatistic.handleStatisticQuestions
);

router.get(
  '/department',
  defaultPaginationParams,
  adminStatistic.handleStatisticDepartments
);

export default router;
