import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import Question from '../../../../models/question.js';
import { convertTimeAndGenerateRangesForStatistic } from '../../../../util/generate/time-converter.js';

// Endpoint: /api/statistics/question/:id
// Method: GET
// Description: Thông kê câu hỏi trong hệ thống
export const handleStatisticQuestions = catchAsyncErrors(
  async (req, res, next) => {
    // validate
    const { timeUnit, latestTime } = req.body;

    const ranges = convertTimeAndGenerateRangesForStatistic(
      timeUnit,
      latestTime
    );

    const questionStatistic = await Promise.all(
      ranges.map(async (range) => {
        const { start, end } = range;
        const query = {
          createdAt: {
            $gte: start,
            $lte: end,
          },
        };

        const countOfQuestions = await Question.countDocuments(query);

        return {
          date: {
            start,
            end,
          },
          countOfQuestions,
        };
      })
    );

    res.json({
      success: true,
      questionStatistic,
      code: 2080,
    });
  }
);
