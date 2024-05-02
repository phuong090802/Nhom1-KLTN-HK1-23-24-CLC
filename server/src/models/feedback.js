import mongoose from 'mongoose';

import answerSchema from './embedded/answer.js';

const feedbackSchema = new mongoose.Schema({
  content: {
    type: String,
    // default content if it empty or null
    default: 'Câu trả lời không phù hợp! Kiểm tra lại',
  },
  answer: {
    type: answerSchema,
    required: [true, 'Không tìm thấy thông tin câu trả lời'],
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: [true, 'Không tìm thấy thông tin câu hỏi'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

feedbackSchema.pre('validate', function (next) {
  if (typeof this.content === 'string' && this.content.trim().length === 0) {
    this.content = 'Câu trả lời không phù hợp! Kiểm tra lại';
  }
  next();
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
