import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import { handleAuthorization } from '../../../middlewares/event/auth.js';
import { handleCheckQuestionAndStatus } from '../../../middlewares/event/validate/combine/question.js';
import Question from '../../../../models/question.js';
import Notification from '../../../../models/notification.js';

// namespace: /auth
// listen event (ack): notification:create
// description: Gửi thông báo câu hỏi đã được trả lời (câu trả lời đã được trưởng khoa duyệt)
export const handleApproveAnswer = catchAsyncErrors(
  async (socket, payload, callback) => {
    handleAuthorization(socket, 'COUNSELLOR', 'DEPARTMENT_HEAD');

    const { questionId } = payload;

    const question = await Question.findById(questionId);

    handleCheckQuestionAndStatus(
      question,
      'publicly-answered-pending-approval'
    );

    question.status = 'publicly-answered-and-approved';
    question.answer.answeredAt = Date.now();

    await question.save();

    callback({
      success: true,
      message: 'Duyệt câu trả lời thành công',
      code: 2032,
    });

    // console.log(question.user._id.toString());

    const recipient = question.user;

    const content = `Câu hỏi đã được trả lời: ${question.title}`;

    const lastNotification = await Notification.create({ recipient, content });

    const response = {
      success: true,
      lastNotification,
      code: 2058,
    };

    // emit notification to user
    socket.emit(`${question.user._id.toString()}:notification:read`, response);
  }
);