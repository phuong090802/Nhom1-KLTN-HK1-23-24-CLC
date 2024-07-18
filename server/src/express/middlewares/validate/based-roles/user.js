import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../catch-async-errors.js';

// Kiểm tra người dùng có đủ điều kiện rating (người hỏi và người rating là 1 người)
export const handleCheckRating = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  const question = req.foundQuestion;
  if (!user._id.equals(question.user)) {
    const msg = 'Bạn không thể đánh giá câu trả lời';
    return next(new ErrorHandler(400, msg, 4128));
  }
  next();
});

export const handleCheckRatingValue = (req, res, next) => {
  const { rating } = req.body;
  if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
    const msg = 'Giá trị đánh giá không hợp lệ';
    return next(new ErrorHandler(400, msg, 4129));
  }
  next();
};
