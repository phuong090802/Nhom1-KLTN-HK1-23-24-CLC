import Department from '../../../models/department.js';
import Field from '../../../models/field.js';
import Question from '../../../models/question.js';
import User from '../../../models/user.js';
import { convertTimeAndGenerateRangesForStatistic } from '../../../util/generate/time-converter.js';
import { handleCountQuestionsByFieldsAndDepartment } from '../../../util/statistics/field.js';
import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

// Endpoint: /api/statistics
// Method: GET
// Description: Admin/supervisor thống kê lĩnh vực và số câu hỏi thuộc lĩnh vực
export const handleStatisticFields = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    const fields = await Field.find({ department }).select('_id fieldName');
    const fieldStatistic = await handleCountQuestionsByFieldsAndDepartment(
      fields
    );
    res.json({
      success: true,
      fieldStatistic,
      code: 2084,
    });
  }
);

// Endpoint: /api/statistics/user
// Method: POST
// Description: Đếm số lượng tài khoản đã tạo trong khoảng thời gian
export const handleStatisticUsers = catchAsyncErrors(async (req, res, next) => {
  // validate
  const { timeUnit, latestTime } = req.body;
  const ranges = convertTimeAndGenerateRangesForStatistic(timeUnit, latestTime);
  const usersStatistic = await Promise.all(
    ranges.map(async (range) => {
      const { start, end } = range;
      const query = {
        role: { $ne: 'ADMIN' },
        createdAt: {
          $gte: start,
          $lte: end,
        },
      };
      const countOfUsers = await User.countDocuments(query);
      return {
        date: {
          start,
          end,
        },
        countOfUsers,
      };
    })
  );
  res.json({
    success: true,
    usersStatistic,
    code: 2088,
  });
});

// Endpoint: /api/statistics
// Method: GET
// Description:
// - Đếm số khoa có isActive: true trong hệ thống
// - Đếm số lĩnh vực có isActive: true trong hệ thống
// - Đếm số người có isEnabled: true dùng trong hệ thống
// - Đếm số câu hỏi trong hệ thống
export const handleStatisticCountUsersAndDepartmentsAndFieldsAndQuestions =
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
