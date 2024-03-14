import express from 'express';

import { defaultPaginationParams } from '../../middlewares/query.js';

import {
  questionsHandler,
  updateViewsHandler,
} from '../../controllers/based-schemas/question.js';
import {
  validateQuestionIdInParams,
  validateStatusOfQuestion,
} from '../../middlewares/validate.js';

const router = express.Router();

router
  .route('/:id')
  .put(
    validateQuestionIdInParams,
    validateStatusOfQuestion('publicly-answered-and-approved'),
    updateViewsHandler
  );

router.route('/').get(defaultPaginationParams, questionsHandler);

export default router;
