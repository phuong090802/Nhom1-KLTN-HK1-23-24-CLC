import catchAsyncErrors from '../../catch-async-errors.js';
import Feedback from '../../../../models/feedback.js';

// Kiểm tra feedback id được truyền vào
export const handleValidateFeedbackIdInParams = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return next(new ErrorHandler(404, 'Không tìm thấy phản hồi', 4112));
    }

    req.foundFeedback = feedback;
    next();
  }
);

// Kiểm tra feedback id được truyền vào có phải của tư vấn viên không
export const handleCheckFeedbackBelongToCounsellor = catchAsyncErrors(
  (req, res, next) => {
    const user = req.user;
    const feedback = req.foundFeedback;

    if (!feedback.answer.user.equals(user._id)) {
      return next(new ErrorHandler(404, 'Không tìm thấy phản hồi', 4070));
    }

    next();
  }
);
