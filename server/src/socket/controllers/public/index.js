import Question from '../../../models/question.js';
import paginateResults from '../../../utils/pagination.js';
import QueryAPI from '../../../utils/query-api.js';

export async function getAllQuestions(socket, payload) {
  const query = Question.find({
    // status: 'publicly-answered-and-approved',
    status: 'publicly-answered-pending-approval', // for test
  })
    .lean()
    .populate({
      path: 'answer',
      select: '_id content user',
      populate: {
        path: 'user',
        select: '_id fullName avatar',
      },
    })
    .populate({
      path: 'user',
      select: '_id fullName avatar',
    })
    .select('_id title content createdAt views user answer');

  const queryAPI = new QueryAPI(query, payload).search().filter().sort();

  let questionRecords = await queryAPI.query;
  const numberOfQuestions = questionRecords.length;
  questionRecords = await queryAPI.pagination().query.clone();

  const {
    data: questions,
    page,
    pages,
  } = paginateResults(
    numberOfQuestions,
    payload.page,
    payload.size,
    questionRecords
  );
  const response = { success: true, questions, page, pages, code: 2033 };
  socket.emit('question:list', response);
}
