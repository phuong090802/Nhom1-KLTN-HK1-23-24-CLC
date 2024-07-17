import { REMIND_INTERVAL } from '../../../../constants/reminder.js';
import Notification from '../../../../models/notification.js';
import Question from '../../../../models/question.js';
import User from '../../../../models/user.js';
import sendNotification from '../../../../util/send-notification.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import { handleAuthorization } from '../../../middlewares/event/auth.js';
import { handleCheckQuestionAndStatus } from '../../../middlewares/event/validate/combine/question.js';

// namespace: /auth
// listen event (ack): counsellor:reminder:create
// description: Trưởng khoa thông báo tới tư vấn viên do có câu hỏi thuộc lĩnh vực của họ đã quá hạn (3 ngày chưa trả lời)
export const handleReminderToCounsellor = catchAsyncErrors(
  async (io, socket, payload, callback) => {
    handleAuthorization(socket, 'DEPARTMENT_HEAD');
    const departmentHead = socket.user;
    const { counsellorIds } = payload;
    callback({
      success: true,
      message: 'Gửi nhắc nhở thành công',
      code: 2101,
    });

    await Promise.all(
      counsellorIds.map(async (id) => {
        const user = await User.findById(id);

        const isCounsellor =
          departmentHead.counsellor.department.equals(
            user.counsellor?.department
          ) && user.role === 'COUNSELLOR';
        if (
          !isCounsellor ||
          !!user.lastRemindedAt ||
          Date.now() < user.lastRemindedAt?.getTime() + REMIND_INTERVAL
        ) {
          return;
        }
        user.lastRemindedAt = Date.now();
        await user.save();

        const message = 'Trưởng khoa nhắc nhở bạn trả lời các câu hỏi quá hạn.';
        const lastNotification = await Notification.create({
          recipient: user._id,
          content: message,
        });
        const response = {
          success: true,
          lastNotification,
          code: 2058,
        };
        const receiverId = user._id.toString();
        io.of('/auth').emit(`${receiverId}:notification:read`, response);
        await sendNotification(receiverId, {
          // sound: 'default',
          title: 'Thông báo từ Trưởng Khoa',
          body: message,
        });
      })
    );
  }
);

// namespace: /auth
// listen event (ack): counsellor:assign-work:create
// description: Trưởng khoa gán câu hỏi cụ thể cho tư vấn viên cụ thể
export const handleAssignQuestionToCounsellor = catchAsyncErrors(
  async (io, socket, payload, callback) => {
    handleAuthorization(socket, 'DEPARTMENT_HEAD');
    const departmentHead = socket.user;
    const { questionId, counsellorId } = payload;
    const counsellor = await User.findById(counsellorId);
    handleCheckCounsellorBelongDepartment(departmentHead, counsellor);
    const question = await Question.findById(questionId);
    handleCheckQuestionAndStatus(question, 'unanswered');
    question.assignTo = counsellor._id;
    await question.save();
    const message = 'Bạn vừa được giao câu hỏi mới';
    callback({
      success: true,
      message: 'Giao câu hỏi cho tư vấn viên thành công',
      code: 2114,
    });
    const lastNotification = await Notification.create({
      recipient: counsellor._id,
      content: message,
    });
    const response = {
      success: true,
      lastNotification,
      code: 2058,
    };
    const receiverId = counsellor._id.toString();
    io.of('/auth').emit(`${receiverId}:notification:read`, response);
    await sendNotification(receiverId, {
      // sound: 'default',
      title: 'Thông báo từ Trưởng Khoa',
      body: message,
    });
  }
);
