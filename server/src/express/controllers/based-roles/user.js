import Question from '../../../models/question.js';

import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

import paginate from '../../../util/db/paginate.js';
import QueryAPI from '../../../util/db/query-api.js';
import { USER_GET_ALL_QUESTIONS } from '../../../constants/actions/question.js';
import queryFiltersLimit from '../../../util/db/query-filters-limit.js';

// endpoint: /api/user/questions
// method: GET
// description: Lấy danh sách câu hỏi bản thân đã đặt
export const questionsHandler = catchAsyncErrors(async (req, res, next) => {
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

  const filterUser = {
    user: user._id,
  };

  const requestQuery = queryFiltersLimit(req.query, filterUser);

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
