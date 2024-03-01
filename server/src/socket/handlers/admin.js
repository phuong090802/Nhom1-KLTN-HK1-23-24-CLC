import Department from '../../models/department.js';

async function validateDepartmentNameCreate(payload, callback) {
  const { departmentName } = payload;
  const department = await Department.findOne({
    departmentName: { $regex: new RegExp(departmentName, 'i') },
  });

  const res = {
    success: true,
    message: 'Tên khoa khả dụng',
    exist: false,
    code: 2025,
  };

  if (department) {
    res.message = 'Tên khoa đã được sử dụng';
    res.exist = true;
    res.code = 4044;
  }

  callback(res);
}

async function validateDepartmentNameUpdate(payload, callback) {
  const { departmentId, departmentName } = payload;

  const department = await Department.findOne({
    _id: { $ne: departmentId },
    departmentName: { $regex: new RegExp(departmentName, 'i') },
  });

  const res = {
    success: true,
    message: 'Tên khoa khả dụng',
    exist: false,
    code: 2026,
  };

  if (department) {
    res.message = 'Tên khoa đã được sử dụng';
    res.exist = true;
    res.code = 4045;
  }

  callback(res);
}

export default function adminHandlers(socket) {
  socket.on(
    'departments:validate-department-name:create',
    validateDepartmentNameCreate
  );
  socket.on(
    'departments:validate-department-name:update',
    validateDepartmentNameUpdate
  );
}
