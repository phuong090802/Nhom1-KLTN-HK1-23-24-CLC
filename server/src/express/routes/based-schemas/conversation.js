import express from 'express';

import { handleAuthentication } from '../../middlewares/auth.js';
import { defaultPaginationParams } from '../../middlewares/query.js';
import {
  handleCheckUserIsInParticipatesConversation,
  handleCheckUserIsNotInDeletedByConversation,
  handleValidateConversationIdInParams,
} from '../../middlewares/validate/based-schemas/conversation.js';
import * as conversationController from '../../controllers/based-schemas/conversation.js';

const router = express.Router();

router.use(handleAuthentication);

router.route('/:id').get(
  // conversation
  handleValidateConversationIdInParams,
  // user in participates
  handleCheckUserIsInParticipatesConversation,
  // user not in deleted by
  handleCheckUserIsNotInDeletedByConversation,
  defaultPaginationParams,
  conversationController.handleGetMessagesInConversation
);

router
  .route('/')
  .get(defaultPaginationParams, conversationController.handleGetConversations);

export default router;
