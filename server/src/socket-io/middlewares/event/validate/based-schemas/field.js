import ErrorHandler from '../../../../../util/error/socket-io-error-handler.js';

// kiểm tra lĩnh vực có tồn tại có tồn tại không
export const handleValidateField = (department) => {
  if (!department) {
    throw new ErrorHandler('Không tìm thấy lĩnh vực', 4094);
  }
};

// kiểm tra trạng thái của lĩnh vực
export const handleCheckStatusOfField = (field) => {
  if (!field.isActive) {
    const msg = 'Lĩnh vực đang bị khóa. Không thể đặt câu hỏi';
    throw new ErrorHandler(msg, 4093);
  }
};
