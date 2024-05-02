import mongoose from 'mongoose';

import Conversation from '../../../models/conversation.js';
import Message from '../../../models/message.js';
import ErrorHandler from '../../../util/error/socket-io-error-handler.js';
import sendNotification from '../../../util/send-notification.js';
import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

// namespace: /auth
// listen event (ack): message:create
// description: Gửi tin nhắn
export const handleCreateMessage = catchAsyncErrors(
  async (io, socket, payload, callback) => {
    const { conversationId, messageContent } = payload;
    const user = socket.user;
    // check user in array participates
    const conversation = await Conversation.findById(conversationId);
    const participates = conversation.participates;
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
    const latestConversation = savedConversation.getLatestConversation(message, user);
    const [receiver] = participates.filter(
      (participate) => !participate.equals(user._id)
    );
    const response = {
      success: true,
      latestConversation,
      code: 2057,
    };
    const receiverId = receiver._id.toString();
    io.of('/auth').emit(`${receiverId}:message:read`, response);
    await sendNotification(receiverId, {
      // sound: 'default',
      title: user.fullName,
      body: message.content,
    });
  }
);
