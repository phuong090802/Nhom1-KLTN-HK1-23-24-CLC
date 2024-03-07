import express from 'express';

import authHandler from '../../middlewares/auth.js';
import {
  validateDepartmentIdInBody,
  validateDepartmentIdInParams,
  validateRoles,
  adminValidateStatusOfDepartment,
  validateUserIdInParams,
  validateUserIdInBodyWithRole,
} from '../../middlewares/validate.js';
import { defaultPaginationParams } from '../../middlewares/query.js';

import {
  addCounsellorToDepartmentHandler,
  addDepartmentHandler,
  addStaffHandler,
  counsellorsInDepartmentHandler,
  departmentsHandler,
  updateDepartmentHandler,
  updateDepartmentHeadHandler,
  updateEnabledUserHandler,
  updateStatusDepartmentHandler,
  userHandler,
  usersHandler,
} from '../../controllers/based-roles/admin.js';



const router = express.Router();

router.use(authHandler('ADMIN'));

router
  .route('/users/:id')
  .get(validateUserIdInParams, userHandler)
  .put(validateUserIdInParams, updateEnabledUserHandler);

router.route('/users').get(defaultPaginationParams, usersHandler);

router.put(
  '/departments/:id/status',
  validateDepartmentIdInParams,
  updateStatusDepartmentHandler
);

router.get(
  '/departments/:id/counsellors',
  validateDepartmentIdInParams,
  defaultPaginationParams,
  counsellorsInDepartmentHandler
);

router
  .route('/departments/:id')
  .put(
    validateDepartmentIdInParams,
    adminValidateStatusOfDepartment,
    updateDepartmentHandler
  );

router
  .route('/departments')
  .post(addDepartmentHandler)
  .get(defaultPaginationParams, departmentsHandler)
  .put(
    validateDepartmentIdInBody,
    adminValidateStatusOfDepartment,
    validateUserIdInBodyWithRole('COUNSELLOR'),
    updateDepartmentHeadHandler
  );

router
  .route('/staffs')
  .post(validateRoles('COUNSELLOR', 'SUPERVISOR'), addStaffHandler);

router
  .route('/counsellors')
  .post(
    validateUserIdInBodyWithRole('COUNSELLOR'),
    validateDepartmentIdInBody,
    adminValidateStatusOfDepartment,
    addCounsellorToDepartmentHandler
  );

export default router;
