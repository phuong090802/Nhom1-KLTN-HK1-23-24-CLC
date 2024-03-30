import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import ErrorHandler from '../../../../utils/error/socket-io-error-handler.js';
import Field from '../../../../models/field.js';

// namespace: /department-head
// listen event (ack): field:validate-field-name:create
// description: Kiểm tra tên lĩnh vực trước khi tạo lĩnh vực
export const handleValidateFieldNameCreate = catchAsyncErrors(
  async (socket, payload, callback) => {
    const { fieldName } = payload;
    const department = socket.user.counsellor.department;

    const field = await Field.findOne({
      fieldName: { $regex: new RegExp(fieldName, 'i') },
      department,
    });

    if (field) {
      throw new ErrorHandler('Tên lĩnh vực đã được sử dụng', 4046);
    }

    callback({
      success: true,
      message: 'Tên lĩnh vực khả dụng',
      code: 2027,
    });
  }
);

// namespace: /department-head
// listen event (ack): field:validate-field-name:create
// description: Kiểm tra tên lĩnh vực trước khi cập tên mới
export const handleValidateFieldNameUpdate = catchAsyncErrors(
  async (socket, payload, callback) => {
    const { fieldId, fieldName } = payload;

    const department = socket.user.counsellor.department;

    const field = await Field.findOne({
      _id: { $ne: fieldId },
      fieldName: { $regex: new RegExp(fieldName, 'i') },
      department,
    });

    if (field) {
      throw new ErrorHandler('Tên lĩnh vực đã được sử dụng', 4048);
    }

    callback({
      success: true,
      message: 'Tên lĩnh vực khả dụng',
      code: 2029,
    });
  }
);
