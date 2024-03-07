import Question from '../../../models/question.js';
import catchAsyncErrors from '../../middlewares/catch-async-errors.js';


// endpoint: /api/user/questions
// method: POST
// description: Đặt câu hỏi
export const makeQuestionHandler = catchAsyncErrors(async (req, res, next) => {
  const department = req.foundDepartment;
  const field = req.foundField;
  const user = req.user;
  const { title, content } = req.body;
  const file = req.uploadedFile;

  await Question.create({ title, content, department, field, user, file });

  res.status(201).json({
    success: true,
    message: 'Đặt câu hỏi thành công',
    code: 2030,
  });
});
