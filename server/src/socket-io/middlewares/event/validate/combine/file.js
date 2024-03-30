import * as validateFile from '../file.js';

// Kiểm tra phần mở rộng file và kích thước file
export const handleValidateMimetypeAndFileSize = (file, maxSize) => {
  validateFile.handleValidateMimetype(file);
  validateFile.handleValidateFileSize(file, maxSize);
};
