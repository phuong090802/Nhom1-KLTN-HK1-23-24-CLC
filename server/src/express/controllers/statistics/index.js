import catchAsyncErrors from '../../middlewares/catch-async-errors.js';
import Department from '../../../models/department.js';
import Field from '../../../models/field.js';
import User from '../../../models/user.js';
import Question from '../../../models/question.js';

// Endpoint: /api/statistics
// Method: GET
// Description:
// - Đếm số số khoa có isActive: true trong hệ thống
// - Đếm số số lĩnh vực có isActive: true trong hệ thống
// - Đếm số người có isEnabled: true dùng trong hệ thống
// - Đếm số câu hỏi trong hệ thống
export const handleStatisticCountOfUsersAndDepartmentsAndFieldsAndQuestions =
  catchAsyncErrors(async (req, res, next) => {
    const countOfUsers = await User.countDocuments({ isEnabled: true });
    const countOfDepartments = await Department.countDocuments({
      isActive: true,
    });
    const countOfFields = await Field.countDocuments({ isActive: true });
    const countOfQuestions = await Question.countDocuments();

    res.json({
      success: true,
      countOfUsers,
      countOfDepartments,
      countOfFields,
      countOfQuestions,
      code: 2081,
    });
  });
