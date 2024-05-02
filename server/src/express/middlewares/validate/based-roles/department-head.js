import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../catch-async-errors.js';

// Kiểm tra trạng thái của lĩnh vực trước khi trưởng khoa cập nhật lĩnh vực (tên)
export const handleCheckStatusOfField = catchAsyncErrors((req, res, next) => {
  const field = req.foundField;
  if (!field.isActive) {
    const msg =
      'Lĩnh vực đang bị khóa. Vui lòng mở khóa trước khi thực hiện các thao tác liên quan';
    return next(new ErrorHandler(400, msg, 4078));
  }
  next();
});
