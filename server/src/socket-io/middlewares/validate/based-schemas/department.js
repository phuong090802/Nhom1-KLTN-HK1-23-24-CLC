import Department from '../../../../models/department.js';

export const handleValidateDepartment = async (socket, next) => {
  const department = await Department.findById(
    socket.user.counsellor.department
  );

  if (!department) {
    const message = 'Không tìm thấy khoa';
    const err = new Error();
    err.data = {
      status: 404,
      message,
      code: 4080,
    };
    return next(err);
  }
  socket.foundDepartment = department;
  next();
};

export const handleCheckStatusOfDepartment = async (socket, next) => {
  const department = socket.foundDepartment;

  if (!department.isActive) {
    const message = 'Không thể truy cập. Khoa đang bị khóa';
    const err = new Error(message);
    err.data = {
      status: 400,
      message,
      code: 4081,
    };
    return next(err);
  }
  next();
};
