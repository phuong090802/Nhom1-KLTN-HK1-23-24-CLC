import express from 'express';

import * as questionController from '../../controllers/based-schemas/question.js';
import { defaultPaginationParams } from '../../middlewares/default-value/query.js';
import {
  handleValidateQuestionId,
  handleValidateStatusOfQuestion,
} from '../../middlewares/validate/based-schemas/question.js';
import { handleOptionalAuthentication } from '../../middlewares/auth.js';

const router = express.Router();

router
  .route('/:id')
  .all(
    // question
    handleValidateQuestionId(),
    // status of question
    handleValidateStatusOfQuestion('publicly-answered-and-approved')
  )
  .get(questionController.handleGetQuestion)
  .put(questionController.handleUpdateViewsOfQuestion);

router
  .route('/')
  .get(
    handleOptionalAuthentication(false),
    defaultPaginationParams,
    questionController.handleGetQuestions
  );

export default router;
