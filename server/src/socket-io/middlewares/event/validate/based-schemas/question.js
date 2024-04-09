import questionStatus from '../../../../../constants/mapper/question-status.js';
import ErrorHandler from '../../../../../util/error/socket-io-error-handler.js';

// kiểm tra Id câu hỏi có tồn tại có tồn tại trong DB không
export const handleValidateQuestion = (question) => {
  if (!question) {
    throw new ErrorHandler('Quyền truy cập không hợp lệ', 4052);
  }
};

// kiểm tra trạng thái của câu hỏi
export const handleCheckStatusOfQuestion = (question, status) => {
  if (question.status !== status) {
    const msg = `Không tìm thấy câu hỏi ở trạng thái: '${questionStatus[status]}'`;
    throw new ErrorHandler(msg, 4086);
  }
};
