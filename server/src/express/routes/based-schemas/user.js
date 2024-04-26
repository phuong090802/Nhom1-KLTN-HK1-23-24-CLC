import express from 'express';

import * as userController from '../../controllers/based-schemas/user.js';
import {
  handleAuthentication,
  handleAuthorization,
} from '../../middlewares/auth.js';
import {
  handleRequiredUploadFileToFirebase,
  handleUploadImage,
} from '../../middlewares/upload-file.js';

const router = express.Router();

router.use(handleAuthentication);

router.post(
  '/push-token',
  handleAuthorization('USER', 'COUNSELLOR', 'DEPARTMENT_HEAD'),
  userController.handleAddPushToken
);

router
  .route('/')
  .put(userController.handleUpdateProfile)
  .patch(
    handleUploadImage.single('file'),
    handleRequiredUploadFileToFirebase('users'),
    userController.handleUpdateAvatar
  );

export default router;
