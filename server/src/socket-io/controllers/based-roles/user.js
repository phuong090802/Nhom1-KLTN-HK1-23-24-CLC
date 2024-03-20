import mongoose from 'mongoose';

import Conversation from '../../../models/conversation.js';
import Message from '../../../models/message.js';

import catchAsyncErrors from '../../middlewares/catch-async-errors.js';
import ErrorHandler from '../../../util/error/socket-io-error-handler.js';

export const createMessage = catchAsyncErrors(
  async (socket, payload, callback) => {
    const { conversationId, messageContent } = payload;
    // console.log(conversationId, messageContent);

    const user = socket.user;

    // check user in array participates

    const conversation = await Conversation.findById(conversationId);

    const participates = conversation.participates;
    // console.log(participates);

    if (!participates.includes(user._id)) {
      throw new ErrorHandler('Không tìm thấy cuộc trò chuyện', 4088);
    }

    const _id = new mongoose.Types.ObjectId();

    callback({
      success: true,
      id: _id,
      code: 2052,
    });

    const message = await Message.create({
      _id,
      content: messageContent,
      sender: user,
      conversation,
    });

    conversation.lastMessage = message;

    const savedConversation = await conversation.save();

    const latestConversation = await savedConversation.detailConversation();

    // console.log(participates);

    const [receiver] = participates.filter(
      (participate) => !participate.equals(user._id)
    );

    // console.log(receiver);

    socket.emit(`${receiver._id.toString()}:read`, latestConversation);
  }
);
