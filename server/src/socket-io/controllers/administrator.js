import { REMIND_INTERVAL } from '../../constants/reminder.js';
import Department from '../../models/department.js';
import Notification from '../../models/notification.js';
import User from '../../models/user.js';
import sendNotification from '../../util/send-notification.js';
import catchAsyncErrors from '../middlewares/catch-async-errors.js';
import { handleAuthorization } from '../middlewares/event/auth.js';

// namespace: /auth
// listen event (ack): department:reminder:create
// description: Admin/supervisor thông báo tới trưởng khoa, khoa có câu hỏi quá hạn
export const handleReminderToDepartment = catchAsyncErrors(
  async (io, socket, payload, callback) => {
    handleAuthorization(socket, 'ADMIN', 'SUPERVISOR');
    const { departmentIds } = payload;
    callback({
      success: true,
      message: 'Gửi nhắc nhở thành công',
      code: 2099,
    });

    await Promise.all(
      departmentIds.map(async (id) => {
        const department = await Department.findById(id);
        if (
          department.lastRemindedAt &&
          Date.now() < department.lastRemindedAt.getTime() + REMIND_INTERVAL
        ) {
          return;
        }
        department.lastRemindedAt = Date.now();
        await department.save();

        const user = await User.findOne({
          role: 'DEPARTMENT_HEAD',
          'counsellor.department': id,
        });
        const message =
          'Quản trị viên nhắc nhở khoa trả lời những câu hỏi quá hạn.';
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
          title: 'Thông báo từ Quản trị viên',
          body: message,
        });
      })
    );
  }
);
