import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import { handleValidateFieldOfCounsellor } from '../../../middlewares/event/validate/based-roles/counsellor.js';
import { handleCheckQuestionAndStatus } from '../../../middlewares/event/validate/combine/question.js';
import { handleValidateMimetypeAndFileSize } from '../../../middlewares/event/validate/combine/file.js';
import Question from '../../../../models/question.js';
import User from '../../../../models/user.js';
import { uploadFileSocketIO } from '../../../../utils/upload-file.js';

// namespace: /counsellor
// listen event (ack): answer:create
// description: Tư vấn viên, trưởng khoa trả lời câu hỏi
export const handleCreateAnswer = catchAsyncErrors(
  async (socket, payload, callback) => {
    const { questionId, file, content } = payload;
    const user = socket.user;
    const question = await Question.findById(questionId);

    if (user.role === 'DEPARTMENT_HEAD') {
      status = 'publicly-answered-and-approved';
    } else {
      handleValidateFieldOfCounsellor(question.field, user);
    }

    handleCheckQuestionAndStatus(question, 'unanswered');

    let status = 'publicly-answered-pending-approval';

    let answerData = {
      content,
      user,
    };

    if (file && file.buffer) {
      // maxSize: 2MB
      handleValidateMimetypeAndFileSize(file, 2);
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
      unapprovedAnswerExists: true,
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
