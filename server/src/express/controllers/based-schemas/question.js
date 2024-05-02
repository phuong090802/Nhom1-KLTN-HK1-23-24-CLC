import { HOME_GET_ALL_QUESTIONS } from '../../../constants/actions/question.js';
import Question from '../../../models/question.js';
import defaultSortNewest from '../../../util/db/default-sort.js';
import paginate from '../../../util/db/paginate.js';
import QueryAPI from '../../../util/db/query-api.js';
import queryFiltersLimit from '../../../util/db/query-filters-limit.js';
import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

// Endpoint: /api/questions/:id
// Method: PUT
// Description: Lấy danh sách các câu hỏi đã được trả lời công khai và đã được duyệt
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
// Description: Lấy danh sách các câu hỏi đã được trả lời công khai và đã được duyệt
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
  const filterStatus = { status: 'publicly-answered-and-approved' };
  const requestQueryTransform = queryFiltersLimit(req.query, filterStatus);
  const reqSort = req.query.sort?.createdAt;
  const requestQuery = defaultSortNewest(
    requestQueryTransform,
    !reqSort && { createdAt: -1 }
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
