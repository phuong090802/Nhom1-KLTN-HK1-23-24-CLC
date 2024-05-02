import mimetype from '../../../../constants/file/mimetype.js';
import ErrorHandler from '../../../../util/error/socket-io-error-handler.js';
import {
  isSupportFileSize,
  isSupportedMimetype,
} from '../../../../util/validation.js';

// Kiểm tra định dạng file
export const handleValidateMimetype = (file) => {
  const isSupport = isSupportedMimetype(
    [...mimetype.image, ...mimetype.document],
    file.mimetype
  );
  if (!isSupport) {
    throw new ErrorHandler('Định dạng file không được hỗ trợ', 4095);
  }
};

// Kiểm tra kích thước của file
export const handleValidateFileSize = (file, maxSize) => {
  const isSupport = isSupportFileSize(maxSize * 1024 * 1024, file);
  if (!isSupport) {
    throw new ErrorHandler(`Chỉ hổ trợ file tối đa ${maxSize} MB`, 4096);
  }
};
