import Question from '../../../../models/question.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/user/statistics/question
// Method: POST
// Description: Người dùng đếm số lượng câu hỏi đã thích
export const handleCountLikedQuestion = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;
    const total = await Question.countDocuments({
      likes: { $in: [user._id] },
    });

    res.json({
      success: true,
      total,
      code: 2097,
    });
  }
);
