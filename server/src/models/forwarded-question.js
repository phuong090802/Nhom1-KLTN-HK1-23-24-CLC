import mongoose from 'mongoose';

const forwardedQuestionSchema = mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: [true, 'Vui lòng nhập mã câu hỏi'],
    unique: true,
  },
  fromDepartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'Vui lòng nhập mã chuyển tiếp câu hỏi'],
  },
  toDepartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'Vui lòng nhập mã khoa nhận câu hỏi'],
  },
  forwardedAt: {
    type: Date,
    default: Date.now,
  },
});

const forwardedQuestion = mongoose.model(
  'forwardedQuestion',
  forwardedQuestionSchema
);

export default forwardedQuestion;
