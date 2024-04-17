import mongoose from 'mongoose';

import answerSchema from './embedded/answer.js';
import * as questionAction from '../constants/actions/question.js';
import { formatUser } from '../util/format/user.js';
import { formatAnswer } from '../util/format/answer.js';

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
questionSchema.methods.getQuestionInformation = function (action) {
  // console.log(this);
  const baseQuestion = {
    _id: this._id,
    title: this.title,
    content: this.content,
    createdAt: this.createdAt,
    fileURL: this.file.url,
  };

  switch (action) {
    case questionAction.DEPARTMENT_HEAD_OR_COUNSELLOR_GET_ALL_QUESTIONS:
      return {
        ...baseQuestion,
        user: formatUser(this.user),
        field: this.field.fieldName,
      };
    case questionAction.USER_GET_ALL_QUESTIONS:
      let answer = null;
      if (this.answer) {
        answer = formatAnswer(this.answer);
      }
      return {
        ...baseQuestion,
        answer,
      };
    case questionAction.HOME_GET_ALL_QUESTIONS:
      return {
        ...baseQuestion,
        views: this.views,
        user: formatUser(this.user),
        answer: formatAnswer(this.answer),
      };
    case questionAction.DEPARTMENT_HEAD_GET_ALL_QUESTIONS:
      return {
        ...baseQuestion,
        user: formatUser(this.user),
        answer: formatAnswer(this.answer),
      };
    default:
      return baseQuestion;
  }
};

const Question = mongoose.model('Question', questionSchema);

export default Question;
