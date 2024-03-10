import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

import ErrorHandler from '../../../utils/error-handler.js';
import { deleteFile } from '../../../utils/upload-file.js';

// endpoint: /api/users
// method: PATCH
// description: Người dùng cập nhật ảnh đại diện (tất cả các role trong hệ thống)
export const updateAvatar = catchAsyncErrors(async (req, res, next) => {
  console.log('req.uploadedFile', req.uploadedFile);
  const avatar = req.uploadedFile;
  const user = req.user;
  const oldStrRef = user.avatar.ref;

  if (oldStrRef) {
    try {
      // remove old avatar
      await deleteFile(oldStrRef);
    } catch (error) {
      // remove new image if error
      await deleteFile(avatar.ref);
      return next(
        new ErrorHandler(
          500,
          'Lỗi cập nhật ảnh đại diện. Vui lòng thử lại',
          4036
        )
      );
    }
  }

  user.avatar = avatar;
  await user.save();

  res.json({
    success: true,
    message: 'Cập nhật ảnh đại diện thành công',
    avatar: avatar.url,
    code: 2010,
  });
});

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
