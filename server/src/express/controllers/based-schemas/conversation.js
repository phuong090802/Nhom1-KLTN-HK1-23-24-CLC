import catchAsyncErrors from '../../middlewares/catch-async-errors.js';
import QueryAPI from '../../../utils/db/query-api.js';
import paginate from '../../../utils/db/paginate.js';
import queryFiltersLimit from '../../../utils/db/query-filters-limit.js';
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

    const requestQuery = queryFiltersLimit(req.query, filterConversation);

    const queryAPI = new QueryAPI(query, requestQuery).search().filter().sort();
    let messageRecords = await queryAPI.query;
    const numberOfMessages = messageRecords.length;
    messageRecords = await queryAPI.pagination().query.clone();
    const {
      data: messages,
      page,
      pages,
    } = paginate(
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
      .select('lastMessage createdAt')
      .lean();

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
      data: conversations,
      page,
      pages,
    } = paginate(
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
  }
);
