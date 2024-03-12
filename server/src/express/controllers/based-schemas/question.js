import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

import Question from '../../../models/question.js';

import QueryAPI from '../../../utils/query-api.js';
import paginateResults from '../../../utils/pagination.js';

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
    .lean()
    .select('_id title content createdAt views user answer');
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

  const questions = retQuestions.map((question) => {
    const user = {
      ...question.user,
      avatar: question.user.avatar.url,
    };

    const counsellor = {
      _id: question.answer.user._id,
      fullName: question.answer.user.fullName,
      avatar: question.answer.user.avatar.url,
    };

    const answer = {
      ...question.answer,
      user: counsellor,
      fileURL: question.answer.file.url,
    };

    delete answer.file;

    return {
      ...question,
      user,
      answer,
    };
  });

  res.json({
    success: true,
    questions,
    page,
    pages,
    code: 2033,
  });
});
