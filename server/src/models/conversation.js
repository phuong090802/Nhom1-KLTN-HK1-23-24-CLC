import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      validate: [
        arrayLimit,
        'Không thể vượt quá 2 người trong một cuộc trò chuyện',
      ],
    },
  ],
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      validate: [
        arrayLimit,
        'Không thể vượt quá 2 người trong một cuộc trò chuyện',
      ],
    },
  ],
});

// validator function
function arrayLimit(val) {
  return val.length <= 2;
}

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;
