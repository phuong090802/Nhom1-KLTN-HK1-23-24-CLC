import mongoose from 'mongoose';

import { hasArrayMaxLength } from '../util/validation.js';

import Message from './message.js';

const conversationSchema = new mongoose.Schema({
  participates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

conversationSchema.pre('save', function (next) {
  if (!this.isModified('participates')) {
    return next();
  }

  if (!hasArrayMaxLength(this.participates, 2)) {
    return next(
      new ErrorHandler(
        400,
        'Không thể vượt quá 2 người trong một cuộc trò chuyện',
        4056
      )
    );
  }

  next();
});

conversationSchema.pre('save', function (next) {
  if (!this.isModified('deletedBy')) {
    return next();
  }

  if (!hasArrayMaxLength(this.deletedBy, 2)) {
    return next(
      new ErrorHandler(
        400,
        'Không thể vượt quá 2 người trong một cuộc trò chuyện',
        4053
      )
    );
  }
  next();
});

// set structure for detail conversation
conversationSchema.methods.detailConversation = async function () {
  const message = await Message.findById(this.lastMessage);
  const lastMessage = await message.getFormatMessage();
  return {
    _id: this._id,
    lastMessage: lastMessage,
    createdAt: this.createdAt,
  };
};

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
