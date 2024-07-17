import GeneralField from '../../../../models/general-field.js';
import handlePagination from '../../../../util/db/pagination.js';
import QueryAPI from '../../../../util/db/query-api.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/admin/general-fields
// Method: PUT
// Description: Quản trị viên thêm lĩnh vực chung
export const handleCreateGeneralField = catchAsyncErrors(
  async (req, res, next) => {
    const { fieldName } = req.body;
    await GeneralField.create({ fieldName });
    res.status(201).json({
      success: true,
      message: 'Thêm lĩnh vực chung thành công',
      code: 2107,
    });
  }
);

// Endpoint: /api/admin/general-fields/:id
// Method: PUT
// Description: Quản trị viên cập nhật tên lĩnh vực chung
export const handleRenameGeneralField = catchAsyncErrors(
  async (req, res, next) => {
    const generalField = req.foundGeneralField;
    const { fieldName } = req.body;
    generalField.fieldName = fieldName;
    // save
    await generalField.save();
    // res
    res.json({
      success: true,
      message: 'Cập nhật tên lĩnh vực chung thành công',
      code: 2113,
    });
  }
);

// Endpoint: /api/admin/general-fields/:id
// Method: PATCH
// Description: Quản trị viên cập nhật trạng thái lĩnh vực chung
export const handleUpdateStatusOfGeneralField = catchAsyncErrors(
  async (req, res, next) => {
    const generalField = req.foundGeneralField;
    const { isActive } = req.body;
    generalField.isActive = isActive;
    const savedGeneralField = await generalField.save();
    const strStatus = savedGeneralField.isActive ? 'Mở khóa' : 'Khóa';
    res.json({
      success: true,
      message: `${strStatus} lĩnh vực chung thành công`,
      code: 2110,
    });
  }
);

// Endpoint: /api/admin/general-fields
// Method: GET
// Description: Quản trị viên lấy danh sách lĩnh vực chung trong hệ thống (phân trang, tìm kiếm, lọc, sắp xếp)
export const handleGetGeneralFields = catchAsyncErrors(
  async (req, res, next) => {
    const query = GeneralField.find().select('-__v').lean();
    const queryAPI = new QueryAPI(query, req.query).search().filter().sort();
    const {
      records: generalFields,
      page,
      pages,
    } = await handlePagination(queryAPI, req.query.size, req.query.page);
    res.json({
      success: true,
      generalFields,
      page,
      pages,
      code: 2111,
    });
  }
);
