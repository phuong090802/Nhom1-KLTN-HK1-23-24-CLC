import { questionStatus } from '../../../constants/mapper.js';
import ErrorHandler from '../../../util/error/socket-io-error-handler.js';
import {
  isSupportFileSize,
  isSupportedMimetype,
} from '../../../util/validation.js';
import { mimetype } from '../../../constants/file.js';

// kiểm tra Id câu hỏi có tồn tại có tồn tại trong DB không
export const validateQuestion = (question) => {
  if (!question) {
    throw new ErrorHandler('Quyền truy cập không hợp lệ', 4052);
  }
};

// kiểm tra trạng thái của câu hỏi
export const validateStatusOfQuestion = (question, status) => {
  if (question.status !== status) {
    throw new ErrorHandler(
      `Không tìm thấy câu hỏi ở trạng thái: '${questionStatus[status]}'`,
      4086
    );
  }
};

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

// kiểm tra lĩnh vực có tồn tại có tồn tại không
export const validateField = (department) => {
  if (!department) {
    throw new ErrorHandler('Không tìm thấy lĩnh vực', 4094);
  }
};

// kiểm tra trạng thái của lĩnh vực
export const validateStatusOfField = (field) => {
  if (!field.isActive) {
    throw new ErrorHandler(
      'Lĩnh vực đang bị khóa. Không thể đặt câu hỏi',
      4093
    );
  }
};

// Kiểm tra định dạng file
export const validateMimetype = (file) => {
  const isSupport = isSupportedMimetype(
    [...mimetype.image, ...mimetype.document],
    file.mimetype
  );

  if (!isSupport) {
    throw new ErrorHandler('Định dạng file không được hỗ trợ', 4095);
  }
};

// Kiểm tra kích thước của file
export const validateFileSize = (file, maxSize) => {
  const isSupport = isSupportFileSize(maxSize * 1024 * 1024, file);
  if (!isSupport) {
    throw new ErrorHandler(`Chỉ hổ trợ file tối đa ${maxSize} MB`, 4096);
  }
};

// Kiểm tra lĩnh vực của tư vấn viên có hỗ trợ câu hỏi không
export const validateFieldOfCounsellor = (fieldOfQuestion, counsellor) => {
  if (!counsellor.counsellor.fields.includes(fieldOfQuestion)) {
    throw new ErrorHandler('Bạn không hỗ trợ lĩnh vực này', 4097);
  }
};
