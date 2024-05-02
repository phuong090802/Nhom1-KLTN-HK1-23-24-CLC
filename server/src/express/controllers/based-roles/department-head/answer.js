import Question from '../../../../models/question.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/department-head/answers
// Method: GET
// Description: Trưởng khoa kiểm tra có câu hỏi cần trả lời hay không
export const handleCheckUnapprovedAnswerExists = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;
    const { department } = user.counsellor;
    const numberOfAnswers = await Question.countDocuments({
      department,
      status: 'publicly-answered-pending-approval',
    });
    res.json({
      success: true,
      unapprovedAnswerExists: numberOfAnswers > 0,
      code: 2059,
    });
  }
);
