import express from 'express';

import authHandler from '../../middlewares/auth.js';
import {
  validateDepartmentBeforeAccess,
  validateFeedbackOfCounsellor,
} from '../../middlewares/validate.js';
import {
  deleteFeedbackHandler,
  deleteFeedbacksHandler,
} from '../../controllers/based-roles/counsellor.js';

const router = express.Router();

router.use(authHandler('COUNSELLOR'), validateDepartmentBeforeAccess);

router
  .route('/feedbacks/:id')
  .delete(validateFeedbackOfCounsellor, deleteFeedbackHandler);

router.route('/feedbacks').delete(deleteFeedbacksHandler);

export default router;
