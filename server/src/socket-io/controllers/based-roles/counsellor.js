import Conversation from '../../../models/conversation.js';
import Message from '../../../models/message.js';

import catchAsyncErrors from '../../middlewares/catch-async-errors.js';
import { authorizeRolesHandler } from '../../middlewares/event/auth-event.js';
import {
  validateFieldOfCounsellor,
  validateMimetypeAndFileSize,
  validateQuestionAndStatus,
} from '../../middlewares/event/validate-event.js';

import Question from '../../../models/question.js';
import User from '../../../models/user.js';

// namespace: /counsellor
// listen event (ack): answer:create
// description: Tư vấn viên, trưởng khoa trả lời câu hỏi
export const createAnswer = catchAsyncErrors(
  async (socket, payload, callback) => {
    const { questionId, file, content } = payload;
    const user = socket.user;
    const question = await Question.findById(questionId);

    if (user.role === 'DEPARTMENT_HEAD') {
      status = 'publicly-answered-and-approved';
    } else {
      validateFieldOfCounsellor(question.field, user);
    }

    validateQuestionAndStatus(question, 'unanswered');

    let status = 'publicly-answered-pending-approval';

    let answerData = {
      content,
      user,
    };

    if (file && file.buffer) {
      // maxSize: 2MB
      validateMimetypeAndFileSize(file, 2);
      const { ref, url } = await uploadFileSocketIO('answers', file);
      answerData = {
        ...answerData,
        file: {
          ref,
          url,
        },
      };
    }

    question.answer = answerData;
    question.status = status;
    await question.save();

    callback({
      success: true,
      message: 'Trả lời câu hỏi thành công',
      code: 2031,
    });

    const response = {
      success: true,
      hasNewAnswers: true,
      code: 2059,
    };

    if (user.role !== 'DEPARTMENT_HEAD') {
      const department = question.department;

      const departmentHead = await User.findOne({
        role: 'DEPARTMENT_HEAD',
        'counsellor.department': department,
      });

      socket.emit(
        `${departmentHead._id.toString()}:answer:notification:read`,
        response
      );
    }
  }
);

// namespace: /auth
// listen event (ack): conversation:create
// description: Tư vấn viên/trưởng khoa trả lời câu hỏi riêng tư
export const createConversation = catchAsyncErrors(
  async (socket, payload, callback) => {
    authorizeRolesHandler(socket, 'COUNSELLOR', 'DEPARTMENT_HEAD');

    const { questionId, messageContent } = payload;
    const question = await Question.findById(questionId);
    validateQuestionAndStatus(question, 'unanswered');
    const user = socket.user;

    const receiver = question.user;

    const participates = [user, receiver];

    let conversation = await Conversation.findOne({ participates });

    if (!conversation) {
      conversation = await Conversation.create({ participates });
    }

    const message = await Message.create({
      content: messageContent,
      conversation,
      sender: user,
    });

    conversation.lastMessage = message;

    await conversation.save();

    question.status = 'privately-answered';

    await question.save();

    const latestConversation = await conversation.detailConversation();

    const response = {
      success: true,
      latestConversation,
      code: 2057,
    };

    // new conversation is payload
    socket.emit(`${receiver._id.toString()}:message:read`, response);

    callback({
      success: true,
      message: 'Trả lời câu hỏi riêng tư thành công',
      code: 2051,
    });
  }
);
