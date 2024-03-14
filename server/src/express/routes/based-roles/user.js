import express from 'express';

import authHandler from '../../middlewares/auth.js';

import {
  makeQuestionHandler,
  questionsHandler,
} from '../../controllers/based-roles/user.js';
import {
  optionalUploadFileToFirebaseHandler,
  uploadImageOrDocumentHandler,
} from '../../middlewares/upload-file.js';
import { validateBeforeMakeQuestion } from '../../middlewares/validate.js';

import { defaultPaginationParams } from '../../middlewares/query.js';

const router = express.Router();
router.use(authHandler('USER'));

router
  .route('/questions')
  .get(defaultPaginationParams, questionsHandler)
  .post(
    uploadImageOrDocumentHandler.single('file'),
    validateBeforeMakeQuestion,
    optionalUploadFileToFirebaseHandler('questions'),
    makeQuestionHandler
  );

export default router;
