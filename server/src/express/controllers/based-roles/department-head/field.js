import Field from '../../../../models/field.js';
import paginate from '../../../../util/db/paginate.js';
import QueryAPI from '../../../../util/db/query-api.js';
import queryFiltersLimit from '../../../../util/db/query-filters-limit.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/department-head/fields
// Method: GET
// Description: Trưởng khoa lấy danh sách lĩnh vực của khoa (phân trang, tìm kiếm, lọc)
export const handleGetFields = catchAsyncErrors(async (req, res, next) => {
  const query = Field.find().select('-__v -department').lean();

  const department = req.foundDepartment;

  const filterDepartment = { department: department._id };

  const requestQuery = queryFiltersLimit(req.query, filterDepartment);

  const queryAPI = new QueryAPI(query, requestQuery).search().filter().sort();

  // get all fields in DB
  let fieldsRecords = await queryAPI.query;
  // number of record in db
  const numberOfFields = fieldsRecords.length;
  // get department in page with size
  fieldsRecords = await queryAPI.pagination().query.clone();

  const {
    data: fields,
    page,
    pages,
  } = paginate(numberOfFields, req.query.page, req.query.size, fieldsRecords);

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

    console.log(savedField);

    const strStatus = savedField.isActive ? 'Mở khóa' : 'Khóa';

    res.json({
      success: true,
      message: `${strStatus} lĩnh vực thành công`,
      code: 2073,
    });
  }
);

// Endpoint: /api/department-head/fields
// Method: POST
// Description: Cập nhật lĩnh vực của khoa
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
