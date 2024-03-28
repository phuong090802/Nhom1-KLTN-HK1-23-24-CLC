import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

import QueryAPI from '../../../util/db/query-api.js';
import paginateResults from '../../../util/db/pagination.js';

import Conversation from '../../../models/conversation.js';
import Message from '../../../models/message.js';

// endpoint: /api/conversations/:id
// method: GET
// description: Lấy danh sách tin nhắn trong cuộc trò chuyện bằng Id
export const messagesInConversationHandler = catchAsyncErrors(
  async (req, res, next) => {
    const conversation = req.foundConversation;

    const query = Message.find({
      conversation,
    }).select('content sender viewed createdAt');

    const queryAPI = new QueryAPI(query, req.query).search().filter().sort();
    let messageRecords = await queryAPI.query;
    const numberOfMessages = messageRecords.length;
    messageRecords = await queryAPI.pagination().query.clone();
    const {
      data: messages,
      page,
      pages,
    } = paginateResults(
      numberOfMessages,
      req.query.page,
      req.query.size,
      messageRecords
    );

    res.json({
      success: true,
      messages,
      page,
      pages,
      code: 2054,
    });
  }
);

// endpoint: /api/conversations
// method: GET
// description: Lấy danh sách cuộc trò chuyện
export const conversationsHandler = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  const query = Conversation.find({
    participates: userId,
    deletedBy: { $ne: userId },
  })
    .populate({
      path: 'lastMessage',
      select: 'content sender viewed createdAt',
    })
    // .lean()
    .select('lastMessage createdAt');

  const queryAPI = new QueryAPI(query, req.query).search().filter().sort();
  let conversationRecords = await queryAPI.query;
  const numberOfConversations = conversationRecords.length;
  conversationRecords = await queryAPI.pagination().query.clone();
  const {
    data: conversations,
    page,
    pages,
  } = paginateResults(
    numberOfConversations,
    req.query.page,
    req.query.size,
    conversationRecords
  );

  res.json({
    success: true,
    conversations,
    page,
    pages,
    code: 2053,
  });
});
