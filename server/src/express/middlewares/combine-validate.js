import authHandler from './auth.js';
import {
  adminValidateStatusOfDepartment,
  departmentHeadValidateStatusOfField,
  userIsInParticipatesConversation,
  userIsNotInDeleteConversation,
  userValidateStatusOfDepartment,
  userValidateStatusOfField,
  validateConversationIdInParams,
  validateDepartmentIdInBody,
  validateDepartmentIdInParams,
  validateDepartmentOfCounsellor,
  validateFieldIdInBodyOfBelongToDepartment,
  validateFieldIdInParams,
  validateQuestionIdInParams,
  validateStatusDepartmentOfCounsellor,
  validateStatusOfDepartment,
  validateStatusOfQuestion,
} from './validate.js';

// Admin kiểm tra mã khoa trong params và trạng thái của khoa
export const adminValidateDepartmentInParams = [
  validateDepartmentIdInParams,
  adminValidateStatusOfDepartment,
];

// Admin kiểm tra mã khoa trong body và trạng thái của khoa
export const adminValidateDepartmentInBody = [
  validateDepartmentIdInBody,
  adminValidateStatusOfDepartment,
];

// Kiêm tra trạng thái khoa, trước khi trưởng khoa/tư vấn viên thược hiện chức năng
export const validateDepartmentBeforeAccess = [
  validateDepartmentOfCounsellor,
  validateStatusDepartmentOfCounsellor,
];

// Kiểm tra có phải role ... và trạng thái khoa là hoạt động trước khi truy cập
export const validateRoleAndStatusDepartmentBeforeAccess = (...roles) => [
  authHandler(...roles),
  validateDepartmentBeforeAccess,
];

// Kiểm tra trạng thái của question id (trong params) trước khi cập nhật
export const validateStatusQuestionInParams = (status) => [
  validateQuestionIdInParams,
  validateStatusOfQuestion(status),
];

// Kiểm tra trạng thía cuộc hội thoại, người dùng là thành viên, và cuộc hội thoại chưa bị bản thân xóa để lấy tất cả tin nhắn
export const validateConversationGetAllMessage = [
  validateConversationIdInParams,
  userIsInParticipatesConversation,
  userIsNotInDeleteConversation,
];

// chưa sử dụng
// kiểm tra trạng thái khoa trong body, lĩnh vực trong body có thuộc khoa không
// kiểm tra trạng thái của khoa, kiểm tra trạng thái lĩnh vực
export const validateBeforeMakeQuestion = [
  validateDepartmentIdInBody,
  validateFieldIdInBodyOfBelongToDepartment,
  userValidateStatusOfDepartment,
  userValidateStatusOfField,
];

// Trưởng khoa kiểm tra lĩnh vực trong params và trạng thái của nó
export const departmentHeadValidateField = [
  validateFieldIdInParams,
  departmentHeadValidateStatusOfField,
];

// Kiểm tra trạng thái của khoa trong body
export const validateDepartmentInBody = [
  validateDepartmentIdInBody,
  validateStatusOfDepartment,
];
