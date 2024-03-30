import catchAsyncErrors from '../../middlewares/catch-async-errors.js';
import Department from '../../../models/department.js';
import Field from '../../../models/field.js';
import User from '../../../models/user.js';
import Question from '../../../models/question.js';
import QueryAPI from '../../../utils/db/query-api.js';
import paginate from '../../../utils/db/paginate.js';

// Endpoint: /api/statistic/departments/:id
// Method: GET
// Description: Thông kê khoa bằng id
export const handleStatisticDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;

    // validate
    const { timeUnit, timestamp } = req.body;

    const current = new Date();
    const currentYear = current.getFullYear();

    const offset = currentYear - timestamp;

    // begin: thời gian hiện tại
    // end: thời gian hiện tại + timestamp
    // lặp qua và tìm trong db
    // push vào
    // res
  }
);

// Endpoint: /api/statistic/departments
// Method: GET
// Description: Thông kê tất cả các khoa
export const handleStatisticDepartments = catchAsyncErrors(
  async (req, res, next) => {
    const departmentStatistics = [];

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

    await Promise.all(
      departments.map(async (department) => {
        const fieldCount = await Field.countDocuments({ department });
        const staffCount = await User.countDocuments({
          'counsellor.department': department,
        });
        const questionCount = await Question.countDocuments({ department });

        departmentStatistics.push({
          _id: department._id,
          departmentName: department.departmentName,
          fieldCount,
          staffCount,
          questionCount,
        });
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
