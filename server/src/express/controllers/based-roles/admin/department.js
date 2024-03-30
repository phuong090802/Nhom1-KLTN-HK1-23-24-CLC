import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import User from '../../../../models/user.js';
import Department from '../../../../models/department.js';
import QueryAPI from '../../../../utils/db/query-api.js';
import paginate from '../../../../utils/db/paginate.js';
import queryFiltersLimit from '../../../../utils/db/query-filters-limit.js';

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
// Description: Lấy danh sách khoa (phân trang, tìm kiếm, lọc)
export const handleGetDepartments = catchAsyncErrors(async (req, res, next) => {
  const query = Department.find().select('-__v').lean();

  const queryAPI = new QueryAPI(query, req.query).search().filter().sort();
  // get all departments in DB
  let departmentRecords = await queryAPI.query;
  // number of record in db
  const numberOfDepartments = departmentRecords.length;
  // get department in page with size
  departmentRecords = await queryAPI.pagination().query.clone();
  const {
    data: departments,
    page,
    pages,
  } = paginate(
    numberOfDepartments,
    req.query.page,
    req.query.size,
    departmentRecords
  );

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

    department.departmentName = req.body.departmentName;
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
// Description: Lấy danh sách tư vấn viên trong 1 khoa cụ thể bằng id (phân trang, tìm kiếm, lọc)
export const handleGetCounsellorsInDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;

    const query = User.find().select('fullName avatar role').lean();

    const filterDepartment = { 'counsellor.department': department._id };

    const requestQuery = queryFiltersLimit(req.query, filterDepartment);

    const queryAPI = new QueryAPI(query, requestQuery).search().filter().sort();

    let counsellorRecords = await queryAPI.query;
    const numberOfCounsellors = counsellorRecords.length;
    counsellorRecords = await queryAPI.pagination().query.clone();

    const {
      data: retCounsellors,
      page,
      pages,
    } = paginate(
      numberOfCounsellors,
      req.query.page,
      req.query.size,
      counsellorRecords
    );

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
