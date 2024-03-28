import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

import Question from '../../../models/question.js';

import QueryAPI from '../../../util/db/query-api.js';
import paginateResults from '../../../util/db/pagination.js';

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
  const query = Question.find({
    status: 'publicly-answered-and-approved',
    // status: 'publicly-answered-pending-approval', // for test
  })
    .populate({
      path: 'answer',
      populate: {
        path: 'user',
        select: '_id fullName avatar',
      },
    })
    .populate({
      path: 'user',
      select: '_id fullName avatar',
    })
    // .lean()
    .select('_id title content file createdAt views user answer');

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
      const user = await question.user.getUserInQuestion();

      const counsellor = await question.answer.user.getUserInQuestion();

      const answer = await question.answer.getAnswerInQuestion();
      return {
        ...questionInformation,
        user,
        answer: {
          user: { ...counsellor },
          ...answer,
        },
      };
    })
  );

  res.json({
    success: true,
    questions,
    page,
    pages,
    code: 2033,
  });
});