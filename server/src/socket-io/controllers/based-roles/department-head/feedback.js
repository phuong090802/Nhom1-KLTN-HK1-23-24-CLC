import Feedback from '../../../../models/feedback.js';
import Question from '../../../../models/question.js';
import sendNotification from '../../../../util/send-notification.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import { handleAuthorization } from '../../../middlewares/event/auth.js';
import { handleCheckBeforeAccessDepartment } from '../../../middlewares/event/validate/based-roles/counsellor.js';
import { handleCheckQuestionAndStatus } from '../../../middlewares/event/validate/combine/question.js';

// namespace: /counsellor
// listen event (ack): feedback:create
// description: Trưởng khoa gửi feedback khi từ chối duyệt
export const handleCreateFeedback = catchAsyncErrors(
  async (io, socket, payload, callback) => {
    handleAuthorization(socket, 'DEPARTMENT_HEAD');
    await handleCheckBeforeAccessDepartment(socket);
    const { questionId, content } = payload;
    const question = await Question.findById(questionId);
    handleCheckQuestionAndStatus(
      question,
      'publicly-answered-pending-approval'
    );
    if (!question.answer) {
      question.status = 'unanswered';
      await question.save();
      return callback({
        success: false,
        message: 'Câu hỏi chưa được trả lời',
        code: 4057,
      });
    }
    const answer = question.answer;
    question.status = 'unanswered';
    question.answer = null;
    await question.save();
    const savedFeedback = await Feedback.create({ content, answer, question });
    callback({
      success: true,
      message: 'Gửi phản hồi thành công',
      code: 2055,
    });
    const feedback = await Feedback.findById(savedFeedback._id)
      .populate({
        path: 'answer',
        select: '-_id content answeredAt',
      })
      .populate({
        path: 'question',
        select: '-_id title content',
      })
      .select('content answer question');

    const response = {
      success: true,
      latestFeedback: feedback,
      code: 2056,
    };
    // handle emit feedback
    const receiverId = answer.user._id.toString();
    io.of('/auth').emit(`${receiverId}:feedback:read`, response);
    await sendNotification(receiverId, {
      // sound: 'default',
      title: 'Phản hồi',
      // body: savedFeedback.content,
      body: 'Có phản hồi mới từ trưởng khoa',
    });
  }
);
