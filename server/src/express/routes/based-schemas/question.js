import express from 'express';

import { defaultPaginationParams } from '../../middlewares/query.js';

import { questionsHandler } from '../../controllers/based-schemas/question.js';

const router = express.Router();

router.route('/').get(defaultPaginationParams, questionsHandler);

export default router;
