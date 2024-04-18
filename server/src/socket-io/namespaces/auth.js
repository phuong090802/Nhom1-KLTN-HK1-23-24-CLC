import { handleAuthentication } from '../middlewares/auth.js';
import { handleValidateEmail, handleVerifyEmail } from '../controllers/auth.js';
import { handleCreateConversation } from '../controllers/based-roles/counsellor/conversation.js';
import { handleCreateMessage } from '../controllers/based-schemas/message.js';
import { handleApproveAnswer } from '../controllers/based-roles/department-head/answer.js';
import { handleCreateQuestion } from '../controllers/based-roles/user/question.js';

export default function auth(io) {
  io.of('/auth')
    .use(handleAuthentication)
    .on('connection', (socket) => {
      // auth validate email
      socket.on('validate-email', (payload, callback) =>
        handleValidateEmail(io, socket, payload, callback)
      );

      // auth verify email
      socket.on('verify-email', (payload, callback) => {
        handleVerifyEmail(io, socket, payload, callback);
      });

      // message conversation:create
      socket.on('conversation:create', (payload, callback) =>
        handleCreateConversation(io, socket, payload, callback)
      );

      // message message:create
      socket.on('message:create', (payload, callback) =>
        handleCreateMessage(io, socket, payload, callback)
      );

      // approved answer and notification to user
      socket.on('approve-answer:create', (payload, callback) => {
        handleApproveAnswer(io, socket, payload, callback);
      });

      // create question
      socket.on('question:create', (payload, callback) => {
        handleCreateQuestion(io, socket, payload, callback);
      });
    });
}
