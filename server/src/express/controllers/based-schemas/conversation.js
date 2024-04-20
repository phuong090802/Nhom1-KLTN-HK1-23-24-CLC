import catchAsyncErrors from '../../middlewares/catch-async-errors.js';
import QueryAPI from '../../../util/db/query-api.js';
import paginate from '../../../util/db/paginate.js';
import queryFiltersLimit from '../../../util/db/query-filters-limit.js';
import defaultSortNewest from '../../../util/db/default-sort.js';
import Conversation from '../../../models/conversation.js';
import Message from '../../../models/message.js';

// Endpoint: /api/conversations/:id
// Method: GET
// Description: Lấy danh sách tin nhắn trong cuộc trò chuyện bằng Id
export const handleGetMessagesInConversation = catchAsyncErrors(
  async (req, res, next) => {
    const conversation = req.foundConversation;

    const query = Message.find()
      .select('content sender viewed createdAt')
      .lean();

    const filterConversation = {
      conversation: conversation._id,
    };

    const requestQueryTransform = queryFiltersLimit(
      req.query,
      filterConversation
    );

    const reqSort = req.query.sort?.createdAt;

    const requestQuery = defaultSortNewest(
      requestQueryTransform,
      !reqSort && { createdAt: -1 }
    );

    const queryAPI = new QueryAPI(query, requestQuery).search().filter().sort();

    let messageRecords = await queryAPI.query;

    const totalMessages = messageRecords.length;

    const foundMessages = await queryAPI.skipAndLimit().query.clone();

    const messages = foundMessages.reverse();

    res.json({
      success: true,
      messages,
      totalMessages,
      code: 2054,
    });
  }
);

// Endpoint: /api/conversations
// Method: GET
// Description: Lấy danh sách cuộc trò chuyện
export const handleGetConversations = catchAsyncErrors(
  async (req, res, next) => {
    const userId = req.user._id;

    const query = Conversation.find()
      .populate({
        path: 'lastMessage',
        select: 'content sender viewed createdAt',
      })
      .populate({
        path: 'participates',
        select: '_id fullName avatar.url',
        match: { _id: { $ne: userId } },
      })
      .select('_id lastMessage createdAt');
    // .lean();

    const filterParticipates = {
      participates: userId,
    };

    const filterDeletedBy = { deletedBy: { $ne: userId } };

    const requestQuery = queryFiltersLimit(
      req.query,
      filterParticipates,
      filterDeletedBy
    );

    const queryAPI = new QueryAPI(query, requestQuery).search().filter().sort();
    let conversationRecords = await queryAPI.query;
    const numberOfConversations = conversationRecords.length;
    conversationRecords = await queryAPI.pagination().query.clone();
    const {
      data: retConversations,
      page,
      pages,
    } = paginate(
      numberOfConversations,
      req.query.page,
      req.query.size,
      conversationRecords
    );

    const conversations = await Promise.all(
      retConversations.map((conversation) =>
        conversation.getConversationInformation()
      )
    );

    res.json({
      success: true,
      conversations,
      page,
      pages,
      code: 2053,
    });
  }
);
