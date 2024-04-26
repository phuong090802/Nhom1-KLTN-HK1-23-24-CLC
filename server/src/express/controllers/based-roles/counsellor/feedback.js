import Feedback from '../../../../models/feedback.js';
import QueryAPI from '../../../../util/db/query-api.js';
import queryFiltersLimit from '../../../../util/db/query-filters-limit.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';
import { deleteFile } from '../../../../util/upload-file.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/counsellor/feedbacks
// Method: GET
// Description: Tư vấn viên load danh sách feedback của họ (không phân trang)
export const handleGetFeedbacks = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  const query = Feedback.find()
    .sort({ createdAt: -1 })
    .lean()
    .populate({
      path: 'question',
      select: '-_id title content',
    })
    .select('content createdAt answer.content answer.answeredAt question');

  const filterUser = { 'answer.user': user._id };

  const requestQuery = queryFiltersLimit(req.query, filterUser);

  const queryAPI = new QueryAPI(query, requestQuery).search().filter().sort();
  let feedbacks = await queryAPI.query;

  res.json({
    success: true,
    feedbacks,
    code: 2045,
  });
});

// Endpoint: /api/counsellor/feedbacks
// Method: DELETE
// Description: Xóa tất cả feedbacks của họ
export const handleDeleteFeedbacks = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;
    const feedbacks = await Feedback.find({ 'answer.user': user });

    // xóa file ở firebase
    await Promise.all(
      feedbacks.map(async (feedback) => {
        if (feedback.answer.file.ref) {
          try {
            // remove file
            await deleteFile(feedback.answer.file.ref);
            // remove feedback in DB
          } catch (error) {
            const msg = 'Lỗi khi xóa tất cả phản hồi. Vui lòng thử lại';
            return next(new ErrorHandler(500, msg, 4072));
          }
        }
        await feedback.deleteOne();
      })
    );

    res.json({
      success: true,
      message: 'Xóa danh sách phản hồi thành công',
      code: 2047,
    });
  }
);

// Endpoint: /api/counsellor/feedbacks
// Method: DELETE
// Description: Xóa feedback bằng id
export const handleDeleteFeedback = catchAsyncErrors(async (req, res, next) => {
  const feedback = req.foundFeedback;
  // xóa file ở firebase

  const fileRef = feedback.answer.file.ref;

  if (fileRef) {
    try {
      // remove file
      await deleteFile(fileRef);
    } catch (error) {
      return next(
        new ErrorHandler(500, 'Lỗi khi xóa phản hồi. Vui lòng thử lại', 4071)
      );
    }
  }

  await feedback.deleteOne();

  res.json({
    success: true,
    message: 'Xóa phản hồi thành công',
    code: 2046,
  });
});
