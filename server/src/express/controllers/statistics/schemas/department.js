import Department from '../../../../models/department.js';
import Field from '../../../../models/field.js';
import Question from '../../../../models/question.js';
import User from '../../../../models/user.js';
import paginate from '../../../../utils/db/paginate.js';
import QueryAPI from '../../../../utils/db/query-api.js';
import { convertTimeAndGenerateRangesForStatistic } from '../../../../utils/generate/time-converter.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/statistics/department/:id
// Method: GET
// Description: Thông kê khoa bằng id
export const handleStatisticDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;

    // validate
    const { timeUnit, latestTime } = req.body;

    const ranges = convertTimeAndGenerateRangesForStatistic(
      timeUnit,
      latestTime
    );

    const departmentStatistic = await Promise.all(
      ranges.map(async (range) => {
        const { start, end } = range;
        // console.log(start.toLocaleDateString(), '-', end.toLocaleDateString());
        // console.log(start, '-', end);
        const query = {
          department,
          createdAt: {
            $gte: start,
            $lte: end,
          },
        };

        const countOfQuestions = await Question.countDocuments(query);

        const countOfAnsweredQuestions = await Question.countDocuments({
          $or: [
            { status: 'publicly-answered-and-approved', answer: { $ne: null } },
            { status: 'privately-answered' },
          ],
          ...query,
        });

        return {
          date: {
            start,
            end,
          },
          countOfQuestions,
          countOfAnsweredQuestions,
        };
      })
    );

    res.json({
      success: true,
      departmentStatistic,
      code: 2065,
    });
  }
);

// Endpoint: /api/statistics/department
// Method: GET
// Description: Thông kê tất cả các khoa
export const handleStatisticDepartments = catchAsyncErrors(
  async (req, res, next) => {
    // sort, search

    const query = Department.find();

    const queryAPI = new QueryAPI(query, req.query).search().sort();

    let departmentRecords = await queryAPI.query;
    const numberOfDepartments = departmentRecords.length;
    departmentRecords = await queryAPI.pagination().query.clone();

    const {
      data: departments,
      page,
      pages,
    } = paginate(
      numberOfDepartments,
      req.query.page,
      req.query.size,
      departmentRecords
    );

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
