import Question from '../../models/question.js';
import catchAsyncErrors from '../middlewares/catch-async-errors.js';

export const makeQuestionHandler = catchAsyncErrors(async (req, res, next) => {
  const department = req.departmentInBody;
  const field = req.fieldInBody;
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

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { fullName, occupation } = req.body;
  const user = req.user;
  user.fullName = fullName;
  user.occupation = occupation;
  await user.save();
  res.json({
    success: true,
    message: 'Cập nhật thông tin thành công',
    code: 2017,
  });
});
