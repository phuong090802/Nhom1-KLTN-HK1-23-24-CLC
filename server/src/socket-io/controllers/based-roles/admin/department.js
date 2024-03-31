import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import ErrorHandler from '../../../../utils/error/socket-io-error-handler.js';
import Department from '../../../../models/department.js';

// namespace: /admin
// listen event (ack): department:validate-department-name:create
// description: Kiểm tra tên khoa trước khi tạo khoa mới
export const handleValidateDepartmentNameForCreate = catchAsyncErrors(
  async (socket, payload, callback) => {
    const { departmentName } = payload;
    
    const department = await Department.findOne({
      departmentName: { $regex: new RegExp(departmentName, 'i') },
    });

    if (department) {
      throw new ErrorHandler('Tên khoa đã được sử dụng', 4044);
    }

    callback({
      success: true,
      message: 'Tên khoa khả dụng',
      code: 2025,
    });
  }
);

// namespace: /admin
// listen event (ack): department:validate-department-name:update
// description: Kiểm tra tên khoa trước khi cập nhật tên khoa
export const handleValidateDepartmentNameForUpdate = catchAsyncErrors(
  async (socket, payload, callback) => {
    const { departmentId, departmentName } = payload;

    const department = await Department.findOne({
      _id: { $ne: departmentId },
      departmentName: { $regex: new RegExp(departmentName, 'i') },
    });

    if (department) {
      throw new ErrorHandler('Tên khoa đã được sử dụng', 4045);
    }

    callback({
      success: true,
      message: 'Tên khoa khả dụng',
      code: 2026,
    });
  }
);