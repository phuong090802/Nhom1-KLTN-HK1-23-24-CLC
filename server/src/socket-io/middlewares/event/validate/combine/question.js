import * as validateQuestion from '../../validate/based-schemas/question.js';

// kiểm tra id câu hỏi và trạng thái câu hỏi
export const handleCheckQuestionAndStatus = (question, status) => {
  validateQuestion.handleValidateQuestion(question);
  validateQuestion.handleCheckStatusOfQuestion(question, status);
};
