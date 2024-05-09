import { HOME_GET_ALL_QUESTIONS } from '../../../constants/actions/question.js';
import Question from '../../../models/question.js';
import handlePagination from '../../../util/db/pagination.js';
import QueryAPI from '../../../util/db/query-api.js';
import QueryTransform from '../../../util/db/query-transform.js';
import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

// Endpoint: /api/questions/:id
// Method: PUT
// Description: Tăng view cho câu hỏi đã trả lời
export const handleUpdateViewsOfQuestion = catchAsyncErrors(
  async (req, res, next) => {
    const question = req.foundQuestion;
    question.views += 1;
    await question.save();
    res.status(204);
  }
);

// Endpoint: /api/questions
// Method: GET
// Description: Lấy danh sách các câu hỏi đã được trả lời công khai và đã được duyệt (sắp xếp, tìm kiếm, lọc, phân trang)
export const handleGetQuestions = catchAsyncErrors(async (req, res, next) => {
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
  const reqSort = req.query.sort?.createdAt;
  const queryTransform = new QueryTransform(req.query)
    .applyFilters({
      status: 'publicly-answered-and-approved',
    })
    .defaultSortNewest({
      ...(!reqSort && { createdAt: -1 }),
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
    question.getQuestionInformation(HOME_GET_ALL_QUESTIONS)
  );
  res.json({
    success: true,
    questions,
    page,
    pages,
    code: 2033,
  });
});
