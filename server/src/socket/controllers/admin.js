import Department from '../../models/department.js';

export const adminDepartmentHandler = (namespace, socket) => {
  socket.on(
    'check-department-name-exists',
    async (departmentName, callback) => {
      const department = await Department.findOne({
        departmentName: { $regex: new RegExp(departmentName, 'i') },
      });
      const res = {
        success: true,
        message: 'Tên phòng ban khả dụng',
        exists: false,
        code: 2010,
      };
      if (department) {
        res.message = 'Tên phòng ban được sử dụng';
        res.exists = true;
        res.code = 4028;
      }
      callback(res);
    }
  );
};
