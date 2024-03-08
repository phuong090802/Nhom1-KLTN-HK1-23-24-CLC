import express from 'express';

import authHandler from '../../middlewares/auth.js';

import { makeQuestionHandler } from '../../controllers/based-roles/user.js';
import {
  optionalUploadFileToFirebaseHandler,
  uploadImageOrDocumentHandler,
} from '../../middlewares/upload-file.js';
import { validateBeforeMakeQuestion } from '../../middlewares/validate.js';

const router = express.Router();
router.use(authHandler('USER'));

router
  .route('/questions')
  .post(
    uploadImageOrDocumentHandler.single('file'),
    validateBeforeMakeQuestion,
    optionalUploadFileToFirebaseHandler('questions'),
    makeQuestionHandler
  );

export default router;
