import express from 'express';

import * as questionController from '../../../controllers/based-schemas/mobile/question.js';
import { handleOptionalAuthentication } from '../../../middlewares/auth.js';
import { defaultSizeAndSkip } from '../../../middlewares/default-value/query.js';
const router = express.Router();

router
  .route('/')
  .get(
    defaultSizeAndSkip,
    handleOptionalAuthentication(false),
    questionController.handleGetQuestions
  );

export default router;
