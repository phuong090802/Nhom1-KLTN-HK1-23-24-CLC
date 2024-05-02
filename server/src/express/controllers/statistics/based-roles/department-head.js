import FAQ from '../../../../models/faq.js';
import Field from '../../../../models/field.js';
import User from '../../../../models/user.js';
import { handleCountQuestions } from '../../../../util/statistics/department.js';
import { handleCountQuestionsByFieldsAndDepartment } from '../../../../util/statistics/field.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/department-head/statistics/field
// Method: GET
// Description: Trưởng khoa thống kê lĩnh vực và số câu hỏi thuộc lĩnh vực trong khoa
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
      code: 2091,
    });
  }
);

// Endpoint: /api/department-head/statistics/department/question
// Method: POST
// Description: department-head thống kê số câu hỏi của trưởng khoa (trả lời công khai và đã được duyệt, trả lời riêng tư)
export const handleStatisticQuestions = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    // validate
    const { timeUnit, latestTime } = req.body;
    const departmentStatistic = await handleCountQuestions(
      timeUnit,
      latestTime,
      department
    );
    res.json({
      success: true,
      departmentStatistic,
      code: 2089,
    });
  }
);

// Endpoint: /api/statistics/department-head/counsellor
// Method: GET
// Description: Trưởng khoa đếm số tư vấn viên của khoa
export const handleCountOfCounsellors = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    const countOfUsers = await User.countDocuments({ department });
    res.json({
      success: true,
      countOfUsers,
      code: 2085,
    });
  }
);

// Endpoint: /api/statistics/department-head/faq
// Method: GET
// Description: Trưởng khoa đếm số câu hỏi chung trong khoa
export const handleCountOfFAQs = catchAsyncErrors(async (req, res, next) => {
  const department = req.foundDepartment;
  const countOfFAQs = await FAQ.countDocuments({ department });
  res.json({
    success: true,
    countOfFAQs,
    code: 2086,
  });
});
