import Question from '../../../models/question.js';

import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

import QueryAPI from '../../../utils/query-api.js';
import paginateResults from '../../../utils/pagination.js';

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

      let counsellor ;
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

// endpoint: /api/user/questions
// method: POST
// description: Đặt câu hỏi
export const makeQuestionHandler = catchAsyncErrors(async (req, res, next) => {
  const department = req.foundDepartment;
  const field = req.foundField;
  const user = req.user;
  const { title, content } = req.body;
  const file = req.uploadedFile;

  await Question.create({ title, content, department, field, user, file });

  res.status(201).json({
    success: true,
    message: 'Đặt câu hỏi thành công',
    code: 2030,
  });
});
