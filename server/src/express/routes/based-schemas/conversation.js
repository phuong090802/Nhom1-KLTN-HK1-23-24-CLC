import express from 'express';

import { isAuthenticatedHandler } from '../../middlewares/auth.js';
import { defaultPaginationParams } from '../../middlewares/query.js';
import { validateConversationGetAllMessage } from '../../middlewares/validate.js';

import {
  conversationsHandler,
  messagesInConversationHandler,
} from '../../controllers/based-schemas/conversation.js';

const router = express.Router();

router.use(isAuthenticatedHandler);

router
  .route('/:id')
  .get(
    validateConversationGetAllMessage,
    defaultPaginationParams,
    messagesInConversationHandler
  );

router.route('/').get(defaultPaginationParams, conversationsHandler);

export default router;
