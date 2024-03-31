import * as validateDepartment from '../based-schemas/department.js';

// Kiểm tra thông tin khoa và trạng thái khoa
export const handleCheckDepartmentAndStatus = (department) => {
  validateDepartment.handleValidateDepartment(department);
  validateDepartment.handleCheckStatusOfDepartment(department);
};
