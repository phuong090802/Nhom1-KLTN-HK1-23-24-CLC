import express from 'express';

import { faqsHandler } from '../../controllers/based-schemas/faq.js';

import { defaultPaginationParams } from '../../middlewares/query.js';

const router = express.Router();

router.route('/').get(defaultPaginationParams, faqsHandler);

export default router;
