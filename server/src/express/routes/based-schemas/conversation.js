import express from 'express';

import * as conversationController from '../../controllers/based-schemas/conversation.js';
import { handleAuthentication } from '../../middlewares/auth.js';
import {
  defaultPaginationParams,
  defaultSizeAndSkip,
} from '../../middlewares/default-value/query.js';
import {
  handleCheckUserIsInParticipatesConversation,
  handleCheckUserIsNotInDeletedByConversation,
  handleValidateConversationId,
} from '../../middlewares/validate/based-schemas/conversation.js';

const router = express.Router();

router.use(handleAuthentication);

router.route('/:id').get(
  // conversation
  handleValidateConversationId(),
  // user in participates
  handleCheckUserIsInParticipatesConversation,
  // user not in deleted by
  handleCheckUserIsNotInDeletedByConversation,
  defaultSizeAndSkip,
  conversationController.handleGetMessagesInConversation
);

router
  .route('/')
  .get(defaultPaginationParams, conversationController.handleGetConversations);

export default router;
