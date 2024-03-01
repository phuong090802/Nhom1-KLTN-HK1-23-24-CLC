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
  usersHandler,
  updateEnabledUserHandler,
  userHandler,
} from '../controllers/admin.js';
import { setDefaultPaginationParams } from '../middlewares/query.js';
import {
  validateRoleInBody,
  validateDepartmentIdInBody,
  validateDepartmentIdInParams,
  validateRoleIdInParam,
  validateRoles,
  validateUserIdInParams,
} from '../middlewares/validate.js';

const router = express.Router();

router.use(authHandler('ADMIN'));

router
  .route('/users/:id/is-enabled')
  .put(validateRoleIdInParam('USER'), updateEnabledUserHandler);

router.route('/users/:id').get(validateUserIdInParams, userHandler);

router.route('/users').get(setDefaultPaginationParams, usersHandler);

router.put(
  '/departments/:id/status',
  validateDepartmentIdInParams,
  updateStatusDepartmentHandler
);

router.get(
  '/departments/:id/counsellors',
  validateDepartmentIdInParams,
  setDefaultPaginationParams,
  counsellorsInDepartmentHandler
);

router
  .route('/departments/:id')
  .put(validateDepartmentIdInParams, updateDepartmentHandler);

router
  .route('/departments')
  .post(addDepartmentHandler)
  .get(setDefaultPaginationParams, departmentsHandler)
  .put(
    validateDepartmentIdInBody,
    validateRoleInBody('COUNSELLOR'),
    updateDepartmentHeadHandler
  );

router
  .route('/staffs')
  .post(validateRoles('COUNSELLOR', 'SUPERVISOR'), addStaffHandler);

router
  .route('/counsellors')
  .post(
    validateRoleInBody('COUNSELLOR'),
    validateDepartmentIdInBody,
    addCounsellorToDepartmentHandler
  );

export default router;
