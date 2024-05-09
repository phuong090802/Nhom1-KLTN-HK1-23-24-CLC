import questionStatus from '../../../../constants/mapper/question-status.js';
import Question from '../../../../models/question.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../catch-async-errors.js';

// kiểm tra id câu hỏi có tồn tại có tồn tại trong DB không
export const handleValidateQuestionId = (location = 'params', key = 'id') => {
  return catchAsyncErrors(async (req, res, next) => {
    const id = req[location][key];
    const question = await Question.findById(id);
    if (!question) {
      return next(new ErrorHandler(404, 'Không tìm thấy câu hỏi', 4084));
    }
    req.foundQuestion = question;
    next();
  });
};

export const handleValidateStatusOfQuestion = (status) => {
  return catchAsyncErrors((req, res, next) => {
    const question = req.foundQuestion;
    if (question.status !== status) {
      const msg = `Không tìm thấy câu hỏi ở trạng thái: ${questionStatus[status]}`;
      return next(new ErrorHandler(404, msg, 4085));
    }
    next();
  });
};

// Kiểm tra câu hỏi có thuộc về khoa hay không trước khi chuyển tiếp
export const handleCheckQuestionBelongToDepartment = catchAsyncErrors(
  (req, res, next) => {
    const user = req.user;
    const question = req.foundQuestion;
    if (!question.department.equals(user.counsellor.department)) {
      const msg = 'Không tìm thấy câu hỏi thuộc về khoa';
      return next(new ErrorHandler(404, msg, 4098));
    }
    next();
  }
);
