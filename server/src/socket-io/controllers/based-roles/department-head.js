import Field from '../../../models/field.js';
import Question from '../../../models/question.js';
import Feedback from '../../../models/feedback.js';
import Notification from '../../../models/notification.js';

import catchAsyncErrors from '../../middlewares/catch-async-errors.js';
import { authorizeRolesHandler } from '../../middlewares/event/auth-event.js';
import { validateQuestionAndStatus } from '../../middlewares/event/combine-validate.js';

import ErrorHandler from '../../../util/error/socket-io-error-handler.js';

// namespace: /auth
// listen event (ack): notification:create
// description: Gửi thông báo câu hỏi đã được trả lời (câu trả lời đã được trưởng khoa duyệt)
export const approveAnswer = catchAsyncErrors(
  async (socket, payload, callback) => {
    authorizeRolesHandler(socket, 'COUNSELLOR', 'DEPARTMENT_HEAD');

    const { questionId } = payload;

    const question = await Question.findById(questionId);

    validateQuestionAndStatus(question, 'publicly-answered-pending-approval');

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

// namespace: /counsellor
// listen event (ack): feedback:create
// description: Trưởng khoa gửi feedback khi từ chối duyệt
export const createFeedback = catchAsyncErrors(
  async (socket, payload, callback) => {
    authorizeRolesHandler('DEPARTMENT_HEAD')(socket, payload, callback);

    const { questionId, content } = payload;
    const question = await Question.findById(questionId);

    validateQuestionAndStatus(question, 'publicly-answered-pending-approval');

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

    const feedback = await Feedback.findById(savedFeedback._id);

    const latestFeedback = await feedback.getFormatFeedback();

    const response = {
      success: true,
      latestFeedback,
      code: 2056,
    };

    // console.log(answer.user._id.toString());

    // handle emit feedback
    socket.emit(`${answer.user._id.toString()}:feedback:read`, response);
  }
);

// namespace: /department-head
// listen event (ack): field:validate-field-name:create
// description: Kiểm tra tên lĩnh vực trước khi tạo lĩnh vực
export const validateFieldNameCreate = catchAsyncErrors(
  async (socket, payload, callback) => {
    const { fieldName } = payload;
    const department = socket.user.counsellor.department;

    const field = await Field.findOne({
      fieldName: { $regex: new RegExp(fieldName, 'i') },
      department,
    });

    if (field) {
      throw new ErrorHandler('Tên lĩnh vực đã được sử dụng', 4046);
    }

    callback({
      success: true,
      message: 'Tên lĩnh vực khả dụng',
      code: 2027,
    });
  }
);

// namespace: /department-head
// listen event (ack): field:validate-field-name:create
// description: Kiểm tra tên lĩnh vực trước khi cập tên mới
export const validateFieldNameUpdate = catchAsyncErrors(
  async (socket, payload, callback) => {
    const { fieldId, fieldName } = payload;

    const department = socket.user.counsellor.department;

    const field = await Field.findOne({
      _id: { $ne: fieldId },
      fieldName: { $regex: new RegExp(fieldName, 'i') },
      department,
    });

    if (field) {
      throw new ErrorHandler('Tên lĩnh vực đã được sử dụng', 4048);
    }

    callback({
      success: true,
      message: 'Tên lĩnh vực khả dụng',
      code: 2029,
    });
  }
);
