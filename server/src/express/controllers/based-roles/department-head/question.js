import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import Question from '../../../../models/question.js';

// Endpoint: /api/department-head/questions/unanswered-question
// Method: GET
// Description: Trưởng khoa kiểm tra có câu hỏi cần trả lời hay không
export const handleCheckUnansweredQuestionExits = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;
    const { department } = user.counsellor;

    const numberOfQuestions = await Question.countDocuments({
      department,
      status: 'unanswered',
    });

    res.json({
      success: true,
      hasNewQuestions: numberOfQuestions > 0,
      code: 2071,
    });
  }
);
