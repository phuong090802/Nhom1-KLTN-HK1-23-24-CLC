import express from 'express';

import { handleAuthenticationAndAuthorization } from '../middlewares/auth.js';
import { defaultPaginationParams } from '../middlewares/default-value/query.js';
import { handleValidateDepartmentIdInParams } from '../middlewares/validate/based-schemas/department.js';
import { handleValidateTimeForStatisticInBody } from '../middlewares/validate/statistic.js';
import { defaultPayloadDateForStatistic } from '../middlewares/default-value/body.js';
import * as statisticDepartment from '../controllers/statistics/department.js';

const router = express.Router();

router.use(...handleAuthenticationAndAuthorization('ADMIN'));

router.post(
  '/departments/:id/question',
  handleValidateDepartmentIdInParams,
  defaultPayloadDateForStatistic,
  handleValidateTimeForStatisticInBody,
  statisticDepartment.handleStatisticDepartment
);
router.get(
  '/departments',
  defaultPaginationParams,
  statisticDepartment.handleStatisticDepartments
);

export default router;
