import mongoose from 'mongoose';

import { hasArrayMaxLength } from '../util/validation.js';

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

conversationSchema.methods.getLatestConversation = function (message) {
  return {
    _id: this._id,
    lastMessage: {
      _id: message._id,
      content: message.content,
      sender: message.sender._id,
      view: message.viewed,
      createdAt: message.createdAt,
    },
    createdAt: this.createdAt,
  };
};

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
