import express from 'express';

import { handleAuthenticationAndAuthorization } from '../../../middlewares/auth.js';
import {
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor,
} from '../../../middlewares/validate/based-roles/counsellor.js';
import { handleStatisticFields } from '../../../controllers/statistics/based-roles/counsellor.js';

const router = express.Router();

router.use(
  ...handleAuthenticationAndAuthorization('COUNSELLOR', 'DEPARTMENT_HEAD'),
  handleCheckDepartmentOfCounsellor,
  handleCheckStatusDepartmentOfCounsellor
);

router.get('/field', handleStatisticFields);

export default router;
