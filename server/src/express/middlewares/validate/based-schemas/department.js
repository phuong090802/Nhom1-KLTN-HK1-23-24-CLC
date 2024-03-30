import catchAsyncErrors from '../../catch-async-errors.js';
import Department from '../../../../models/department.js';
import ErrorHandler from '../../../../utils/error/http-error-handler.js';

// validate value id of department in body
export const handleValidateDepartmentIdInBody = catchAsyncErrors(
  async (req, res, next) => {
    const { departmentId } = req.body;
    const department = await Department.findById(departmentId);

    if (!department) {
      return next(new ErrorHandler(404, 'Không tìm thấy khoa', 4033));
    }

    req.foundDepartment = department;
    next();
  }
);

// validate value id of department in path params
export const handleValidateDepartmentIdInParams = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const department = await Department.findById(id);

    if (!department) {
      return next(new ErrorHandler(404, 'Không tìm thấy khoa', 4034));
    }

    req.foundDepartment = department;
    next();
  }
);

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
