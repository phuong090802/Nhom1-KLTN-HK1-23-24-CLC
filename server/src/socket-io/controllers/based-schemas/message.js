import mongoose from 'mongoose';

import catchAsyncErrors from '../../middlewares/catch-async-errors.js';
import Conversation from '../../../models/conversation.js';
import Message from '../../../models/message.js';
import ErrorHandler from '../../../utils/error/socket-io-error-handler.js';
import sendNotification from '../../../utils/send-notification.js';

// namespace: /auth
// listen event (ack): message:create
// description: Gửi tin nhắn
export const handleCreateMessage = catchAsyncErrors(
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

    const latestConversation = savedConversation.getLatestConversation(message);

    // console.log(latestConversation);

    // console.log(participates);

    const [receiver] = participates.filter(
      (participate) => !participate.equals(user._id)
    );

    // console.log(receiver);

    const response = {
      success: true,
      latestConversation,
      code: 2057,
    };

    const receiverId = receiver._id.toString();

    socket.emit(`${receiverId}:notification:read`, response);

    await sendNotification(receiverId, {
      // sound: 'default',
      title: user.fullName,
      body: message.content,
    });
  }
);
