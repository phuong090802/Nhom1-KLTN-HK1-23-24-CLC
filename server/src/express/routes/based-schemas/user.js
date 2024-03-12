import express from 'express';

import { isAuthenticatedHandler } from '../../middlewares/auth.js';
import {
  requiredUploadFileToFirebaseHandler,
  uploadImageHandler,
} from '../../middlewares/upload-file.js';

import {
  updateAvatar,
  updateProfile,
} from '../../controllers/based-schemas/user.js';

const router = express.Router();

router.use(isAuthenticatedHandler);

router
  .route('/')
  .put(updateProfile)
  .patch(
    uploadImageHandler.single('file'),
    requiredUploadFileToFirebaseHandler('users'),
    updateAvatar
  );

export default router;
