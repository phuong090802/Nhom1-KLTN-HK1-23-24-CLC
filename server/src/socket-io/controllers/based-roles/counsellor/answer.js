import Question from '../../../../models/question.js';
import User from '../../../../models/user.js';
import sendNotification from '../../../../util/send-notification.js';
import { uploadFileSocketIO } from '../../../../util/upload-file.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import { handleAuthorization } from '../../../middlewares/event/auth.js';
import * as validateCounsellor from '../../../middlewares/event/validate/based-roles/counsellor.js';
import { handleValidateMimetypeAndFileSize } from '../../../middlewares/event/validate/combine/file.js';
import { handleCheckQuestionAndStatus } from '../../../middlewares/event/validate/combine/question.js';

// namespace: /counsellor
// listen event (ack): answer:create
// description: Tư vấn viên, trưởng khoa trả lời câu hỏi
export const handleCreateAnswer = catchAsyncErrors(
  async (io, socket, payload, callback) => {
    handleAuthorization(socket, 'COUNSELLOR', 'DEPARTMENT_HEAD');
    await validateCounsellor.handleCheckBeforeAccessDepartment(socket);
    const { questionId, file, content, isApprovalRequest } = payload;
    const user = socket.user;
    const question = await Question.findById(questionId);
    let status = 'publicly-answered-pending-approval';
    if (user.role === 'DEPARTMENT_HEAD') {
      status = 'publicly-answered-and-approved';
    } else {
      validateCounsellor.handleValidateFieldOfCounsellor(question.field, user);
    }
    handleCheckQuestionAndStatus(question, 'unanswered');
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
    question.status = !isApprovalRequest
      ? 'publicly-answered-and-approved'
      : status;
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
    if (user.role !== 'DEPARTMENT_HEAD' || !isApprovalRequest) {
      const department = question.department;
      const departmentHead = await User.findOne({
        role: 'DEPARTMENT_HEAD',
        'counsellor.department': department,
      });
      const receiverId = departmentHead._id.toString();
      io.of('/auth').emit(`${receiverId}:answer:notification:read`, response);
      await sendNotification(receiverId, {
        // sound: 'default',
        title: 'Duyệt câu trả lời',
        body: 'Có câu trả lời mới cần được duyệt',
      });
    } else {
      // emit notification to user
      const receiverId = question.user._id.toString();
      io.of('/auth').emit(`${receiverId}:notification:read`, response);
      await sendNotification(receiverId, {
        // sound: 'default',
        title: 'Câu hỏi đã được trả lời',
        // body: question.answer.content,
        body: 'Câu hỏi của bạn đã được trả lời',
      });
    }
  }
);
