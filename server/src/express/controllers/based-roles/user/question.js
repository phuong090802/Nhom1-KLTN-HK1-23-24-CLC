import { USER_GET_ALL_QUESTIONS } from '../../../../constants/actions/question.js';
import Question from '../../../../models/question.js';
import handlePagination from '../../../../util/db/pagination.js';
import QueryAPI from '../../../../util/db/query-api.js';
import QueryTransform from '../../../../util/db/query-transform.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/user/questions
// Method: GET
// Description: Lấy danh sách câu hỏi bản thân đã đặt (sắp xếp, tìm kiếm, lọc, phân trang)
export const handleGetQuestions = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  const query = Question.find()
    .populate({
      path: 'answer',
      select: 'content file.url answeredAt',
      populate: { path: 'user', select: '-_id fullName avatar.url' },
    })
    .select('title content file createdAt answer');
  // .lean()
  // không sử dụng learn vì method trong được tạo schema
  const queryTransform = new QueryTransform(req.query).applyFilters({
    user: user._id,
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
    question.getQuestionInformation(USER_GET_ALL_QUESTIONS)
  );
  res.json({
    success: true,
    questions,
    page,
    pages,
    code: 2050,
  });
});
