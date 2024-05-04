import Department from '../../../../models/department.js';
import Question from '../../../../models/question.js';
import handlePagination from '../../../../util/db/pagination.js';
import QueryAPI from '../../../../util/db/query-api.js';
import { convertTimeAndGenerateRangesForStatistic } from '../../../../util/generate/time-converter.js';
import { handleCountQuestions } from '../../../../util/statistics/department.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/admin/statistics/department/:id/question
// Method: POST
// Description: admin thống kê câu hỏi trong khoa (trả lời công khai và đã được duyệt, trả lời riêng tư)
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

// Endpoint: /api/admin/statistics/question
// Method: POST
// Description: Admin thống kê câu hỏi trong hệ thống
export const handleCountOfQuestion = catchAsyncErrors(
  async (req, res, next) => {
    // validate
    const { timeUnit, latestTime } = req.body;
    const ranges = convertTimeAndGenerateRangesForStatistic(
      timeUnit,
      latestTime
    );
    const questionStatistic = await Promise.all(
      ranges.map(async (range) => {
        const { start, end } = range;
        const query = {
          createdAt: {
            $gte: start,
            $lte: end,
          },
        };
        const countOfQuestions = await Question.countDocuments(query);
        return {
          date: {
            start,
            end,
          },
          countOfQuestions,
        };
      })
    );
    res.json({
      success: true,
      questionStatistic,
      code: 2080,
    });
  }
);

// Endpoint: /api/admin/statistics/department
// Method: GET
// Description: Admin thông kê tất cả các khoa
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
