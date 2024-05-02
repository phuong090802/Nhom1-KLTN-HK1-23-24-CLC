import Field from '../../../../models/field.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../catch-async-errors.js';

// trưởng khoa kiểm tra lĩnh vực tồn tại
export const handleValidateFieldIdInParams = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const field = await Field.findById(id);
    if (!field) {
      return next(new ErrorHandler(404, 'Không tìm lĩnh vực', 4047));
    }
    req.foundField = field;
    next();
  }
);

export const handleValidateFieldIdInBody = catchAsyncErrors(
  async (req, res, next) => {
    const { fieldId } = req.body;
    const field = await Field.findById(fieldId);
    if (!field) {
      return next(new ErrorHandler(404, 'Không tìm lĩnh vực', 4108));
    }
    req.foundField = field;
    next();
  }
);

// Kiểm tra lĩnh vực có trong DB không (tìm bằng id và khoa)
export const handleCheckFieldBelongToDepartment = catchAsyncErrors(
  (req, res, next) => {
    const field = req.foundField;
    const department = req.foundDepartment;
    if (!field.department.equals(department._id)) {
      return next(new ErrorHandler(404, 'Không tìm lĩnh vực thuộc khoa', 4049));
    }
    next();
  }
);
