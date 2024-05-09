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
import { handleValidateDepartmentId } from '../../middlewares/validate/based-schemas/department.js';
import { handleValidateNewsId } from '../../middlewares/validate/based-schemas/news.js';
import {
  handleValidateRoleUser,
  handleValidateUserId,
} from '../../middlewares/validate/based-schemas/user.js';
import { handleValidateRole } from '../../middlewares/validate/role.js';

const router = express.Router();

router.use(...handleAuthenticationAndAuthorization('ADMIN'));

router
  .route('/news/:id')
  .all(
    // kiểm tra id của new
    handleValidateNewsId()
  )
  .put(
    // đem lên cùng để multer lấy giá trị chuỗi của form-data và chuyển nó thành req.body
    handleUploadImageOrDocument.single('file'),
    handleOptionalUploadFileToFirebase('news'),
    newsController.handleUpdateNews
  )
  .delete(newsController.handleDeleteNews);

router.route('/news').post(
  // đem lên cùng để multer lấy giá trị chuỗi của form-data và chuyển nó thành req.body
  handleUploadImageOrDocument.single('file'),
  handleOptionalUploadFileToFirebase('news'),
  newsController.handleCreateNews
);

router
  .route('/users/:id')
  .all(
    // user
    handleValidateUserId()
  )
  .get(userController.handleGetUser)
  .put(
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
  handleValidateDepartmentId(),
  defaultPaginationParams,
  departmentController.handleGetCounsellorsInDepartment
);

router
  .route('/departments/:id')
  .all(
    // department
    handleValidateDepartmentId()
  )
  .put(
    // status of department
    handleCheckStatusOfDepartment,
    departmentController.handleRenameDepartment
  )
  .patch(departmentController.handleUpdateStatusOfDepartment);

router
  .route('/departments')
  .post(departmentController.handleCreateDepartment)
  .get(defaultPaginationParams, departmentController.handleGetDepartments)
  .put(
    // department
    handleValidateDepartmentId('body', 'departmentId'),
    // status of department
    handleCheckStatusOfDepartment,
    // user
    handleValidateUserId('body', 'userId'),
    // counsellor
    handleValidateRoleUser('COUNSELLOR'),
    departmentController.handleChangeDepartmentHead
  );

router.route('/staffs').post(
  // role
  handleValidateRole('body', 'COUNSELLOR', 'SUPERVISOR'),
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
  handleValidateUserId('body', 'userId'),
  // counsellor
  handleValidateRoleUser('COUNSELLOR'),
  // department
  handleValidateDepartmentId('body', 'departmentId'),
  // status of department
  handleCheckStatusOfDepartment,
  counsellorController.handlerAddCounsellorDepartmentIsNullToDepartment
);

export default router;
