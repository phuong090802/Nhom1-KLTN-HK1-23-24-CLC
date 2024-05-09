import { Expo } from 'expo-server-sdk';

import User from '../../../models/user.js';
import ErrorHandler from '../../../util/error/http-error-handler.js';
import { deleteFile } from '../../../util/upload-file.js';
import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

// Endpoint: /api/users/push-token
// Method: POST
// Description: Thêm token mới của thiết bị bị động
export const handleAddPushToken = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  const { pushToken } = req.body;
  if (!Expo.isExpoPushToken(pushToken)) {
    const msg = 'Push push notification token không hợp lệ';
    return next(new ErrorHandler(400, msg, 4113));
  }
  await User.updateMany(
    { pushTokens: { $in: [pushToken] } },
    { $pull: { pushTokens: pushToken } }
  );
  user.pushTokens.push(pushToken);
  await user.save();
  res.status(201).json({
    success: true,
    message: 'Thêm push token thành công',
    code: 2079,
  });
});

// Endpoint: /api/users
// Method: PATCH
// Description: Người dùng cập nhật ảnh đại diện (tất cả các role trong hệ thống)
export const handleUpdateAvatar = catchAsyncErrors(async (req, res, next) => {
  const avatar = req.uploadedFile;
  const user = req.user;
  const { ref, url } = user.avatar;
  if (ref && url) {
    try {
      // remove old avatar
      await deleteFile(ref);
      user.avatar = avatar;
      await user.save();
    } catch (error) {
      // remove new image if error
      await deleteFile(avatar.ref);
      const msg = 'Lỗi cập nhật ảnh đại diện. Vui lòng thử lại';
      return next(new ErrorHandler(500, msg, 4036));
    }
  }
  res.json({
    success: true,
    message: 'Cập nhật ảnh đại diện thành công',
    avatar: avatar.url,
    code: 2010,
  });
});

// Endpoint: /api/users
// Method: PUT
// Description: Người dùng cập nhật fullName, occupation (tất cả các role trong hệ thống)
export const handleUpdateProfile = catchAsyncErrors(async (req, res, next) => {
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
