import express from 'express';

import * as questionController from '../../../controllers/based-schemas/mobile/question.js';
import { defaultSizeAndSkip } from '../../../middlewares/default-value/query.js';

const router = express.Router();

router
  .route('/')
  .get(defaultSizeAndSkip, questionController.handleGetQuestions);

export default router;
