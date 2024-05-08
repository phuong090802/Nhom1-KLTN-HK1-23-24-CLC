import { HOME_GET_ALL_QUESTIONS } from '../../../../constants/actions/question.js';
import Question from '../../../../models/question.js';
import QueryTransform from '../../../../util/db/query-transform.js';
import handleSkipAndLimit from '../../../../util/db/skip-and-limit.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/mobile/questions
// Method: GET
// Description: Lấy danh sách các câu hỏi đã được trả lời công khai và đã được duyệt (cho di động)
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

  const { records: retQuestions, totals: totalQuestions } =
    await handleSkipAndLimit(query, queryTransform.query);
  const questions = retQuestions.map((question) =>
    question.getQuestionInformation(HOME_GET_ALL_QUESTIONS)
  );
  res.json({
    success: true,
    questions,
    totalQuestions,
    code: 2092,
  });
});
