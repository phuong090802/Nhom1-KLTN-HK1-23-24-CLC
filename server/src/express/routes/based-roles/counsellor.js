import express from 'express';

import authHandler from '../../middlewares/auth.js';
import {
  validateDepartmentBeforeAccess,
  validateFeedbackOfCounsellor,
  validateQuestionIdInBody,
  validateStatusOfQuestion,
} from '../../middlewares/validate.js';
import {
  optionalUploadFileToFirebaseHandler,
  uploadImageOrDocumentHandler,
} from '../../middlewares/upload-file.js';

import {
  createAnswerHandler,
  deleteFeedbackHandler,
  deleteFeedbacksHandler,
} from '../../controllers/based-roles/counsellor.js';

const router = express.Router();

router
  .route('/answers')
  .post(
    authHandler('COUNSELLOR', 'DEPARTMENT_HEAD'),
    validateDepartmentBeforeAccess,
    validateQuestionIdInBody,
    validateStatusOfQuestion('unanswered'),
    uploadImageOrDocumentHandler.single('file'),
    optionalUploadFileToFirebaseHandler('answers'),
    createAnswerHandler
  );

router
  .route('/feedbacks/:id')
  .delete(
    authHandler('COUNSELLOR'),
    validateDepartmentBeforeAccess,
    validateFeedbackOfCounsellor,
    deleteFeedbackHandler
  );

router
  .route('/feedbacks')
  .delete(
    authHandler('COUNSELLOR'),
    validateDepartmentBeforeAccess,
    deleteFeedbacksHandler
  );

export default router;
