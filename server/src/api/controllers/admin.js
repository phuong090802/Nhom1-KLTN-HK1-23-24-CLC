import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import Department from '../../models/department.js';

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
