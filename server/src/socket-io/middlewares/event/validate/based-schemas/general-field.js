import ErrorHandler from '../../../../../util/error/socket-io-error-handler.js';

// kiểm tra lĩnh vực có tồn tại có tồn tại không
export const handleValidateGeneralField = (field) => {
  if (!field) {
    throw new ErrorHandler('Lĩnh vực không tồn tại trong hệ thống', 4126);
  }
};

// kiểm tra trạng thái của lĩnh vực
export const handleCheckStatusOfGeneralField = (field) => {
  if (!field.isActive) {
    const msg = 'Lĩnh vực đang bị khóa. Không thể đặt câu hỏi';
    throw new ErrorHandler(msg, 4125);
  }
};
