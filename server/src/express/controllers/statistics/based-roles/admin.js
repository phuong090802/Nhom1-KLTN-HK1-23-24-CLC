import Department from '../../../../models/department.js';
import Field from '../../../../models/field.js';
import Question from '../../../../models/question.js';
import User from '../../../../models/user.js';
import handlePagination from '../../../../util/db/pagination.js';
import QueryAPI from '../../../../util/db/query-api.js';
import { handleCountQuestions } from '../../../../util/statistics/department.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/admin/statistics/department/:id/question
// Method: POST
// Description: Admin thống kê câu hỏi trong khoa (trả lời công khai và đã được duyệt, trả lời riêng tư)
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
      code: 2065,
    });
  }
);

// Endpoint: /api/admin/statistics/department
// Method: GET
// Description: Admin thống kê tất cả các khoa (tìm kiếm, phân trang)
export const handleStatisticDepartments = catchAsyncErrors(
  async (req, res, next) => {
    // sort, search
    const query = Department.find();
    const queryAPI = new QueryAPI(query, req.query).search().sort();
    const {
      records: departments,
      page,
      pages,
    } = await handlePagination(queryAPI, req.query.size, req.query.page);

    const departmentStatistics = await Promise.all(
      departments.map(async (department) => {
        const fieldCount = await Field.countDocuments({ department });
        const staffCount = await User.countDocuments({
          'counsellor.department': department,
        });
        const questionCount = await Question.countDocuments({ department });
        return {
          _id: department._id,
          departmentName: department.departmentName,
          fieldCount,
          staffCount,
          questionCount,
        };
      })
    );
    res.json({
      success: true,
      departmentStatistics,
      page,
      pages,
      code: 2063,
    });
  }
);
