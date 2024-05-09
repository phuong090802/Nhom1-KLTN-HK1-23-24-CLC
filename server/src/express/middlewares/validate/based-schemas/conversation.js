import Conversation from '../../../../models/conversation.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../catch-async-errors.js';

// validate value id of conversation
export const handleValidateConversationId = (
  location = 'params',
  key = 'id'
) => {
  return catchAsyncErrors(async (req, res, next) => {
    const id = req[location][key];
    const conversation = await Conversation.findById(id);
    if (!conversation) {
      return next(new ErrorHandler(404, 'Không tìm cuộc đối thoại', 4051));
    }
    req.foundConversation = conversation;
    next();
  });
};

// validate user is not in participates
export const handleCheckUserIsInParticipatesConversation = catchAsyncErrors(
  (req, res, next) => {
    const conversation = req.foundConversation;
    const user = req.user;
    const participates = conversation.participates;
    if (!participates.includes(user._id)) {
      throw new ErrorHandler('Không tìm thấy cuộc trò chuyện', 4054);
    }
    next();
  }
);

// validate user is not in deletedBy
export const handleCheckUserIsNotInDeletedByConversation = catchAsyncErrors(
  (req, res, next) => {
    const conversation = req.foundConversation;
    const user = req.user;
    const deletedBy = conversation.deletedBy;
    if (deletedBy.includes(user._id)) {
      throw new ErrorHandler('Không tìm thấy cuộc trò chuyện', 4055);
    }
    next();
  }
);
