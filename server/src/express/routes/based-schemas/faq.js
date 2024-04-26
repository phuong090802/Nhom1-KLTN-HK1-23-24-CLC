import express from 'express';

import { handleGetFAQs } from '../../controllers/based-schemas/faq.js';
import { defaultPaginationParams } from '../../middlewares/default-value/query.js';

const router = express.Router();

router.route('/').get(defaultPaginationParams, handleGetFAQs);

export default router;
