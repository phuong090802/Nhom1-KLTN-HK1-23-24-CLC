import express from 'express';

import authHandler from '../middlewares/auth.js';
import {
  addCounsellorToDepartmentHandler,
  addDepartmentHandler,
  addStaffHandler,
  updateDepartmentHandler,
  updateStatusDepartmentHandler,
} from '../controllers/admin.js';

const router = express.Router();

router.use(authHandler('ADMIN'));

router.post('/departments/:id/status', updateStatusDepartmentHandler);
router.route('/departments/:id').put(updateDepartmentHandler);
router.route('/departments').post(addDepartmentHandler);

router.route('/staffs').post(addStaffHandler);
router.route('/counsellors').post(addCounsellorToDepartmentHandler);

export default router;
