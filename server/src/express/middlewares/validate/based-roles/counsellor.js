import Department from '../../../../models/department.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../catch-async-errors.js';

// Kiểm tra mã khoa của tư vấn viên, trưởng khoa trước khi truy cập vào các route
export const handleCheckDepartmentOfCounsellor = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;
    const department = await Department.findById(user.counsellor.department);
    if (!department) {
      return next(new ErrorHandler(404, 'Không tìm thấy khoa', 4038));
    }
    req.foundDepartment = department;
    next();
  }
);

// Kiểm tra trạng thái khoa của tư vấn viên, trưởng khoa trước khi truy cập vào các route
export const handleCheckStatusDepartmentOfCounsellor = catchAsyncErrors(
  (req, res, next) => {
    const department = req.foundDepartment;
    if (!department.isActive) {
      return next(
        new ErrorHandler(400, 'Không thể truy cập. Khoa đang bị khóa', 4075)
      );
    }
    next();
  }
);

// Kiểm tra mã khoa của tư vấn viên, trưởng khoa trước khi truy cập vào các route
export const handleCheckCounsellorBelongDepartment = catchAsyncErrors(
  (req, res, next) => {
    const { department: departmentOfDepartmentHead } = req.user.counsellor;
    const { department: departmentOfCounsellor } = req.foundUser.counsellor;
    if (!departmentOfDepartmentHead._id.equals(departmentOfCounsellor)) {
      return next(new ErrorHandler(404, 'Tư vấn viên không thuộc khoa', 4109));
    }
    next();
  }
);
