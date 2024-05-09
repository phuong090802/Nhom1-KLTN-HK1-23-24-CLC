import Department from '../../../../models/department.js';
import Field from '../../../../models/field.js';
import Question from '../../../../models/question.js';
import User from '../../../../models/user.js';
import sendNotification from '../../../../util/send-notification.js';
import { uploadFileSocketIO } from '../../../../util/upload-file.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import { handleAuthorization } from '../../../middlewares/event/auth.js';
import { handleCheckDepartmentAndStatus } from '../../../middlewares/event/validate/combine/department.js';
import { handleCheckFieldAndStatus } from '../../../middlewares/event/validate/combine/field.js';
import { handleValidateMimetypeAndFileSize } from '../../../middlewares/event/validate/combine/file.js';

// namespace: /auth
// listen event (ack): department:validate-department-name:create
// description: Đặt câu hỏi
export const handleCreateQuestion = catchAsyncErrors(
  async (io, socket, payload, callback) => {
    handleAuthorization(socket, 'USER');
    const user = socket.user;
    const { file, departmentId, fieldId, title, content } = payload;
    const department = await Department.findById(departmentId);
    handleCheckDepartmentAndStatus(department);
    const field = await Field.findById(fieldId);
    handleCheckFieldAndStatus(field);
    let questionData = {
      department,
      field,
      title,
      content,
      user,
    };
    if (file && file.buffer) {
      // maxSize: 2MB
      handleValidateMimetypeAndFileSize(file, 2);
      const { ref, url } = await uploadFileSocketIO('questions', file);
      questionData = {
        ...questionData,
        file: {
          ref,
          url,
        },
      };
    }
    await Question.create(questionData);
    callback({
      success: true,
      message: 'Đặt câu hỏi thành công',
      code: 2030,
    });
    // emit new question to department
    const users = await User.find({
      'counsellor.department': department,
      $or: [
        { role: 'COUNSELLOR', 'counsellor.fields': field },
        { role: 'DEPARTMENT_HEAD' },
      ],
    });
    const response = {
      success: true,
      // hasNewQuestions: numberOfQuestions > 0,
      unansweredQuestion: true,
      // change code
      code: 2071,
    };
    await Promise.all(
      users.map(async (user) => {
        const receiverId = user._id.toString();
        io.of('/auth').emit(`${receiverId}:question:notification:read`, response);
        await sendNotification(receiverId, {
          // sound: 'default',
          title: 'Câu hỏi',
          // body: questionData.title,
          body: 'Có câu hỏi mới vừa được đặt',
        });
      })
    );
  }
);
