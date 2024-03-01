import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập tiêu đề câu hỏi'],
  },
  content: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập nội dung câu hỏi'],
  },
  status: {
    type: String,
    trim: true,
    enum: {
      values: ['unanswered', 'pending', 'approved', 'private'],
      message: '{VALUE} không được hổ trợ',
    },
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
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  field: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Field',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
