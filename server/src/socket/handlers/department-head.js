import Field from '../../models/field.js';

async function validateFieldNameCreate(socket, payload, callback) {
  const { fieldName } = payload;
  const department = socket.user.counsellor.department;

  const field = await Field.findOne({
    fieldName: { $regex: new RegExp(fieldName, 'i') },
    department,
  });
  const res = {
    success: true,
    message: 'Tên lĩnh vực khả dụng',
    exist: false,
    code: 2027,
  };

  if (field) {
    res.message = 'Tên lĩnh vực đã được sử dụng';
    res.exist = true;
    res.code = 4046;
  }

  callback(res);
}

async function validateFieldNameUpdate(socket, payload, callback) {
  const { fieldId, fieldName } = payload;
  const department = socket.user.counsellor.department;

  const field = await Field.findOne({
    _id: { $ne: fieldId },
    fieldName: { $regex: new RegExp(fieldName, 'i') },
    department,
  });

  const res = {
    success: true,
    message: 'Tên lĩnh vực khả dụng',
    exist: false,
    code: 2029,
  };

  if (field) {
    res.message = 'Tên lĩnh vực đã được sử dụng';
    res.exist = true;
    res.code = 4048;
  }

  callback(res);
}

export default function departmentHeadHandlers(socket) {
  socket.on('fields:validate-field-name:create', (payload, callback) =>
    validateFieldNameCreate(socket, payload, callback)
  );

  socket.on('fields:validate-field-name:update', (payload, callback) =>
    validateFieldNameUpdate(socket, payload, callback)
  );
}
