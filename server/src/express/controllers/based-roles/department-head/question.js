import { DEPARTMENT_HEAD_GET_ALL_QUESTIONS } from '../../../../constants/actions/question.js';
import Question from '../../../../models/question.js';
import handlePagination from '../../../../util/db/pagination.js';
import QueryAPI from '../../../../util/db/query-api.js';
import QueryTransform from '../../../../util/db/query-transform.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/department-head/questions
// Method: GET
// Description: Trưởng khoa lấy danh sách câu hỏi có trả lời cầu duyệt (lọc, phân trang, tìm kiếm, sắp xếp)
export const handleGetQuestionsIsPendingApproval = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;
    const { department } = user.counsellor;
    const query = Question.find()
      .populate({
        path: 'answer',
        select: 'content file.url answeredAt',
        populate: { path: 'user', select: '-_id fullName avatar.url' },
      })
      .populate({ path: 'user', select: '-_id fullName avatar.url' })
      .select('title content file createdAt views user answer');
    // không sử dụng learn vì method trong được tạo schema
    // .lean()
    const queryTransform = new QueryTransform(req.query).applyFilters({
      status: 'publicly-answered-pending-approval',
      department: department._id,
    });
    const queryAPI = new QueryAPI(query, queryTransform.query)
      .search()
      .filter()
      .sort();
    const {
      records: retQuestions,
      page,
      pages,
    } = await handlePagination(queryAPI, req.query.size, req.query.page);
    const questions = retQuestions.map((question) =>
      question.getQuestionInformation(DEPARTMENT_HEAD_GET_ALL_QUESTIONS)
    );
    res.json({
      success: true,
      questions,
      page,
      pages,
      code: 2083,
    });
  }
);

// Endpoint: /api/department-head/questions/unanswered-question
// Method: GET
// Description: Trưởng khoa kiểm tra có câu hỏi cần trả lời hay không
export const handleCheckUnansweredQuestionExits = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;
    const { department } = user.counsellor;
    const numberOfQuestions = await Question.countDocuments({
      department,
      status: 'unanswered',
    });
    res.json({
      success: true,
      hasNewQuestions: numberOfQuestions > 0,
      code: 2071,
    });
  }
);
