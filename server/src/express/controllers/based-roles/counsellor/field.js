import Field from '../../../../models/field.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/counsellor/fields
// Method: GET
// Description: Tư vấn viên kiểm tra có câu hỏi cần trả lời hay không
export const handleGetFields = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  const { department, fields } = user.counsellor;

  let query = { _id: { $in: fields }, isActive: true };
  if (user.role === 'DEPARTMENT_HEAD') {
    query = { department, isActive: true };
  }

  const listField = await Field.find(query).select('_id fieldName');

  res.json({
    success: true,
    fields: listField,
    code: 2074,
  });
});
