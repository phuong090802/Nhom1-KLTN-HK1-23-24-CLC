import express from 'express';

import { handleAuthentication } from '../../middlewares/auth.js';
import {
  handleRequiredUploadFileToFirebase,
  handleUploadImage,
} from '../../middlewares/upload-file.js';
import * as userController from '../../controllers/based-schemas/user.js';

const router = express.Router();

router.use(handleAuthentication);

router
  .route('/')
  .put(userController.handleUpdateProfile)
  .patch(
    handleUploadImage.single('file'),
    handleRequiredUploadFileToFirebase('users'),
    userController.handleUpdateAvatar
  );

export default router;
