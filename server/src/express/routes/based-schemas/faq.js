import express from 'express';

import { defaultPaginationParams } from '../../middlewares/query.js';
import { handleGetFAQs } from '../../controllers/based-schemas/faq.js';

const router = express.Router();

router.route('/').get(defaultPaginationParams, handleGetFAQs);

export default router;
