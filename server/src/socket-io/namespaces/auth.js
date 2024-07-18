import * as administratorController from '../controllers/administrator.js';
import { handleValidateEmail, handleVerifyEmail } from '../controllers/auth.js';
import * as departmentController from '../controllers/based-roles/admin/department.js';
import { handleCreateAnswer } from '../controllers/based-roles/counsellor/answer.js';
import { handleCreateConversation } from '../controllers/based-roles/counsellor/conversation.js';
import { handleApproveAnswer } from '../controllers/based-roles/department-head/answer.js';
import * as counsellorController from '../controllers/based-roles/department-head/counsellor.js';
import { handleCreateFeedback } from '../controllers/based-roles/department-head/feedback.js';
import * as fieldController from '../controllers/based-roles/department-head/field.js';
import { handleCreateQuestion } from '../controllers/based-roles/user/question.js';
import { handleCreateMessage } from '../controllers/based-schemas/message.js';
import { handleAuthentication } from '../middlewares/auth.js';

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

      // admin validate department name when create
      socket.on(
        'department:validate-department-name:create',
        (payload, callback) => {
          departmentController.handleValidateDepartmentNameForCreate(
            io,
            socket,
            payload,
            callback
          );
        }
      );

      // admin validate department name when update
      socket.on(
        'department:validate-department-name:update',
        (payload, callback) => {
          departmentController.handleValidateDepartmentNameForUpdate(
            io,
            socket,
            payload,
            callback
          );
        }
      );

      // department head create feedback
      socket.on('feedback:create', (payload, callback) =>
        handleCreateFeedback(io, socket, payload, callback)
      );

      // department head + counsellor create answer
      socket.on('answer:create', (payload, callback) => {
        handleCreateAnswer(io, socket, payload, callback);
      });

      // department head validate field when create
      socket.on('field:validate-field-name:create', (payload, callback) =>
        fieldController.handleValidateFieldNameCreate(
          io,
          socket,
          payload,
          callback
        )
      );

      // department head validate field when update
      socket.on('field:validate-field-name:update', (payload, callback) =>
        fieldController.handleValidateFieldNameUpdate(
          io,
          socket,
          payload,
          callback
        )
      );

      // Admin/supervisor thông báo tới trưởng khoa, khoa có câu hỏi quá hạn
      socket.on('department:reminder:create', (payload, callback) =>
        administratorController.handleReminderToDepartment(
          io,
          socket,
          payload,
          callback
        )
      );

      // Trưởng khoa thông báo tới tư vấn viên có câu hỏi quá hạn thuộc lĩnh vực của họ
      socket.on('counsellor:reminder:create', (payload, callback) =>
        counsellorController.handleReminderToCounsellor(
          io,
          socket,
          payload,
          callback
        )
      );

      // Trưởng khoa gán câu hỏi cho tư vấn viên và thông báo cho tư vấn viên
      socket.on(
        'counsellor:assign-work:create',
        (payload, callback) =>
          counsellorController.handleAssignQuestionToCounsellor(
            io,
            socket,
            payload,
            callback
          )
      );
    });
}
