import { ADMIN_GET_USER } from '../../../../constants/actions/user.js';
import User from '../../../../models/user.js';
import handlePagination from '../../../../util/db/pagination.js';
import QueryAPI from '../../../../util/db/query-api.js';
import QueryTransform from '../../../../util/db/query-transform.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/admin/users
// Method: GET
// Description: Lấy danh sách người dùng trong hệ thống (phân trang, tìm kiếm, lọc, sắp xếp)
export const handleGetUsers = catchAsyncErrors(async (req, res, next) => {
  const query = User.find()
    .select('fullName avatar email phoneNumber isEnabled role occupation')
    .lean();
  // không lấy khoa
  const reqFilterRole = req.query.filter?.role;
  let filterRolesValue = { $ne: 'ADMIN' };
  if (reqFilterRole) {
    filterRolesValue = { ...filterRolesValue, $eq: reqFilterRole };
  }
  const queryTransform = new QueryTransform(req.query).applyFilters({
    role: filterRolesValue,
  });
  const queryAPI = new QueryAPI(query, queryTransform.query)
    .search()
    .filter()
    .sort();
  const {
    records: retUsers,
    page,
    pages,
  } = await handlePagination(queryAPI, req.query.size, req.query.page);
  const users = retUsers.map((user) => ({ ...user, avatar: user.avatar.url }));
  res.json({
    success: true,
    users,
    page,
    pages,
    code: 2021,
  });
});

// Endpoint: /api/admin/users/:id
// Method: PUT
// Description: Khóa/mở khóa người dùng (tất cả các role ngoại trừ ADMIN)
export const handleUpdateStatusOfUser = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.foundUser;
    user.isEnabled = req.body.isEnabled;
    const savedUser = await user.save();
    const strStatus = savedUser.isEnabled ? 'Mở khóa' : 'Khóa';
    res.json({
      success: true,
      message: strStatus + ' tài khoản thành công',
      code: 2015,
    });
  }
);

// Endpoint: /api/admin/users/:id
// Method: GET
// Description: Xem thông tin của người dùng với cấu trúc được yêu cầu
export const handleGetUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.foundUser.getUserInformation(ADMIN_GET_USER);
  res.json({
    success: true,
    user,
    code: 2016,
  });
});
