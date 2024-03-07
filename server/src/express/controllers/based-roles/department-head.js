import catchAsyncErrors from '../../middlewares/catch-async-errors.js';
import Field from '../../../models/field.js';

// endpoint: /api/department-head/fields/:id/status
// method: PUT
// description: Cập nhật trạng lĩnh vực của khoa
export const updateStatusFieldHandler = catchAsyncErrors(
  async (req, res, next) => {
    const field = req.foundField;
    const { isActive } = req.body;
    field.isActive = isActive;

    const savedField = await field.save();

    const newStrStatus = savedField.isActive ? 'Mở khóa' : 'Khóa';

    res.json({
      success: true,
      message: `${newStrStatus} lĩnh vực thành công`,
      code: 2073,
    });
  }
);

// endpoint: /api/department-head/fields
// method: POST
// description: Cập nhật lĩnh vực của khoa
export const updateFieldHandler = catchAsyncErrors(async (req, res, next) => {
  const field = req.foundField;
  const { fieldName } = req.body;
  field.fieldName = fieldName;
  // save
  await field.save();
  // res
  res.json({
    success: true,
    message: 'Cập nhật tên lĩnh vực thành công',
    code: 2028,
  });
});

// endpoint: /api/department-head/fields
// method: POST
// description: Thêm lĩnh vực vào khoa
export const addFieldHandler = catchAsyncErrors(async (req, res, next) => {
  const { fieldName } = req.body;
  const department = req.foundDepartment;
  await Field.create({ fieldName, department });

  res.status(201).json({
    success: true,
    message: 'Thêm lĩnh vực thành công',
    code: 2018,
  });
});
