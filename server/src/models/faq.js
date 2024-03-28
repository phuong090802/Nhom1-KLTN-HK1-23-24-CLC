import mongoose from 'mongoose';

import Department from './department.js';
import Field from './field.js';

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

// set structure for user request FAQ
faqSchema.methods.userRequestFAQInformation = async function () {
  const department = await Department.findById(this.department);
  const field = await Field.findOne({ _id: this.field._id, department });
  return {
    _id: this._id,
    question: this.question,
    department: department !== null ? department.departmentName : null,
    field: field !== null ? field.fieldName : null,
    answer: this.answer,
    answerAttachment: this.answerAttachment.url,
    createdAt: this.createdAt,
  };
};

// set structure for department-head request FAQ
faqSchema.methods.departmentHeadRequestFAQInformation = async function () {
  const field = await Field.findOne({
    _id: this.field._id,
    department: this.department,
  });
  return {
    _id: this._id,
    question: this.question,
    field: field !== null ? field.fieldName : null,
    answer: this.answer,
    answerAttachment: this.answerAttachment.url,
    createdAt: this.createdAt,
  };
};

const FAQ = mongoose.model('FAQ', faqSchema);

export default FAQ;
