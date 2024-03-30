import express from 'express';

import {
  handleAuthenticationAndAuthorization,
  handlePreventRoles,
} from '../../middlewares/auth.js';
import { defaultPaginationParams } from '../../middlewares/query.js';
import {
  handleRequiredFileInFormData,
  handleUploadFileCSV,
} from '../../middlewares/upload-file.js';
import { handleCheckStatusOfDepartment } from '../../middlewares/validate/based-roles/admin.js';
import {
  handleValidateDepartmentIdInBody,
  handleValidateDepartmentIdInParams,
} from '../../middlewares/validate/based-schemas/department.js';
import {
  handleValidateRoleUser,
  handleValidateUserIdInBody,
  handleValidateUserIdInParams,
} from '../../middlewares/validate/based-schemas/user.js';
import { handleValidateRoleInBody } from '../../middlewares/validate/role.js';
import * as counsellorController from '../../controllers/based-roles/admin/counsellor.js';
import * as departmentController from '../../controllers/based-roles/admin/department.js';
import * as userController from '../../controllers/based-roles/admin/user.js';
import { handleCreateStaff } from '../../controllers/based-roles/admin/staff.js';

const router = express.Router();

router.use(handleAuthenticationAndAuthorization('ADMIN'));

router
  .route('/users/:id')
  .get(handleValidateUserIdInParams, userController.handleGetUser)
  .put(
    handleValidateUserIdInParams,
    handlePreventRoles('ADMIN'),
    userController.handleUpdateStatusOfUser
  );

router
  .route('/users')
  .get(defaultPaginationParams, userController.handleGetUsers);

router.get(
  '/departments/:id/counsellors',
  handleValidateDepartmentIdInParams,
  defaultPaginationParams,
  departmentController.handleGetCounsellorsInDepartment
);

router
  .route('/departments/:id')
  .put(
    handleValidateDepartmentIdInParams,
    handleCheckStatusOfDepartment,
    departmentController.handleRenameDepartment
  )
  .patch(
    handleValidateDepartmentIdInParams,
    departmentController.handleUpdateStatusOfDepartment
  );

router
  .route('/departments')
  .post(departmentController.handleCreateDepartment)
  .get(defaultPaginationParams, departmentController.handleGetDepartments)
  .put(
    handleValidateDepartmentIdInBody,
    handleCheckStatusOfDepartment,
    handleValidateUserIdInBody,
    handleValidateRoleUser('COUNSELLOR'),
    departmentController.handleChangeDepartmentHead
  );

router
  .route('/staffs')
  .post(
    handleValidateRoleInBody('COUNSELLOR', 'SUPERVISOR'),
    handleCreateStaff
  );

router.post(
  '/counsellors/upload',
  handleUploadFileCSV.single('file'),
  handleRequiredFileInFormData,
  counsellorController.handleCreateCounsellorFromCSV
);

router
  .route('/counsellors')
  .post(
    handleValidateUserIdInBody,
    handleValidateRoleUser('COUNSELLOR'),
    handleValidateDepartmentIdInBody,
    handleCheckStatusOfDepartment,
    counsellorController.handlerAddCounsellorDepartmentIsNullToDepartment
  );

export default router;
