import express from 'express';

import { handleAuthenticationAndAuthorization } from '../../../middlewares/auth.js';
import {
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor,
} from '../../../middlewares/validate/based-roles/counsellor.js';
import * as counsellorStatistic from '../../../controllers/statistics/based-roles/counsellor.js';
import { handleValidateTimeForStatisticInBody } from '../../../middlewares/validate/statistic.js';

const router = express.Router();

router.use(
  ...handleAuthenticationAndAuthorization('COUNSELLOR', 'DEPARTMENT_HEAD'),
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor
);

router.post(
  '/question',
  handleValidateTimeForStatisticInBody,
  counsellorStatistic.handleStatisticQuestions
);

export default router;
