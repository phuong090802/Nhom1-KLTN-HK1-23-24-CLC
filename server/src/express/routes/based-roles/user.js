import express from 'express';

import authHandler from '../../middlewares/auth.js';

import { questionsHandler } from '../../controllers/based-roles/user.js';

import { defaultPaginationParams } from '../../middlewares/query.js';

const router = express.Router();
router.use(authHandler('USER'));

router.route('/questions').get(defaultPaginationParams, questionsHandler);

export default router;
