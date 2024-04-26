import express from 'express';

import { handleGetAllNews } from '../../controllers/based-schemas/news.js';
import { defaultPaginationParams } from '../../middlewares/default-value/query.js';

const router = express.Router();

router.route('/').get(defaultPaginationParams, handleGetAllNews);

export default router;
