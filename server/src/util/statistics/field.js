import Question from '../../models/question.js';

export async function handleCountQuestionsByFieldsAndDepartment(fields) {
  const fieldStatistic = await Promise.all(
    fields.map(async (field) => {
      const countOfQuestions = await Question.countDocuments({
        field,
      });
      return {
        field,
        countOfQuestions,
      };
    })
  );

  return fieldStatistic;
}
