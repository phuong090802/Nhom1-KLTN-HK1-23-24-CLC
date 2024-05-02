import mongoose from 'mongoose';

const forwardedQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: [true, 'Vui lòng nhập mã câu hỏi'],
      unique: true,
    },
    fromDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: [true, 'Vui lòng nhập mã khoa chuyển tiếp câu hỏi'],
    },
    toDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: [true, 'Vui lòng nhập mã khoa nhận câu hỏi'],
    },
    field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Field',
      required: [true, 'Vui lòng nhập mã lĩnh vực trước khi chuyển tiếp'],
    },
    forwardedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'forwarded-questions' }
);

const ForwardedQuestion = mongoose.model(
  'ForwardedQuestion',
  forwardedQuestionSchema
);
export default ForwardedQuestion;
