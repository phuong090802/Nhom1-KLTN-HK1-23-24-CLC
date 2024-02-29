import catchAsyncErrors from './catchAsyncErrors.js';
import Department from '../../models/department.js';

export const validateDepartmentIdInBody = catchAsyncErrors(
  async (req, res, next) => {
    const { departmentId } = req.body;
    const department = await Department.findById(departmentId);
    if (!department) {
      return next(new ErrorHandler(404, 'Không tìm thấy khoa', 4034));
    }
  }
);
