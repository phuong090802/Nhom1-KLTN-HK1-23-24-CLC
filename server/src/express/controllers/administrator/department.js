import Department from '../../../models/department.js';
import Question from '../../../models/question.js';
import catchAsyncErrors from '../../middlewares/catch-async-errors.js';
import { OVERDUE } from '../../../constants/reminder.js';
import QueryAPI from '../../../util/db/query-api.js';
import { handleReminderPagination } from '../../../util/db/pagination.js';

// Endpoint: /api/admin/departments/reminder
// Method: GET
// Description: Lấy danh sách khoa cần nhắc nhở do quá hạn (3 ngày chưa trả lời) - (tìm kiếm, sắp xếp, phân trang)
export const handleGetDepartmentsOverDue = catchAsyncErrors(
  async (req, res, next) => {
    const query = Department.find({
      $or: [
        { lastRemindedAt: { $lte: new Date(Date.now() - OVERDUE) } },
        { lastRemindedAt: { $eq: null } },
      ],
    })
      .select('departmentName lastRemindedAt')
      .lean();
    const queryAPI = new QueryAPI(query, req.query).search();
    const departments = await queryAPI.query;
    const fetchOverDueQuestionsHandler = async (department) => {
      const totalOverDueQuestion = await Question.countDocuments({
        createdAt: { $lte: new Date(Date.now() - OVERDUE) },
        department: department._id,
        status: 'unanswered',
      });
      if (totalOverDueQuestion > 0) {
        delete department.lastRemindedAt;
        return {
          ...department,
          totalOverDueQuestion,
        };
      }
      return null;
    };

    const { page, size } = req.query;
    const {
      records: departmentsWithOverDueQuestion,
      page: _,
      pages,
    } = await handleReminderPagination({
      data: departments,
      page,
      size,
      handler: fetchOverDueQuestionsHandler,
    });
    res.json({
      success: true,
      departmentsWithOverDueQuestion,
      page,
      pages,
      code: 2098,
    });
  }
);
