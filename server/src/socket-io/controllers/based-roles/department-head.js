import Field from '../../../models/field.js';
import Question from '../../../models/question.js';
import Feedback from '../../../models/feedback.js';

import ErrorHandler from '../../../util/error/socket-io-error-handler.js';
import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

// namespace: /counsellor
// listen event (ack): feedback:create
// description: Trưởng khoa gửi feedback khi từ chối duyệt
export const createFeedback = catchAsyncErrors(
  async (socket, payload, callback) => {
    const { questionId, content } = payload;
    const question = await Question.findById(questionId);

    if (question.status !== 'publicly-answered-pending-approval') {
      throw new ErrorHandler('Câu hỏi không ở trạng thái chờ duyệt', 4058);
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

    // handle emit feedback
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
