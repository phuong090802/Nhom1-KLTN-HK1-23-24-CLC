import Field from '../../../../models/field.js';
import handlePagination from '../../../../util/db/pagination.js';
import QueryAPI from '../../../../util/db/query-api.js';
import QueryTransform from '../../../../util/db/query-transform.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/department-head/fields
// Method: GET
// Description: Trưởng khoa lấy danh sách lĩnh vực của khoa (phân trang, tìm kiếm, lọc, sắp xếp)
export const handleGetFields = catchAsyncErrors(async (req, res, next) => {
  const query = Field.find().select('-__v -department').lean();
  const department = req.foundDepartment;
  const queryTransform = new QueryTransform(req.query).applyFilters({
    department: department._id,
  });
  const queryAPI = new QueryAPI(query, queryTransform.query)
    .search()
    .filter()
    .sort();
  const {
    records: fields,
    page,
    pages,
  } = await handlePagination(queryAPI, req.query.size, req.query.page);
  res.json({
    success: true,
    fields,
    page,
    pages,
    code: 2040,
  });
});

// Endpoint: /api/department-head/fields/:id
// Method: PATCH
// Description: Cập nhật trạng lĩnh vực của khoa
export const handleUpdateStatusOfField = catchAsyncErrors(
  async (req, res, next) => {
    const field = req.foundField;
    const { isActive } = req.body;
    field.isActive = isActive;
    const savedField = await field.save();
    const strStatus = savedField.isActive ? 'Mở khóa' : 'Khóa';
    res.json({
      success: true,
      message: `${strStatus} lĩnh vực thành công`,
      code: 2073,
    });
  }
);

// Endpoint: /api/department-head/fields
// Method: PUT
// Description: Cập nhật tên lĩnh vực của khoa
export const handleRenameField = catchAsyncErrors(async (req, res, next) => {
  const field = req.foundField;
  const { fieldName } = req.body;
  field.fieldName = fieldName;
  // save
  await field.save();
  // res
  res.json({
    success: true,
    message: 'Cập nhật tên lĩnh vực thành công',
    code: 2028,
  });
});

// Endpoint: /api/department-head/fields
// Method: POST
// Description: Thêm lĩnh vực vào khoa
export const handleCreateField = catchAsyncErrors(async (req, res, next) => {
  const { fieldName } = req.body;
  const department = req.foundDepartment;
  await Field.create({ fieldName, department });
  res.status(201).json({
    success: true,
    message: 'Thêm lĩnh vực thành công',
    code: 2018,
  });
});
