import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Câu hỏi không thể để trống'],
  },
  answer: {
    type: String,
    required: [true, 'Nội dung câu trả lời không thể trống'],
  },
  answerAttachment: {
    ref: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'Vui lòng nhập mã khoa'],
  },
  field: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Field',
    required: [true, 'Vui lòng nhập mã lĩnh vực'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FAQ = mongoose.model('FAQ', faqSchema);
export default FAQ;
