import Question from '../../../../models/question.js';
import { convertTimeAndGenerateRangesForStatistic } from '../../../../util/generate/time-converter.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/counsellor/statistics/question
// Method: POST
// Description: Tư vấn viên đếm số câu hỏi đã trả lời trong một khoảng thời gian
export const handleStatisticQuestions = catchAsyncErrors(
  async (req, res, next) => {
    // validate
    const user = req.user;
    const { timeUnit, latestTime } = req.body;
    const ranges = convertTimeAndGenerateRangesForStatistic(
      timeUnit,
      latestTime
    );
    const questionsStatistic = await Promise.all(
      ranges.map(async (range) => {
        const { start, end } = range;
        const query = {
          'answer.user': user._id,
          createdAt: {
            $gte: start,
            $lte: end,
          },
        };
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
          countOfAnsweredQuestions,
        };
      })
    );
    res.json({
      success: true,
      questionsStatistic,
      code: 2087,
    });
  }
);
