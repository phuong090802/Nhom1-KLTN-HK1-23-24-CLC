import express from 'express';

import * as departmentHeadStatistic from '../../../controllers/statistics/based-roles/department-head.js';
import { handleAuthenticationAndAuthorization } from '../../../middlewares/auth.js';
import {
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor,
} from '../../../middlewares/validate/based-roles/counsellor.js';
import { handleValidateTimeForStatisticInBody } from '../../../middlewares/validate/statistic.js';

const router = express.Router();

router.use(
  ...handleAuthenticationAndAuthorization('DEPARTMENT_HEAD'),
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor
);

router.get('/faq', departmentHeadStatistic.handleCountOfFAQs);
router.get('/counsellor', departmentHeadStatistic.handleCountOfCounsellors);
router.get('/field', departmentHeadStatistic.handleStatisticFields);
router.post(
  '/question',
  handleValidateTimeForStatisticInBody,
  departmentHeadStatistic.handleStatisticQuestions
);

export default router;
