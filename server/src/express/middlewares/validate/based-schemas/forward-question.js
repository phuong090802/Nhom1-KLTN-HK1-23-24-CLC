import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../catch-async-errors.js';

// Kiểm tra khoa có khác nhau trước khia chuyển tiếp
export const handleValidateDepartmentIdBeforeForwarding = catchAsyncErrors(
  (req, res, next) => {
    const newDepartment = req.foundDepartment;
    const { department } = req.foundQuestion;
    if (department.equals(newDepartment._id)) {
      const msg = 'Không thể chuyển tiếp câu hỏi cùng khoa';
      return next(new ErrorHandler(400, msg, 4099));
    }
    next();
  }
);

// Kiểm tra counsellor có sở hữu lĩnh vực của question trước khi chuyển tiếp không
// Nếu có có thể chuyến tiếp, ngược lại không
// Nếu là department head thì chuyển được tất cả 
export const handleCheckCounsellorIncludesFieldOfQuestion = catchAsyncErrors(
  (req, res, next) => {
    const user = req.user;
    if (user.role === 'DEPARTMENT_HEAD') {
      return next();
    }
    const { fields } = user.counsellor;
    const question = req.foundQuestion;
    if (!fields.includes(question.field)) {
      const msg =
        'Không thể chuyển tiếp. Câu hỏi không thuộc lĩnh vực được hỗ trợ';
      return next(new ErrorHandler(400, msg, 4100));
    }
    next();
  }
);
