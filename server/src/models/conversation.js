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
    const msg = 'Không thể vượt quá 2 người trong một cuộc trò chuyện';
    return next(new ErrorHandler(400, msg, 4056));
  }
  next();
});

conversationSchema.pre('save', function (next) {
  if (!this.isModified('deletedBy')) {
    return next();
  }
  if (!hasArrayMaxLength(this.deletedBy, 2)) {
    const msg = 'Không thể vượt quá 2 người trong một cuộc trò chuyện';
    return next(new ErrorHandler(400, msg, 4053));
  }
  next();
});

conversationSchema.methods.getLatestConversation = function (message, sender) {
  const { _id, fullName, avatar } = sender;
  const otherUser = { _id, fullName, avatar: avatar.url };
  return {
    _id: this._id,
    lastMessage: {
      _id: message._id,
      content: message.content,
      sender: message.sender._id,
      view: message.viewed,
      createdAt: message.createdAt,
    },
    otherUser,
    createdAt: this.createdAt,
  };
};

conversationSchema.methods.getConversationInformation = function () {
  const [{ _id, fullName, avatar }] = this.participates;
  const otherUser = { _id, fullName, avatar: avatar.url };
  return {
    _id: this._id,
    lastMessage: this.lastMessage,
    otherUser,
    createdAt: this.createdAt,
  };
};

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;
