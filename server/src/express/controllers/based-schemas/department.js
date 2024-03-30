import catchAsyncErrors from '../../middlewares/catch-async-errors.js';
import Department from '../../../models/department.js';
import Field from '../../../models/field.js';

// Endpoint: /api/departments/:id/fields
// Method: GET
// Description: Lấy danh sách lĩnh vực của khoa bằng id
export const handleGetFieldsOfDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;

    const fields = await Field.find({ department, isActive: true })
      .select('fieldName')
      .lean();

    res.json({
      success: true,
      fields,
      code: 2039,
    });
  }
);

// Endpoint: /api/departments
// Method: GET
// Description: Lấy danh sách khoa
export const handleGetDepartments = catchAsyncErrors(async (req, res, next) => {
  const departments = await Department.find({ isActive: true })
    .select('departmentName')
    .lean();

  res.json({
    success: true,
    departments,
    code: 2038,
  });
});
