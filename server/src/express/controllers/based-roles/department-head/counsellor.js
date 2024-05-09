import Field from '../../../../models/field.js';
import User from '../../../../models/user.js';
import handlePagination from '../../../../util/db/pagination.js';
import QueryAPI from '../../../../util/db/query-api.js';
import QueryTransform from '../../../../util/db/query-transform.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/department-head/counsellors/:id
// Method: PATCH
// Description: Khóa/mở khóa tư vấn viên
export const handleUpdateStatusOfCounsellor = catchAsyncErrors(
  async (req, res, next) => {
    const counsellor = req.foundUser;
    const { isEnabled } = req.body;
    counsellor.isEnabled = isEnabled;
    const savedUser = await counsellor.save();
    const strStatus = savedUser.isEnabled ? 'Mở khóa' : 'Khóa';
    res.json({
      success: true,
      message: strStatus + ' tài khoản thành công',
      code: 2044,
    });
  }
);

// Endpoint: /api/department-head/counsellors/:id
// Method: PATCH
// Description: Xóa lĩnh vực cho tư vấn viên
export const handleRemoveFieldOfCounsellor = catchAsyncErrors(
  async (req, res, next) => {
    const field = req.foundField;
    const updateCounsellor = req.foundUser;
    const updatedField = updateCounsellor.counsellor.fields.filter(
      (fieldId) => !fieldId.equals(field._id)
    );
    updateCounsellor.counsellor.fields = updatedField;
    await updateCounsellor.save();
    res.json({
      success: true,
      message: 'Xóa lĩnh vực của tư vấn viên thành công',
      code: 2043,
    });
  }
);

// Endpoint: /api/department-head/counsellors
// Method: POST
// Description: Thêm tư vấn viên cho khoa
export const handleCreateCounsellor = catchAsyncErrors(
  async (req, res, next) => {
    const { fullName, email, phoneNumber, password, confirmPassword } =
      req.body;
    const mergePassword = JSON.stringify({ password, confirmPassword });
    const department = req.foundDepartment;
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: mergePassword,
      'counsellor.department': department,
      role: 'COUNSELLOR',
    });
    res.status(201).json({
      success: true,
      message: 'Thêm tư vấn viên thành công',
      code: 2042,
    });
  }
);

// Endpoint: /api/department-head/counsellors/:id
// Method: PUT
// Description: Thêm lĩnh vực cho tư vấn viên
export const handleAddFieldToCounsellor = catchAsyncErrors(
  async (req, res, next) => {
    const { fieldIds } = req.body;
    if (!fieldIds || fieldIds.length === 0) {
      const msg = 'Vui lòng nhập lĩnh vực thêm cho tư vấn viên';
      return next(new ErrorHandler(422, msg, 4064));
    }
    const department = req.foundDepartment;
    const fields = await Field.find({ _id: { $in: fieldIds }, department });
    // active fields
    const activeFields = fields.filter((field) => field.isActive);
    // inactive fields
    const inactiveFields = fields.filter((field) => !field.isActive);
    // active field ids
    const activeFieldIds = activeFields.map((field) => field._id);
    // inactive field ids
    const inactiveFieldIds = inactiveFields.map((field) => field._id);
    const strFieldIds = fields.map((field) => field._id.toString());
    // field is not in current department
    const fieldIdsNotInDepartment = fieldIds.filter(
      (fieldId) => !strFieldIds.includes(fieldId)
    );
    const updateCounsellor = req.foundUser;
    // lọc những fieldIds chưa được thêm vào counsellor để tiến hành thêm vào counsellor (tránh trùng lập)
    const newFieldIds = activeFieldIds.filter(
      (fieldId) => !updateCounsellor.counsellor.fields.includes(fieldId)
    );
    updateCounsellor.counsellor.fields.push(...newFieldIds);
    await updateCounsellor.save();
    res.json({
      success: true,
      message: 'Thêm lĩnh vực cho tư vấn viên thành công',
      failedFieldIds: [...inactiveFieldIds, ...fieldIdsNotInDepartment],
    });
  }
);

// Endpoint: /api/department-head/counsellors
// Method: GET
// Description: Lấy danh tư vấn viên dùng trong khoa (phân trang, tìm kiếm, lọc, sắp xếp)
export const handleGetCounsellors = catchAsyncErrors(async (req, res, next) => {
  const department = req.foundDepartment;
  const query = User.find()
    .populate({
      path: 'counsellor.fields',
      select: '_id fieldName',
    })
    .select(
      'fullName role avatar email phoneNumber counsellor.fields isEnabled'
    )
    .lean();
  const queryTransform = new QueryTransform(req.query).applyFilters({
    role: { $ne: 'DEPARTMENT_HEAD', $eq: 'COUNSELLOR' },
    'counsellor.department': department._id,
  });
  const queryAPI = new QueryAPI(query, queryTransform.query)
    .search()
    .filter()
    .sort();
  const {
    records: retCounsellors,
    page,
    pages,
  } = await handlePagination(queryAPI, req.query.size, req.query.page);
  const counsellors = retCounsellors.map((user) => {
    user.avatar = user.avatar.url;
    user.fields = user.counsellor.fields;
    delete user.counsellor;
    return user;
  });
  res.json({
    success: true,
    counsellors,
    page,
    pages,
    code: 2041,
  });
});
