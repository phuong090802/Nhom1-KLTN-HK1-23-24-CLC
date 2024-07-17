import Question from '../../models/question.js';
import User from '../../models/user.js';
import QueryAPI from '../db/query-api.js';

export const handleCounsellorAndAssignQuestionUnanswered = async (filter) => {
  const query = User.find().select('fullName avatar.url');

  const queryAPI = new QueryAPI(query, filter).search().filter().sort();
  const retCounsellors = await queryAPI.query;
  const returnedCounsellors = await Promise.all(
    retCounsellors.map(async (counsellor) => {
      const countOfAssignQuestions = await Question.countDocuments({
        assignTo: counsellor._id,
        status: 'unanswered',
      });
      counsellor.avatar = counsellor.avatar.url;
      return {
        counsellor,
        countOfAssignQuestions,
      };
    })
  );
  return returnedCounsellors;
};
