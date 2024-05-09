import Department from '../../../../models/department.js';
import User from '../../../../models/user.js';
import handlePagination from '../../../../util/db/pagination.js';
import QueryAPI from '../../../../util/db/query-api.js';
import QueryTransform from '../../../../util/db/query-transform.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/admin/departments/:id
// Method: PATCH
// Description: Khóa/mở khóa khoa với giá trị được truyền vào
export const handleUpdateStatusOfDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    department.isActive = req.body.isActive;
    const savedDepartment = await department.save();
    const strStatus = savedDepartment.isActive ? 'Mở khóa' : 'Khóa';
    res.json({
      success: true,
      message: strStatus + ' thành công',
      code: 2020,
    });
  }
);

// Endpoint: /api/admin/departments
// Method: PUT
// Description: Cập nhật trưởng khoa cho khoa
// nếu khoa có trưởng khoa rồi -> cập nhật role trưởng khoa cũ thành COUNSELLOR
// cập nhật trưởng khoa mới role thành DEPARTMENT_HEAD
export const handleChangeDepartmentHead = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    // new department head
    const user = req.foundUser;
    const oldDepartmentHead = await User.findOne({
      'counsellor.department': department,
      role: 'DEPARTMENT_HEAD',
    });
    if (oldDepartmentHead) {
      oldDepartmentHead.role = 'COUNSELLOR';
      await oldDepartmentHead.save();
    }
    // update role new department
    user.role = 'DEPARTMENT_HEAD';
    await user.save();
    res.json({
      success: true,
      message: 'Cập nhật trưởng khoa thành công',
      code: 2014,
    });
  }
);

// Endpoint: /api/admin/departments
// Method: GET
// Description: Lấy danh sách khoa (phân trang, tìm kiếm, lọc, sắp xếp)
export const handleGetDepartments = catchAsyncErrors(async (req, res, next) => {
  const query = Department.find().select('-__v').lean();
  const queryAPI = new QueryAPI(query, req.query).search().filter().sort();
  const {
    records: departments,
    page,
    pages,
  } = await handlePagination(queryAPI, req.query.size, req.query.page);
  res.json({
    success: true,
    departments,
    page,
    pages,
    code: 2023,
  });
});

// Endpoint: /api/admin/departments
// Method: POST
// Description: Thêm khoa
export const handleCreateDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const { departmentName } = req.body;
    await Department.create({ departmentName });
    res.status(201).json({
      success: true,
      message: 'Thêm khoa thành công',
      code: 2019,
    });
  }
);

// Endpoint: /api/admin/departments/:id
// Method: PUT
// Description: Cập nhật tên khoa
export const handleRenameDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    const { departmentName } = req.body;
    department.departmentName = departmentName;
    await department.save();
    res.json({
      success: true,
      message: 'Cập nhật khoa thành công',
      code: 2011,
    });
  }
);

// Endpoint: /api/admin/departments/:id/counsellors
// Method: GET
// Description: Lấy danh sách tư vấn viên trong 1 khoa cụ thể bằng id (phân trang, tìm kiếm, lọc, sắp xếp)
export const handleGetCounsellorsInDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    const query = User.find().select('fullName avatar role').lean();
    const queryTransform = new QueryTransform(req.query).applyFilters({
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
    const counsellors = retCounsellors.map((counsellor) => ({
      ...counsellor,
      avatar: counsellor.avatar.url,
    }));
    res.json({
      success: true,
      counsellors,
      page,
      pages,
      code: 2022,
    });
  }
);
