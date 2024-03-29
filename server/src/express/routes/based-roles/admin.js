import express from 'express';

import authHandler from '../../middlewares/auth.js';
import { defaultPaginationParams } from '../../middlewares/query.js';
import {
  permissionsCannotBeModified,
  validateDepartmentIdInParams,
  validateFileInFormData,
  validateRoleInBody,
  validateUserIdInBodyWithRole,
  validateUserIdInParams,
} from '../../middlewares/validate.js';

import {
  addCounsellorToDepartmentHandler,
  addDepartmentHandler,
  addStaffHandler,
  counsellorsInDepartmentHandler,
  departmentsHandler,
  updateDepartmentHandler,
  updateDepartmentHeadHandler,
  updateIsEnabledUserHandler,
  updateStatusDepartmentHandler,
  uploadCounsellorHandler,
  userHandler,
  usersHandler,
} from '../../controllers/based-roles/admin.js';
import {
  adminValidateDepartmentInBody,
  adminValidateDepartmentInParams,
} from '../../middlewares/combine-validate.js';
import { uploadCSVHandler } from '../../middlewares/upload-file.js';

const router = express.Router();

router.use(authHandler('ADMIN'));

router
  .route('/users/:id')
  .get(validateUserIdInParams, userHandler)
  .put(
    validateUserIdInParams,
    permissionsCannotBeModified('ADMIN'),
    updateIsEnabledUserHandler
  );

router.route('/users').get(defaultPaginationParams, usersHandler);

router.get(
  '/departments/:id/counsellors',
  validateDepartmentIdInParams,
  defaultPaginationParams,
  counsellorsInDepartmentHandler
);

router
  .route('/departments/:id')
  .put(adminValidateDepartmentInParams, updateDepartmentHandler)
  .patch(validateDepartmentIdInParams, updateStatusDepartmentHandler);

router
  .route('/departments')
  .post(addDepartmentHandler)
  .get(defaultPaginationParams, departmentsHandler)
  .put(
    adminValidateDepartmentInBody,
    validateUserIdInBodyWithRole('COUNSELLOR'),
    updateDepartmentHeadHandler
  );

router
  .route('/staffs')
  .post(validateRoleInBody('COUNSELLOR', 'SUPERVISOR'), addStaffHandler);

router.post(
  '/counsellors/upload',
  uploadCSVHandler.single('file'),
  validateFileInFormData,
  uploadCounsellorHandler
);

router
  .route('/counsellors')
  .post(
    validateUserIdInBodyWithRole('COUNSELLOR'),
    adminValidateDepartmentInBody,
    addCounsellorToDepartmentHandler
  );

export default router;
