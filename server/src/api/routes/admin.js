import express from 'express';

import authHandler from '../middlewares/auth.js';
import {
  addCounsellorToDepartmentHandler,
  addDepartmentHandler,
  addStaffHandler,
  updateDepartmentHandler,
  updateStatusDepartmentHandler,
  departmentsHandler,
  counsellorsInDepartmentHandler,
  updateDepartmentHeadHandler,
} from '../controllers/admin.js';
import { setDefaultPaginationParams } from '../middlewares/query.js';

const router = express.Router();

// router.use(authHandler('ADMIN'));

router.post('/departments/:id/status', updateStatusDepartmentHandler);
router.get(
  '/departments/:id/counsellors',
  setDefaultPaginationParams,
  counsellorsInDepartmentHandler
);
router.route('/departments/:id').put(updateDepartmentHandler);
router
  .route('/departments')
  .post(addDepartmentHandler)
  .get(setDefaultPaginationParams, departmentsHandler)
  .put(updateDepartmentHeadHandler);

router.route('/staffs').post(addStaffHandler);
router.route('/counsellors').post(addCounsellorToDepartmentHandler);

export default router;
