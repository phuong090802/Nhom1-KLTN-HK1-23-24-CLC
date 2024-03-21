import Conversation from '../../../models/conversation.js';
import Message from '../../../models/message.js';

import Question from '../../../models/question.js';
import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

// namespace: /messages
// listen event (ack): conversation:create
// description: Tư vấn viên/trưởng khoa trả lời câu hỏi riêng tư
export const createConversation = catchAsyncErrors(
  async (socket, payload, callback) => {
    const { questionId, messageContent } = payload;
    // console.log(questionId, messageContent);
    // console.log(payload);

    const user = socket.user;

    const allowRoles = ['COUNSELLOR', 'DEPARTMENT_HEAD'];

    if (!allowRoles.includes(user.role)) {
      throw new ErrorHandler('Quyền truy cập không hợp lệ', 4087);
    }

    const question = await Question.findById(questionId);

    if (!question) {
      throw new ErrorHandler('Quyền truy cập không hợp lệ', 4052);
    }

    if (question.status !== 'unanswered') {
      throw new ErrorHandler(
        'Câu hỏi không không ở trạng thái chưa được trả lời',
        4086
      );
    }

    // console.log(question);

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

    // console.log('receiver._id', receiver._id.toString());

    const latestConversation = await conversation.detailConversation();

    // console.log(latestConversation);

    const response = {
      success: true,
      latestConversation,
      code: 2057,
    };

    // new conversation is payload
    socket.emit(`${receiver._id.toString()}:read`, response);

    callback({
      success: true,
      message: 'Trả lời câu hỏi riêng tư thành công',
      code: 2051,
    });
  }
);
