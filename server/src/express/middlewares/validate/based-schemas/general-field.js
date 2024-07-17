import GeneralField from '../../../../models/general-field.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../catch-async-errors.js';

// Quản trị viên kiểm tra lĩnh vực chung có tồn tại
export const handleValidateGeneralFieldId = (
  location = 'params',
  key = 'id'
) => {
  return catchAsyncErrors(async (req, res, next) => {
    const id = req[location][key];
    const generalField = await GeneralField.findById(id);
    if (!generalField) {
      return next(new ErrorHandler(404, 'Không tìm thấy lĩnh vực chung', 4124));
    }
    req.foundGeneralField = generalField;
    next();
  });
};
