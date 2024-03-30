import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import { handleValidateMimetypeAndFileSize } from '../../../middlewares/event/validate/combine/file.js';
import { uploadFileSocketIO } from '../../../../utils/upload-file.js';
import { handleAuthorization } from '../../../middlewares/event/auth.js';
import { handleCheckDepartmentAndStatus } from '../../../middlewares/event/validate/combine/department.js';
import { handleCheckFieldAndStatus } from '../../../middlewares/event/validate/combine/field.js';
import Department from '../../../../models/department.js';
import Field from '../../../../models/field.js';
import Question from '../../../../models/question.js';
import User from '../../../../models/user.js';

// namespace: /auth
// listen event (ack): department:validate-department-name:create
// description: Kiểm tra tên khoa trước khi tạo khoa mới
export const handleCreateQuestion = catchAsyncErrors(
  async (socket, payload, callback) => {
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

    // const numberOfQuestions = await Question.countDocuments({
    //   department,
    //   field,
    // });

    const response = {
      success: true,
      // hasNewQuestions: numberOfQuestions > 0,
      unansweredQuestion: true,
      // change code
      code: 2071,
    };

    await Promise.all(
      users.map(async (user) => {
        await socket.emit(
          `${user._id.toString()}:question:notification:read`,
          response
        );
      })
    );
  }
);
