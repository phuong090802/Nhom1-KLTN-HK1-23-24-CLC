import mongoose from 'mongoose';

import answerSchema from './embedded/answer.js';

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Vui lòng nhập tiêu đề câu hỏi'],
  },
  content: {
    type: String,
    required: [true, 'Vui lòng nhập nội dung câu hỏi'],
  },
  file: {
    ref: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
  },
  status: {
    type: String,
    trim: true,
    enum: {
      values: [
        'unanswered', // chưa được trả lời
        'publicly-answered-pending-approval', // đã trả lời công khai và chờ duyệt
        'publicly-answered-and-approved', // trả lời công khai và đã được duyệt
        'privately-answered', // trả lời riêng tư
      ],
      message: '{VALUE} không được hổ trợ',
    },
    default: 'unanswered',
  },
  views: {
    type: Number,
    default: 0,
  },
  isForwarded: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Người đặt câu hỏi không thể trống'],
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
  answer: {
    type: answerSchema,
    default: null,
  },
});

// cách này không tìm chay
// populate rồi dùng phương thức bên kia
questionSchema.methods.getQuestionInformation = async function () {
  const user = await this.user.getUserInQuestion();
  const counsellor = await this.answer.user.getUserInQuestion();
  const answer = await this.answer.getAnswerInQuestion();
  return {
    _id: this._id,
    title: this.title,
    content: this.content,
    createdAt: this.createdAt,
    fileURL: this.file.url,
    views: this.views,
    user,
    answer: {
      user: { ...counsellor },
      ...answer,
    },
  };
};


questionSchema.methods.counsellorGetQuestionInformation = async function () {
  const user = await this.user.getUserInQuestion();
  const field = await this.field.getFieldInQuestion();

  return {
    _id: this._id,
    title: this.title,
    content: this.content,
    createdAt: this.createdAt,
    fileURL: this.file.url,
    views: this.views,
    user,
    field,
  };
};

const Question = mongoose.model('Question', questionSchema);

export default Question;
