import express from 'express';

import * as userStatistic from '../../../controllers/statistics/based-roles/user.js';
import { handleAuthenticationAndAuthorization } from '../../../middlewares/auth.js';

const router = express.Router();

router.use(handleAuthenticationAndAuthorization('USER'));

router.get('/question', userStatistic.handleCountLikedQuestion);

export default router;
