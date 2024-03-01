import catchAsyncErrors from '../middlewares/catch-async-errors.js';
import Field from '../../models/field.js';

export const updateStatusFieldHandler = catchAsyncErrors(
  async (req, res, next) => {
    const field = req.fieldInParams;
    const { isActive } = req.body;
    field.isActive = isActive;

    const savedField = await field.save();

    const newStrStatus = savedField.isActive ? 'Mở khóa' : 'Khóa';

    res.json({
      success: true,
      message: `${newStrStatus} lĩnh vực thành công`,
      code: 2028,
    });
  }
);

export const updateFieldHandler = catchAsyncErrors(async (req, res, next) => {
  const field = req.fieldInParams;
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
