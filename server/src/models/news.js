import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Vui lòng nhập tiêu đề tin tức'],
    },
    content: {
      type: String,
      required: [true, 'Vui lòng nhập nội dung tin tức'],
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'news' }
);

const News = mongoose.model('News', newsSchema);
export default News;
