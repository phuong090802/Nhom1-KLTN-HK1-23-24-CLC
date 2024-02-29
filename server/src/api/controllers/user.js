import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';

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
