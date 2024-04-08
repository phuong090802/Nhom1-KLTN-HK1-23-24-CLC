import express from 'express';

import * as statisticQuestion from '../../../controllers/statistics/schemas/question.js';
import { handleAuthenticationAndAuthorization } from '../../../middlewares/auth.js';
import { defaultPayloadDateForStatistic } from '../../../middlewares/default-value/body.js';
import { handleValidateTimeForStatisticInBody } from '../../../middlewares/validate/statistic.js';

const router = express.Router();

router.use(...handleAuthenticationAndAuthorization('ADMIN'));

router.post(
  '/',
  defaultPayloadDateForStatistic,
  handleValidateTimeForStatisticInBody,
  statisticQuestion.handleStatisticQuestions
);

export default router;
