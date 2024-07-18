import Question from '../../models/question.js';

export const handleCountAssignQuestionUnanswered = async (counsellors) => {
  const returnedCounsellors = await Promise.all(
    counsellors.map(async (counsellor) => {
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
