import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

import Question from '../../../models/question.js';

import QueryAPI from '../../../util/db/query-api.js';
import paginate from '../../../util/db/paginate.js';

import { HOME_GET_ALL_QUESTIONS } from '../../../constants/actions/question.js';
import queryFiltersLimit from '../../../util/db/query-filters-limit.js';

// endpoint: /api/questions/:id
// method: PUT
// description: Lấy danh sách các câu hỏi đã được trả lời công khai và đã được duyệt
export const updateViewsHandler = catchAsyncErrors(async (req, res, next) => {
  const question = req.foundQuestion;
  question.views += 1;
  await question.save();
  res.status(204);
});

// endpoint: /api/questions
// method: GET
// description: Lấy danh sách các câu hỏi đã được trả lời công khai và đã được duyệt
export const questionsHandler = catchAsyncErrors(async (req, res, next) => {
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

  const requestQuery = queryFiltersLimit(req.query, filterStatus);

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
