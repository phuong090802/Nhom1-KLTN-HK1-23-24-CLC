import Question from '../../../../models/question.js';
import User from '../../../../models/user.js';
import Notification from '../../../../models/notification.js';
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
    let status;
    if (user.role === 'DEPARTMENT_HEAD' || !isApprovalRequest) {
      status = 'publicly-answered-and-approved';
    } else {
      validateCounsellor.handleValidateFieldOfCounsellor(question.field, user);
      status = 'publicly-answered-pending-approval';
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
    question.status = status;
    await question.save();
    callback({
      success: true,
      message: 'Trả lời câu hỏi thành công',
      code: 2031,
    });

    let notificationContent;
    let receiverId;
    let title;
    if (!isApprovalRequest || user.role === 'DEPARTMENT_HEAD') {
      // emit notification to user
      receiverId = question.user._id.toString();
      notificationContent = 'Câu hỏi của bạn đã được trả lời';
      title = 'Câu hỏi đã được trả lời';
    } else {
      if (user.role === 'DEPARTMENT_HEAD') {
        receiverId = null;
      } else {
        const department = question.department;
        const departmentHead = await User.findOne({
          role: 'DEPARTMENT_HEAD',
          'counsellor.department': department,
        });
        receiverId = departmentHead._id.toString();
        notificationContent = 'Có câu trả lời cần được duyệt.';
        title = 'Có câu trả lời cần được duyệt.';
      }
    }
    console.log('current User Id', user._id);
    console.log('receiverId', receiverId);
    if (receiverId) {
      const lastNotification = await Notification.create({
        recipient: receiverId,
        content: notificationContent,
      });
      const response = {
        success: true,
        lastNotification,
        code: 2058,
      };
      io.of('/auth').emit(`${receiverId}:notification:read`, response);
      await sendNotification(receiverId, {
        // sound: 'default',
        title,
        // body: question.answer.content,
        body: notificationContent,
      });
    }
  }
);
