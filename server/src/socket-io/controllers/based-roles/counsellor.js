import Conversation from '../../../models/conversation.js';
import Message from '../../../models/message.js';

import catchAsyncErrors from '../../middlewares/catch-async-errors.js';
import { authorizeRolesHandler } from '../../middlewares/event/auth-event.js';
import { validateQuestionAndStatus } from '../../middlewares/event/validate-event.js';

import Question from '../../../models/question.js';

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
