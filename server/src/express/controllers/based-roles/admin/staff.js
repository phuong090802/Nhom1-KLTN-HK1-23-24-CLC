import Department from '../../../../models/department.js';
import User from '../../../../models/user.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import roles from '../../../../constants/mapper/roles.js';

// Endpoint: /api/admin/staffs
// Method: PUT
// Description: Đặt lại mật khẩu cho SUPERVISOR/DEPARTMENT_HEAD/COUNSELLOR
export const handleResetStaffPassword = catchAsyncErrors(
  async (req, res, next) => {
    const staff = req.foundUser;
    const { password } = req.body;
    const mergePassword = JSON.stringify({
      password,
      confirmPassword: password,
    });
    staff.password = mergePassword;
    await staff.save();
    res.json({
      success: true,
      message: `Đặt lại mật khẩu cho ${roles[staff.role]} thành công`,
      code: 2103,
    });
  }
);

// Endpoint: /api/admin/staffs
// Method: POST
// Description: Thêm nhân sự vào hệ thống (COUNSELLOR/SUPERVISOR)
// nếu là tự vấn viên mã khoa là tùy chọn
export const handleCreateStaff = catchAsyncErrors(async (req, res, next) => {
  const {
    fullName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    departmentId,
    role,
  } = req.body;

  // check department id
  let department;
  const mergePassword = JSON.stringify({ password, confirmPassword });
  let userData = {
    fullName,
    email,
    phoneNumber,
    password: mergePassword,
    role,
  };
  if (departmentId && role !== 'SUPERVISOR') {
    department = await Department.findById(departmentId);
    if (!department) {
      return next(new ErrorHandler(404, 'Không tìm thấy khoa', 4030));
    }
    if (!department.isActive) {
      const msg =
        'Khoa đang bị khóa. Vui lòng mở khóa trước khi thực hiện các thao tác liên quan';
      return next(new ErrorHandler(400, msg, 4073));
    }
    userData = { ...userData, 'counsellor.department': department };
  }
  // handle add User
  const user = await User.create(userData);
  let strRole = 'tư vấn viên';
  if (user.role === 'SUPERVISOR') {
    strRole = 'giám sát viên';
  }
  // res
  res.status(201).json({
    success: true,
    message: `Thêm ${strRole} thành công`,
    code: 2012,
  });
});
