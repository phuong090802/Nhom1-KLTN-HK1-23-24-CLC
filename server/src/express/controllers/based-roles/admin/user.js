import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import User from '../../../../models/user.js';
import QueryAPI from '../../../../utils/db/query-api.js';
import paginate from '../../../../utils/db/paginate.js';
import queryFiltersLimit from '../../../../utils/db/query-filters-limit.js';
import { ADMIN_GET_USER } from '../../../../constants/actions/user.js';

// Endpoint: /api/admin/users
// Method: GET
// Description: Lấy danh sách người dùng trong hệ thống (phân trang, tìm kiếm, lọc)
export const handleGetUsers = catchAsyncErrors(async (req, res, next) => {
  const query = User.find()
    .select('fullName avatar email phoneNumber isEnabled role occupation')
    .lean();
  // không lấy khoa

  const reqFilterRole = req.query.filter?.role;

  // console.log(reqFilterRole);

  let filterRolesValue = { $ne: 'ADMIN' };
  if (reqFilterRole) {
    filterRolesValue = { ...filterRolesValue, $eq: reqFilterRole };
  }

  const filterRoles = { role: filterRolesValue };

  // console.log(filterRoles);

  const requestQuery = queryFiltersLimit(req.query, filterRoles);

  // console.log(requestQuery);

  const queryAPI = new QueryAPI(query, requestQuery).search().filter().sort();

  let userRecords = await queryAPI.query;
  const numberOfUsers = userRecords.length;
  userRecords = await queryAPI.pagination().query.clone();

  const {
    data: retUsers,
    page,
    pages,
  } = paginate(numberOfUsers, req.query.page, req.query.size, userRecords);

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
