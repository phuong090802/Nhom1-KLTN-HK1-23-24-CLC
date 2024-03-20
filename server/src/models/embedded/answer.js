import mongoose from 'mongoose';

const answerSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Vui lòng nhập nội dung câu trả lời'],
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Người trả lời câu hỏi không thể trống'],
    },
    answeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

answerSchema.methods.getAnswerInQuestion = async function () {
  return {
    content: this.content,
    fileURL: this.file.url,
    answeredAt: this.answeredAt,
  };
};

export default answerSchema;
