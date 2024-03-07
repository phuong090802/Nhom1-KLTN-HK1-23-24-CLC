import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

// endpoint: /api/users
// method: PUT
// description: Người dùng cập nhật fullName, occupation (tất cả các role trong hệ thống)
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
