import express from 'express';

import { isAuthenticatedHandler } from '../../middlewares/auth.js';

import { updateProfile } from '../../controllers/based-roles/all-role.js';

const router = express.Router();

router.use(isAuthenticatedHandler);

router.route('/').put(updateProfile);

export default router;
