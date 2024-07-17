import Department from '../../../../models/department.js';
import Field from '../../../../models/field.js';
import GeneralField from '../../../../models/general-field.js';
import Notification from '../../../../models/notification.js';
import Question from '../../../../models/question.js';
import User from '../../../../models/user.js';
import { handleCounsellorAndAssignQuestionUnanswered } from '../../../../util/assign-work/counsellor.js';
import sendNotification from '../../../../util/send-notification.js';
import { uploadFileSocketIO } from '../../../../util/upload-file.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import { handleAuthorization } from '../../../middlewares/event/auth.js';
import { handleCheckDepartmentAndStatus } from '../../../middlewares/event/validate/combine/department.js';
import { handleCheckFieldAndStatus } from '../../../middlewares/event/validate/combine/field.js';
import { handleValidateMimetypeAndFileSize } from '../../../middlewares/event/validate/combine/file.js';
import { handleCheckGeneralFieldAndStatus } from '../../../middlewares/event/validate/combine/general-field.js';

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
    const field = await Field.findOne({
      _id: fieldId,
      department: departmentId,
    });

    let questionData = {
      department,
      field: null,
      title,
      content,
      user,
      assignTo: null,
    };

    let isGeneralField = false;

    if (field) {
      handleCheckFieldAndStatus(field);
      questionData.field = field;
    } else {
      const generalField = await GeneralField.findById(id);
      handleCheckGeneralFieldAndStatus(generalField);
      questionData.field = generalField;
      isGeneralField = true;
    }

    callback({
      success: true,
      message: 'Đặt câu hỏi thành công',
      code: 2030,
    });

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

    if (isGeneralField) {
      const query = {
        role: { $ne: 'DEPARTMENT_HEAD', $eq: 'COUNSELLOR' },
        'counsellor.department': department._id,
        isEnabled: true,
      };
      const counsellors = await handleCounsellorAndAssignQuestionUnanswered(
        query
      );
      if (counsellors.length > 0) {
        const counsellorReceive = returnedCounsellors.reduce(
          (selectedCounsellor, currentCounsellor) => {
            return currentCounsellor.countOfAssignQuestions <
              selectedCounsellor.countOfAssignQuestions
              ? currentCounsellor
              : selectedCounsellor;
          },
          returnedCounsellors[0]
        );
        questionData.assignTo = counsellorReceive._id;
      }
    }

    const question = await Question.create(questionData);

    // emit new question to department
    let receiverId;
    if (question.assignTo) {
      receiverId = question.assignTo;
    } else {
      const departmentHead = await User.find({
        'counsellor.department': department,
        role: 'DEPARTMENT_HEAD',
      });
      receiverId = departmentHead._id;
    }

    const message = 'Có câu hỏi mới vừa được đặt.';
    const lastNotification = await Notification.create({
      recipient: receiverId,
      content: message,
    });
    const response = {
      success: true,
      lastNotification,
      code: 2058,
    };

    io.of('/auth').emit(`${receiverId}:notification:read`, response);
    await sendNotification(receiverId, {
      // sound: 'default',
      title: 'Câu hỏi',
      // body: questionData.title,
      body: 'Có câu hỏi mới vừa được đặt',
    });
  }
);
