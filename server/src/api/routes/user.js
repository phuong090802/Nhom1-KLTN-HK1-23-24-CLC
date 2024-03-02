import express from 'express';

import {
  makeQuestionHandler,
  updateProfile
} from '../controllers/user.js';
import { isAuthenticatedHandler } from '../middlewares/auth.js';
import {
  uploadFileToFirebaseHandler,
  uploadImageOrDocumentHandler,
} from '../middlewares/upload-file.js';
import {
  validateDepartmentIdInBody,
  validateFieldIdInBody,
} from '../middlewares/validate.js';

const router = express.Router();
router.use(isAuthenticatedHandler);

router.route('/users').put(updateProfile);
router
  .route('/questions')
  .post(
    uploadImageOrDocumentHandler.single('file'),
    validateDepartmentIdInBody,
    validateFieldIdInBody,
    uploadFileToFirebaseHandler('questions'),
    makeQuestionHandler
  );

export default router;
