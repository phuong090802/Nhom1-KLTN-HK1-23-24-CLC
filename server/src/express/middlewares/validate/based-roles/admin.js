import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../catch-async-errors.js';

// admin kiểm tra trạng thái của khoa trước khi cập nhật (tên, thêm tư vấn viên vào khoa)
export const handleCheckStatusOfDepartment = catchAsyncErrors(
  (req, res, next) => {
    const department = req.foundDepartment;
    if (!department.isActive) {
      const msg =
        'Khoa đang bị khóa. Vui lòng mở khóa trước khi thực hiện các thao tác liên quan';
      return next(new ErrorHandler(400, msg, 4073));
    }
    next();
  }
);
