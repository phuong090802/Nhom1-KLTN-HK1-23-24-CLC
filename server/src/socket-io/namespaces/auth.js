import { isAuthenticatedHandler } from '../middlewares/auth.js';

import { validateEmail, verifyEmail } from '../controllers/auth.js';

import { createConversation } from '../controllers/based-roles/counsellor.js';
import { createMessage } from '../controllers/based-schemas/user.js';
import { approveAnswer } from '../controllers/based-roles/department-head.js';
import { createQuestion } from '../controllers/based-roles/user.js';

export default function auth(io) {
  io.of('/auth')
    .use(isAuthenticatedHandler)
    .on('connection', (socket) => {
      // auth validate email
      socket.on('validate-email', (payload, callback) =>
        validateEmail(socket, payload, callback)
      );

      // auth verify email
      socket.on('verify-email', (payload, callback) => {
        verifyEmail(socket, payload, callback);
      });

      // message conversation:create
      socket.on('conversation:create', (payload, callback) =>
        createConversation(socket, payload, callback)
      );

      // message message:create
      socket.on('message:create', (payload, callback) =>
        createMessage(socket, payload, callback)
      );

      // approved answer and notification to user
      socket.on('approve-answer:create', (payload, callback) => {
        approveAnswer(socket, payload, callback);
      });

      // create question
      socket.on('question:create', (payload, callback) => {
        createQuestion(socket, payload, callback);
      });

      
    });
}
