import validator from 'validator';

import Department from '../../../models/department.js';

// namespace: /admin
// listen event (ack): department:validate-department-name:create
// description: Kiểm tra tên khoa trước khi tạo khoa mới
export const validateDepartmentNameForCreate = async (payload, callback) => {
  const { departmentName } = payload;
  const department = await Department.findOne({
    departmentName: { $regex: new RegExp(departmentName, 'i') },
  });

  const res = {
    success: true,
    message: 'Tên khoa khả dụng',
    code: 2025,
  };

  if (department) {
    res.success = false;
    res.message = 'Tên khoa đã được sử dụng';
    res.code = 4044;
  }

  callback(res);
};

// namespace: /admin
// listen event (ack): department:validate-department-name:update
// description: Kiểm tra tên khoa trước khi cập nhật tên khoa
export const validateDepartmentNameForUpdate = async (payload, callback) => {
  const { departmentId, departmentName } = payload;

  if (!departmentId || !validator.isMongoId(departmentId)) {
    return callback({
      success: false,
      message: 'Mã khoa không hợp lệ',
      code: 4054,
    });
  }

  const department = await Department.findOne({
    _id: { $ne: departmentId },
    departmentName: { $regex: new RegExp(departmentName, 'i') },
  });

  const res = {
    success: true,
    message: 'Tên khoa khả dụng',
    code: 2026,
  };

  if (department) {
    res.success = false;
    res.message = 'Tên khoa đã được sử dụng';
    res.code = 4045;
  }

  callback(res);
};
