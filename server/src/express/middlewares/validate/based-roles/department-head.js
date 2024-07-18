import Field from '../../../../models/field.js';
import GeneralField from '../../../../models/general-field.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../catch-async-errors.js';

// Kiểm tra trạng thái của lĩnh vực trước khi trưởng khoa cập nhật lĩnh vực (tên)
export const handleCheckStatusOfField = catchAsyncErrors((req, res, next) => {
  const field = req.foundField;
  if (!field.isActive) {
    const msg =
      'Lĩnh vực đang bị khóa. Vui lòng mở khóa trước khi thực hiện các thao tác liên quan';
    return next(new ErrorHandler(400, msg, 4078));
  }
  next();
});

// Kiểm tra xem có phải là lĩnh vực chung hay lĩnh vực thông thường
export const handleTypeOfField = (location = 'params', key = 'id') => {
  return catchAsyncErrors(async (req, res, next) => {
    const id = req[location][key];
    const field = await Field.findById(id);
    if (field) {
      req.foundField = field;
      req.isGeneralField = false;
      return next();
    }
    const generalField = await GeneralField.findById(id);
    if (generalField) {
      req.foundField = generalField;
      req.isGeneralField = true;
      return next();
    }
    return next(new ErrorHandler(404, 'Không tìm thấy lĩnh vực', 4130));
  });
};

// Kiểm tra nếu là lĩnh vực của khoa thì kiểm tra xem nó có thuộc về khoa không
export const handleCheckIsFieldBelongToDepartment = catchAsyncErrors(
  (req, res, next) => {
    const field = req.foundField;
    const isGeneralField = req.isGeneralField;
    if (isGeneralField) {
      return next();
    }
    const department = req.foundDepartment;
    if (!field.department.equals(department._id)) {
      return next(new ErrorHandler(404, 'Không tìm lĩnh vực thuộc khoa', 4131));
    }
    next();
  }
);
