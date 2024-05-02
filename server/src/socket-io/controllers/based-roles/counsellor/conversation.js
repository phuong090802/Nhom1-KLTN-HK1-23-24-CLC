import Conversation from '../../../../models/conversation.js';
import Message from '../../../../models/message.js';
import Question from '../../../../models/question.js';
import sendNotification from '../../../../util/send-notification.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import { handleAuthorization } from '../../../middlewares/event/auth.js';
import { handleCheckQuestionAndStatus } from '../../../middlewares/event/validate/combine/question.js';

// namespace: /auth
// listen event (ack): conversation:create
// description: Tư vấn viên/trưởng khoa trả lời câu hỏi riêng tư
export const handleCreateConversation = catchAsyncErrors(
  async (io, socket, payload, callback) => {
    handleAuthorization(socket, 'COUNSELLOR', 'DEPARTMENT_HEAD');
    const { questionId, messageContent } = payload;
    const question = await Question.findById(questionId);
    handleCheckQuestionAndStatus(question, 'unanswered');
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
    const latestConversation = conversation.getLatestConversation(message);
    const response = {
      success: true,
      latestConversation,
      code: 2057,
    };
    // new conversation is payload
    callback({
      success: true,
      message: 'Trả lời câu hỏi riêng tư thành công',
      code: 2051,
    });
    const receiverId = receiver._id.toString();
    io.of('/auth').emit(`${receiverId}:notification:read`, response);
    await sendNotification(receiverId, {
      // sound: 'default',
      title: user.fullName,
      body: message.content,
    });
  }
);
