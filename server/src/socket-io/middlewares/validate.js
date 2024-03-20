import Department from '../../models/department.js';

export const validateDepartmentOfCounsellor = async (socket, next) => {
  const department = await Department.findById(
    socket.user.counsellor.department
  );
  if (!department) {
    const err = new Error('Không tìm thấy khoa');
    err.data = {
      status: 404,
      message: 'Không tìm thấy khoa',
      code: 4080,
    };
    return next(err);
  }
  socket.foundDepartment = department;
  next();
};

export const validateStatusDepartmentOfCounsellor = async (socket, next) => {
  const department = socket.foundDepartment;
  if (!department.isActive) {
    const err = new Error('Không thể truy cập. Khoa đang bị khóa');
    err.data = {
      status: 400,
      message: 'Không thể truy cập. Khoa đang bị khóa',
      code: 4081,
    };
    return next(err);
  }
  next();
};

