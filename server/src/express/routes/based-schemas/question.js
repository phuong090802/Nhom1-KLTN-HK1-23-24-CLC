import express from 'express';

import { defaultPaginationParams } from '../../middlewares/query.js';
import {
  handleValidateQuestionIdInParams,
  handleValidateStatusOfQuestion,
} from '../../middlewares/validate/based-schemas/question.js';
import * as questionController from '../../controllers/based-schemas/question.js';

const router = express.Router();

router
  .route('/:id')
  .put(
    handleValidateQuestionIdInParams,
    handleValidateStatusOfQuestion('publicly-answered-and-approved'),
    questionController.handleUpdateViewsOfQuestion
  );

router
  .route('/')
  .get(defaultPaginationParams, questionController.handleGetQuestions);

export default router;
