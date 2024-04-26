import express from 'express';

import * as questionController from '../../controllers/based-schemas/question.js';
import { defaultPaginationParams } from '../../middlewares/default-value/query.js';
import {
  handleValidateQuestionIdInParams,
  handleValidateStatusOfQuestion,
} from '../../middlewares/validate/based-schemas/question.js';

const router = express.Router();

router
  .route('/:id')
  .put(
    // question
    handleValidateQuestionIdInParams,
    // status of question
    handleValidateStatusOfQuestion('publicly-answered-and-approved'),
    questionController.handleUpdateViewsOfQuestion
  );

router
  .route('/')
  .get(defaultPaginationParams, questionController.handleGetQuestions);

export default router;
