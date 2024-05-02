import Question from '../../models/question.js';
import { convertTimeAndGenerateRangesForStatistic } from '../generate/time-converter.js';

export async function handleCountQuestions(timeUnit, latestTime, department) {
  const ranges = convertTimeAndGenerateRangesForStatistic(timeUnit, latestTime);
  const departmentStatistic = await Promise.all(
    ranges.map(async (range) => {
      const { start, end } = range;
      // console.log(start.toLocaleDateString(), '-', end.toLocaleDateString());
      const query = {
        department,
        createdAt: {
          $gte: start,
          $lte: end,
        },
      };
      const countOfQuestions = await Question.countDocuments(query);
      const countOfAnsweredQuestions = await Question.countDocuments({
        $or: [
          { status: 'publicly-answered-and-approved', answer: { $ne: null } },
          { status: 'privately-answered' },
        ],
        ...query,
      });
      return {
        date: {
          start,
          end,
        },
        countOfQuestions,
        countOfAnsweredQuestions,
      };
    })
  );

  return departmentStatistic;
}
