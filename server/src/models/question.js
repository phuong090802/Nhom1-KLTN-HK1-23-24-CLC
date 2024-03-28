import mongoose from 'mongoose';

import answerSchema from './embedded/answer.js';
import {
  DEPARTMENT_HEAD_OR_COUNSELLOR_GET_ALL_QUESTIONS,
  HOME_GET_ALL_QUESTIONS,
  USER_GET_ALL_QUESTIONS,
} from '../constants/actions/question.js';

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
  const baseQuestion = {
    _id: this._id,
    title: this.title,
    content: this.content,
    createdAt: this.createdAt,
    fileURL: this.file.url,
  };

  switch (action) {
    case DEPARTMENT_HEAD_OR_COUNSELLOR_GET_ALL_QUESTIONS:
      return {
        ...baseQuestion,
        user: {
          fullName: this.user.fullName,
          avatar: this.user.avatar.url,
        },
        field: this.field.fieldName,
      };
    case USER_GET_ALL_QUESTIONS:
      let answer = null;
      if (this.answer) {
        answer = {
          content: this.answer.content,
          fileURL: this.answer.file.url,
          user: {
            fullName: this.answer.user.fullName,
            avatar: this.answer.user.avatar.url,
          },
          answeredAt: this.answer.answeredAt,
        };
      }
      return {
        ...baseQuestion,
        answer,
      };
    case HOME_GET_ALL_QUESTIONS:
      return {
        ...baseQuestion,
        user: {
          fullName: this.user.fullName,
          avatar: this.user.avatar.url,
        },
        answer: {
          content: this.answer.content,
          fileURL: this.answer.file.url,
          user: {
            fullName: this.answer.user.fullName,
            avatar: this.answer.user.avatar.url,
          },
          answeredAt: this.answer.answeredAt,
        },
      };
    default:
      return baseQuestion;
  }
};

const Question = mongoose.model('Question', questionSchema);

export default Question;
