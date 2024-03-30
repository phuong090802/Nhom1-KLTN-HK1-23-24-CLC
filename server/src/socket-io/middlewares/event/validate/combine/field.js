import * as validateField from '../based-schemas/field.js';

// Kiểm tra thông tin lĩnh vực và trạng thái lĩnh vực
export const handleCheckFieldAndStatus = (field) => {
  validateField.handleValidateField(field);
  validateField.handleCheckStatusOfField(field);
};
