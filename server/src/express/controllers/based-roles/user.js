import Question from '../../../models/question.js';

import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

import paginateResults from '../../../util/db/pagination.js';
import QueryAPI from '../../../util/db/query-api.js';

// endpoint: /api/user/questions
// method: GET
// description: Lấy danh sách câu hỏi bản thân đã đặt
export const questionsHandler = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  const query = Question.find({ user })
    .populate({
      path: 'answer',
      populate: {
        path: 'user',
        select: '_id fullName avatar',
      },
    })
    // .lean()
    .select('_id title content file createdAt views answer');

  const queryAPI = new QueryAPI(query, req.query).search().filter().sort();
  let questionRecords = await queryAPI.query;
  const numberOfQuestions = questionRecords.length;
  questionRecords = await queryAPI.pagination().query.clone();
  const {
    data: retQuestions,
    page,
    pages,
  } = paginateResults(
    numberOfQuestions,
    req.query.page,
    req.query.size,
    questionRecords
  );

  const questions = await Promise.all(
    retQuestions.map(async (question) => {
      const questionInformation = await question.getQuestionInformation();

      let counsellor;
      let answer = null;

      if (question.answer) {
        counsellor = await question.answer.user.getUserInQuestion();
        const gotAnswer = await question.answer.getAnswerInQuestion();
        answer = {
          user: { ...counsellor },
          ...gotAnswer,
        };
      }

      return {
        ...questionInformation,
        answer,
      };
    })
  );

  res.json({
    success: true,
    questions,
    page,
    pages,
    code: 2050,
  });
});
