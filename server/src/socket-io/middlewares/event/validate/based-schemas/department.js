import ErrorHandler from '../../../../../utils/error/socket-io-error-handler.js';

// kiểm tra Id của khoa có tồn tại có tồn tại trong DB không
export const validateDepartment = (department) => {
  if (!department) {
    throw new ErrorHandler('Không tìm thấy khoa', 4058);
  }
};

// kiểm tra trạng thái của khoa
export const validateStatusOfDepartment = (department) => {
  if (!department.isActive) {
    throw new ErrorHandler('Khoa đang bị khóa. Không thể đặt câu hỏi', 4092);
  }
};
