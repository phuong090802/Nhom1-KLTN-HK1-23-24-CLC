import Department from '../../../../models/department.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../catch-async-errors.js';

// validate value id of department
export const handleValidateDepartmentId = (location = 'params', key = 'id') => {
  return catchAsyncErrors(async (req, res, next) => {
    const id = req[location][key];
    const department = await Department.findById(id);
    if (!department) {
      return next(new ErrorHandler(404, 'Không tìm thấy khoa', 4033));
    }
    req.foundDepartment = department;
    next();
  });
};

// kiểm tra trạng thái của khoa trước khi lấy lĩnh vực
export const handleCheckStatusOfDepartment = catchAsyncErrors(
  (req, res, next) => {
    const department = req.foundDepartment;
    if (!department.isActive) {
      return next(
        new ErrorHandler(400, 'Khoa đang bị khóa. Không lấy lĩnh vực', 4079)
      );
    }
    next();
  }
);
