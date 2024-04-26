import express from 'express';

import * as counsellorController from '../../controllers/based-roles/admin/counsellor.js';
import * as departmentController from '../../controllers/based-roles/admin/department.js';
import * as newsController from '../../controllers/based-roles/admin/news.js';
import { handleCreateStaff } from '../../controllers/based-roles/admin/staff.js';
import * as userController from '../../controllers/based-roles/admin/user.js';
import {
  handleAuthenticationAndAuthorization,
  handlePreventRoles,
} from '../../middlewares/auth.js';
import { defaultPaginationParams } from '../../middlewares/default-value/query.js';
import {
  handleOptionalUploadFileToFirebase,
  handleRequiredFileInFormData,
  handleUploadFileCSV,
  handleUploadImageOrDocument,
} from '../../middlewares/upload-file.js';
import { handleCheckStatusOfDepartment } from '../../middlewares/validate/based-roles/admin.js';
import {
  handleValidateDepartmentIdInBody,
  handleValidateDepartmentIdInParams,
} from '../../middlewares/validate/based-schemas/department.js';
import { handleValidateNewsIdInParams } from '../../middlewares/validate/based-schemas/news.js';
import {
  handleValidateRoleUser,
  handleValidateUserIdInBody,
  handleValidateUserIdInParams,
} from '../../middlewares/validate/based-schemas/user.js';
import { handleValidateRoleInBody } from '../../middlewares/validate/role.js';

const router = express.Router();

router.use(handleAuthenticationAndAuthorization('ADMIN'));

router
  .route('/news/:id')
  .put(
    // kiểm tra id của new
    handleValidateNewsIdInParams,
    // đem lên cùng để multer lấy giá trị chuỗi của form-data và chuyển nó thành req.body
    handleUploadImageOrDocument.single('file'),
    handleOptionalUploadFileToFirebase('news'),
    newsController.handleUpdateNews
  )
  .delete(
    // kiểm tra id của new
    handleValidateNewsIdInParams,
    newsController.handleDeleteNews
  );

router.route('/news').post(
  // đem lên cùng để multer lấy giá trị chuỗi của form-data và chuyển nó thành req.body
  handleUploadImageOrDocument.single('file'),
  handleOptionalUploadFileToFirebase('news'),
  newsController.handleCreateNews
);

router
  .route('/users/:id')
  .get(handleValidateUserIdInParams, userController.handleGetUser)
  .put(
    // user
    handleValidateUserIdInParams,
    // is not admin
    handlePreventRoles('ADMIN'),
    userController.handleUpdateStatusOfUser
  );

router
  .route('/users')
  .get(defaultPaginationParams, userController.handleGetUsers);

router.get(
  '/departments/:id/counsellors',
  // department
  handleValidateDepartmentIdInParams,

  defaultPaginationParams,
  departmentController.handleGetCounsellorsInDepartment
);

router
  .route('/departments/:id')
  .put(
    // department
    handleValidateDepartmentIdInParams,
    // status of department
    handleCheckStatusOfDepartment,

    departmentController.handleRenameDepartment
  )
  .patch(
    // department
    handleValidateDepartmentIdInParams,

    departmentController.handleUpdateStatusOfDepartment
  );

router
  .route('/departments')
  .post(departmentController.handleCreateDepartment)
  .get(defaultPaginationParams, departmentController.handleGetDepartments)
  .put(
    // department
    handleValidateDepartmentIdInBody,
    // status of department
    handleCheckStatusOfDepartment,
    // user
    handleValidateUserIdInBody,
    // counsellor
    handleValidateRoleUser('COUNSELLOR'),

    departmentController.handleChangeDepartmentHead
  );

router.route('/staffs').post(
  // role
  handleValidateRoleInBody('COUNSELLOR', 'SUPERVISOR'),

  handleCreateStaff
);

router.post(
  '/counsellors/upload',
  // file
  handleUploadFileCSV.single('file'),
  handleRequiredFileInFormData,

  counsellorController.handleCreateCounsellorFromCSV
);

router.route('/counsellors').post(
  // user
  handleValidateUserIdInBody,
  // counsellor
  handleValidateRoleUser('COUNSELLOR'),

  // department
  handleValidateDepartmentIdInBody,
  // status of department
  handleCheckStatusOfDepartment,

  counsellorController.handlerAddCounsellorDepartmentIsNullToDepartment
);

export default router;
