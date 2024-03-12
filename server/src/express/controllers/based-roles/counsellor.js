import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

import Feedback from '../../../models/feedback.js';
import { deleteFile } from '../../../utils/upload-file.js';
import ErrorHandler from '../../../utils/error-handler.js';

// endpoint: /api/counsellor/answers
// method: POST
// description: Tư vấn viên, trưởng khoa trả lời câu hỏi
export const createAnswerHandler = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  const question = req.foundQuestion;

  const { content } = req.body;
  const file = req.uploadedFile;

  const answer = { content, file, user };

  let status = 'publicly-answered-pending-approval';

  if (user.role === 'DEPARTMENT_HEAD') {
    status = 'publicly-answered-and-approved';
  }

  question.answer = answer;
  question.status = status;

  await question.save();

  res.json({
    success: true,
    message: 'Trả lời câu hỏi thành công',
    code: 2031,
  });
});

// endpoint: /api/counsellor/feedbacks
// method: DELETE
// description: Xóa tất cả feedbacks của họ
export const deleteFeedbacksHandler = catchAsyncErrors(
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
            return next(
              new ErrorHandler(
                500,
                'Lỗi khi xóa tất cả phản hồi. Vui lòng thử lại',
                4072
              )
            );
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

// endpoint: /api/counsellor/feedbacks
// method: DELETE
// description: Xóa feedback bằng id
export const deleteFeedbackHandler = catchAsyncErrors(
  async (req, res, next) => {
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
  }
);
