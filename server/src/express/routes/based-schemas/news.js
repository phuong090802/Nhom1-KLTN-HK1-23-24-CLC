import express from 'express';

import { defaultPaginationParams } from '../../middlewares/default-value/query.js';
import { handleGetAllNews } from '../../controllers/based-schemas/news.js';

const router = express.Router();

router.route('/').get(defaultPaginationParams, handleGetAllNews);

export default router;
