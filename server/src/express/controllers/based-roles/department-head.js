import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

import QueryAPI from '../../../utils/query-api.js';
import paginateResults from '../../../utils/pagination.js';

import Field from '../../../models/field.js';

// endpoint: /api/department-head/fields
// method: GET
// description: Lấy danh sách lĩnh vực của khoa (phân trang, tìm kiếm, lọc)
export const fieldsHandler = catchAsyncErrors(async (req, res, next) => {
  const queryAPI = new QueryAPI(Field.find().lean().select('-__v'), req.query)
    .search()
    .filter()
    .sort();

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
  } = paginateResults(
    numberOfFields,
    req.query.page,
    req.query.size,
    fieldsRecords
  );
  res.json({ success: true, fields, page, pages, code: 2040 });
});

// endpoint: /api/department-head/fields/:id
// method: PATCH
// description: Cập nhật trạng lĩnh vực của khoa
export const updateStatusFieldHandler = catchAsyncErrors(
  async (req, res, next) => {
    const field = req.foundField;
    const { isActive } = req.body;
    field.isActive = isActive;

    const savedField = await field.save();

    const newStrStatus = savedField.isActive ? 'Mở khóa' : 'Khóa';

    res.json({
      success: true,
      message: `${newStrStatus} lĩnh vực thành công`,
      code: 2073,
    });
  }
);

// endpoint: /api/department-head/fields
// method: POST
// description: Cập nhật lĩnh vực của khoa
export const updateFieldHandler = catchAsyncErrors(async (req, res, next) => {
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

// endpoint: /api/department-head/fields
// method: POST
// description: Thêm lĩnh vực vào khoa
export const addFieldHandler = catchAsyncErrors(async (req, res, next) => {
  const { fieldName } = req.body;
  const department = req.foundDepartment;
  await Field.create({ fieldName, department });

  res.status(201).json({
    success: true,
    message: 'Thêm lĩnh vực thành công',
    code: 2018,
  });
});
