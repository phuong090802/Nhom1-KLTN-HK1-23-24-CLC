import Field from '../../models/field.js';

export async function validateFieldNameCreate(socket, payload, callback) {
  const { fieldName } = payload;
  const department = socket.user.counsellor.department;

  const field = await Field.findOne({
    fieldName: { $regex: new RegExp(fieldName, 'i') },
    department,
  });
  const res = {
    success: true,
    message: 'Tên lĩnh vực khả dụng',
    code: 2027,
  };

  if (field) {
    res.success = false;
    res.message = 'Tên lĩnh vực đã được sử dụng';
    res.code = 4046;
  }

  callback(res);
}

export async function validateFieldNameUpdate(socket, payload, callback) {
  const { fieldId, fieldName } = payload;

  if (!validator.isMongoId(fieldId)) {
    return callback({
      success: false,
      message: 'Mã lĩnh vực không hợp lệ',
      code: 4055,
    });
  }

  const department = socket.user.counsellor.department;

  const field = await Field.findOne({
    _id: { $ne: fieldId },
    fieldName: { $regex: new RegExp(fieldName, 'i') },
    department,
  });

  const res = {
    success: true,
    message: 'Tên lĩnh vực khả dụng',
    code: 2029,
  };

  if (field) {
    res.exist = false;
    res.message = 'Tên lĩnh vực đã được sử dụng';
    res.code = 4048;
  }

  callback(res);
}
