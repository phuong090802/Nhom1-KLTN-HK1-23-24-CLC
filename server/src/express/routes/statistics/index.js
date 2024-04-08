import express from 'express';

import * as statistic from '../../controllers/statistics/index.js';
import { handleAuthenticationAndAuthorization } from '../../middlewares/auth.js';

const router = express.Router();

router.use(...handleAuthenticationAndAuthorization('ADMIN', 'SUPERVISOR'));

router.get(
  '/',
  statistic.handleStatisticCountOfUsersAndDepartmentsAndFieldsAndQuestions
);

export default router;
