import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

import Feedback from '../../../models/feedback.js';
import Question from '../../../models/question.js';

import QueryAPI from '../../../util/db/query-api.js';
import { deleteFile } from '../../../util/upload-file.js';
import ErrorHandler from '../../../util/error/http-error-handler.js';
import ForwardedQuestion from '../../../models/forwarded-question.js';

// endpoint: /api/counsellor/questions/:id
// method: PUT
// description: Trưởng khoa/tư vấn viên chuyển tiếp câu hỏi
export const forwardQuestionHandler = catchAsyncErrors(
  async (req, res, next) => {
    const question = req.foundQuestion;

    const newDepartment = req.foundDepartment;

    const newField = req.foundField;

    const fromDepartment = question.department;

    const forwardedQuestion = await ForwardedQuestion.findOne({ question });

    if (forwardedQuestion) {
      forwardedQuestion.fromDepartment = fromDepartment;
      forwardedQuestion.toDepartment = newDepartment;
      forwardedQuestion.field = newField;
      forwardedQuestion.forwardedAt = Date.now();
      await forwardedQuestion.save();
    } else {
      await ForwardedQuestion.create({
        question,
        fromDepartment,
        toDepartment: newDepartment,
        field: newField,
      });
      question.isForwarded = true;
    }

    question.department = newDepartment;
    await question.save();

    res.status(201).json({
      success: true,
      message: 'Chuyển tiếp câu hỏi thành công',
      code: 2069,
    });
  }
);

// endpoint: /api/counsellor/questions
// method: GET
// description: Tư vấn viên kiểm tra có câu hỏi cần trả lời hay không
export const hasNewQuestionsHandler = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;
    const { department, fields } = user.counsellor;

    // console.log(department);
    // console.log(fields);

    const numberOfQuestions = await Question.countDocuments({
      department,
      status: 'unanswered',
      field: { $in: fields },
    });

    res.json({
      success: true,
      hasNewQuestions: numberOfQuestions > 0,
      code: 2071,
    });
  }
);

// endpoint: /api/counsellor/feedbacks
// method: GET
// description: Tư vấn viên load danh sách feedback của họ (không phân trang)
export const feedbacksHandler = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  const query = Feedback.find({ 'answer.user': user })
    .sort({ createdAt: -1 })
    .lean()
    .populate({
      path: 'question',
      select: '-_id title content',
    })
    .select('_id content createdAt answer.content answer.answeredAt question');
  const queryAPI = new QueryAPI(query, req.query).search().filter().sort();
  let feedbacks = await queryAPI.query;

  res.json({
    success: true,
    feedbacks,
    code: 2045,
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
