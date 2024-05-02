import Department from '../../../../../models/department.js';
import ErrorHandler from '../../../../../util/error/socket-io-error-handler.js';

// Kiểm tra lĩnh vực của tư vấn viên có hỗ trợ câu hỏi không
export const handleValidateFieldOfCounsellor = (
  fieldOfQuestion,
  counsellor
) => {
  if (!counsellor.counsellor.fields.includes(fieldOfQuestion)) {
    throw new ErrorHandler('Bạn không hỗ trợ lĩnh vực này', 4097);
  }
};

export const handleCheckBeforeAccessDepartment = async (socket) => {
  const department = await Department.findById(
    socket.user.counsellor.department
  );
  handleValidateDepartment(department);
  handleCheckStatusOfDepartment(department);
};

const handleValidateDepartment = (department) => {
  if (!department) {
    throw new ErrorHandler('Không tìm thấy khoa', 4116);
  }
};

const handleCheckStatusOfDepartment = (department) => {
  if (!department.isActive) {
    const message = 'Không thể truy cập. Khoa đang bị khóa';
    throw new ErrorHandler(message, 4117);
  }
};
