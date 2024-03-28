import Department from '../../../models/department.js';
import Field from '../../../models/field.js';
import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

// endpoint: /api/departments/:id/fields
// method: GET
// description: Lấy danh sách lĩnh vực của khoa bằng id
export const fieldsHandler = catchAsyncErrors(async (req, res, next) => {
  const department = req.foundDepartment;
  const fields = await Field.find({ department, isActive: true })
    .select('fieldName')
    .lean();

  res.json({
    success: true,
    fields,
    code: 2039,
  });
});

// endpoint: /api/departments
// method: GET
// description: Lấy danh sách khoa
export const departmentsHandler = catchAsyncErrors(async (req, res, next) => {
  const departments = await Department.find({ isActive: true })
    .select('departmentName')
    .lean();

  res.json({
    success: true,
    departments,
    code: 2038,
  });
});
