import {
  validateQuestion,
  validateStatusOfQuestion,
} from './validate-event.js';

// kiểm tra id câu hỏi và trạng thái câu hỏi
export const validateQuestionAndStatus = (question, status) => {
  validateQuestion(question);
  validateStatusOfQuestion(question, status);
};

// Kiểm tra thông tin khoa và trạng thái khoa
export const validateDepartmentAndStatus = (department) => {
  validateDepartment(department);
  validateStatusOfDepartment(department);
};

// Kiểm tra thông tin lĩnh vực và trạng thái lĩnh vực
export const validateFieldAndStatus = (field) => {
  validateField(field);
  validateStatusOfField(field);
};

// Kiểm tra phần mở rộng file và kích thước file
export const validateMimetypeAndFileSize = (file, maxSize) => {
  validateMimetype(file);
  validateFileSize(file, maxSize);
};
