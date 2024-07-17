import * as validateGeneralField from '../based-schemas/general-field.js';

// Kiểm tra thông tin lĩnh vực và trạng thái lĩnh vực chung
export const handleCheckGeneralFieldAndStatus = (field) => {
  validateGeneralField.handleValidateGeneralField(field);
  validateGeneralField.handleCheckStatusOfGeneralField(field);
};
