import { DEPARTMENT_HEAD_GET_ALL_QUESTIONS } from '../../../../constants/actions/question.js';
import Question from '../../../../models/question.js';
import paginate from '../../../../util/db/paginate.js';
import QueryAPI from '../../../../util/db/query-api.js';
import queryFiltersLimit from '../../../../util/db/query-filters-limit.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/department-head/questions
// Method: GET
// Description: Trưởng khoa lấy danh sách câu hỏi có trả lời cầu duyệt
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
    const filterStatus = { status: 'publicly-answered-pending-approval' };
    const filterDepartment = { department: department._id };
    const requestQuery = queryFiltersLimit(
      req.query,
      filterDepartment,
      filterStatus
    );
    const queryAPI = new QueryAPI(query, requestQuery).search().filter().sort();
    let questionRecords = await queryAPI.query;
    const numberOfQuestions = questionRecords.length;
    questionRecords = await queryAPI.pagination().query.clone();
    const {
      data: retQuestions,
      page,
      pages,
    } = paginate(
      numberOfQuestions,
      req.query.page,
      req.query.size,
      questionRecords
    );
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
