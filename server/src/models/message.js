import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Tin nhắn phải thuộc về một cuộc trò chuyện'],
    ref: 'Conversation',
  },
  content: {
    type: String,
    required: [true, 'Vui lòng nhập nội dung tin nhắn'],
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Tin nhắn phải được gửi bởi người dùng'],
    ref: 'User',
  },
  viewed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
