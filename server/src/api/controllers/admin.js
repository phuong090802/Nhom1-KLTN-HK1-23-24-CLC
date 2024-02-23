import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import Department from '../../models/department.js';
import ErrorHandler from '../../utils/ErrorHandler.js';
import Counsellor from '../../models/counsellor.js';
import User from '../../models/user.js';

export const addDepartmentHandler = catchAsyncErrors(async (req, res, next) => {
  const { departmentName } = req.body;
  await Department.create({ departmentName });

  res.status(201).json({
    success: true,
    message: 'Thêm khoa thành công',
    code: 2001,
  });
});

export const updateDepartmentHandler = catchAsyncErrors(
  async (req, res, next) => {
    const department = await Department.findById(req.params.id);
    department.departmentName = req.body.departmentName;
    await department.save();

    res.json({
      success: true,
      message: 'Cập nhật khoa thành công',
      code: 2011,
    });
  }
);

export const updateStatusDepartmentHandler = catchAsyncErrors(
  async (req, res, next) => {
    const department = await Department.findById(req.params.id);
    department.isActive = req.body.isActive;
    const savedDepartment = await department.save();

    const newStrStatus = savedDepartment.isActive ? 'Mở khóa' : 'Khóa';

    res.json({
      success: true,
      message: newStrStatus + ' thành công',
      code: 2011,
    });
  }
);

// create new staff

export const addStaffHandler = catchAsyncErrors(async (req, res, next) => {
  const {
    fullName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    departmentId,
    role,
  } = req.body;

  //  in alowListRoles
  const allowRoles = ['COUNSELLOR', 'SUPERVISOR'];

  if (!allowRoles.includes(role)) {
    return next(new ErrorHandler(400, `${role} không được hổ trợ`, 4029));
  }
  // check department Id
  const department = await Department.findById(departmentId);
  if (!department) {
    return next(new ErrorHandler(404, `Không tìm thấy khoa`, 4030));
  }

  const mergePassword = JSON.stringify({ password, confirmPassword });

  // handle add User
  const user = await User.create({
    fullName,
    email,
    phoneNumber,
    password: mergePassword,
    role,
  });

  if (user.role === 'COUNSELLOR') {
    await Counsellor.create({ user, department });
  }

  // res
  res.status(201).json({
    success: true,
    message: 'Thêm nhân sự thành công',
    code: 2012,
  });
});

// endpoint (POST): /counsellor not in any department
// add counsellor (COUNSELLOR) to department

// export const addCounsellorToDepartmentHandler = catchAsyncErrors(async (req, res, next) => {

// })
