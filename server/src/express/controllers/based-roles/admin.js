import Department from '../../../models/department.js';
import User from '../../../models/user.js';

import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

import ErrorHandler from '../../../utils/error-handler.js';
import QueryAPI from '../../../utils/query-api.js';
import paginateResults from '../../../utils/pagination.js';

// endpoint: /api/admin/users/:id
// method: GET
// description: Xem thông tin của người dùng với cấu trúc được yêu cầu
export const userHandler = catchAsyncErrors(async (req, res, next) => {
  const user = await req.foundUser.adminRequestUserInformation();
  res.json({
    success: true,
    user,
    code: 2016,
  });
});

// endpoint: /api/admin/users/:id
// method: PUT
// description: Khóa/mở khóa người dùng (tất cả các role ngoại trừ ADMIN)
export const updateEnabledUserHandler = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.foundUser;
    user.isEnabled = req.body.isEnabled;
    const savedUser = await user.save();

    const newStrIsEnabled = savedUser.isEnabled ? 'Mở khóa' : 'Khóa';
    res.json({
      success: true,
      message: newStrIsEnabled + ' tài khoản thành công',
      code: 2015,
    });
  }
);

// endpoint: /api/admin/users
// method: GET
// description: Lấy danh sách người dùng trong hệ thống (phân trang, tìm kiếm, lọc)
export const usersHandler = catchAsyncErrors(async (req, res, next) => {
  const queryAPI = new QueryAPI(
    User.find({ role: { $ne: 'ADMIN' } })
      .lean()
      .select('_id fullName avatar email phoneNumber role'),
    req.query
  )
    .search()
    .filter()
    .sort();

  let userRecords = await queryAPI.query;
  const numberOfUsers = userRecords.length;
  userRecords = await queryAPI.pagination().query.clone();

  const {
    data: users,
    page,
    pages,
  } = paginateResults(
    numberOfUsers,
    req.query.page,
    req.query.size,
    userRecords
  );
  res.json({ success: true, users, page, pages, code: 2021 });
});

// endpoint: /api/admin/departments
// method: PUT
// description: cập nhật trưởng khoa cho khoa
// nếu khoa có trưởng khoa rồi -> cập nhật role trưởng khoa cũ thành COUNSELLOR
// cập nhật trưởng khoa mới role thành DEPARTMENT_HEAD
export const updateDepartmentHeadHandler = catchAsyncErrors(
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
    // response

    res.json({
      success: true,
      message: 'Cập nhật trưởng khoa thành công',
      code: 2014,
    });
  }
);

// endpoint: /api/admin/departments/:id/counsellors
// method: GET
// description: lấy danh sách tư vấn viên trong 1 khoa cụ thể bằng id (phân trang, tìm kiếm, lọc)
export const counsellorsInDepartmentHandler = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;

    const queryAPI = new QueryAPI(
      User.find({
        'counsellor.department': department,
      })
        .lean()
        .select('_id fullName avatar role'),
      req.query
    )
      .search()
      .filter()
      .sort();

    let counsellorRecords = await queryAPI.query;
    const numberOfCounsellors = counsellorRecords.length;
    counsellorRecords = await queryAPI.pagination().query.clone();

    const {
      data: counsellors,
      page,
      pages,
    } = paginateResults(
      numberOfCounsellors,
      req.query.page,
      req.query.size,
      counsellorRecords
    );
    res.json({ success: true, counsellors, page, pages, code: 2022 });
  }
);

// endpoint: /api/admin/departments
// method: GET
// description: lấy danh sách khoa (phân trang, tìm kiếm, lọc)
export const departmentsHandler = catchAsyncErrors(async (req, res, next) => {
  const queryAPI = new QueryAPI(
    Department.find().lean().select('-__v'),
    req.query
  )
    .search()
    .filter()
    .sort();
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
  } = paginateResults(
    numberOfDepartments,
    req.query.page,
    req.query.size,
    departmentRecords
  );
  res.json({ success: true, departments, page, pages, code: 2023 });
});

// endpoint: /api/admin/departments
// method: POST
// description: thêm khoa
export const addDepartmentHandler = catchAsyncErrors(async (req, res, next) => {
  const { departmentName } = req.body;
  await Department.create({ departmentName });

  res.status(201).json({
    success: true,
    message: 'Thêm khoa thành công',
    code: 2019,
  });
});

// endpoint: /api/admin/departments/:id
// method: PUT
// description: cập nhật tên khoa
export const updateDepartmentHandler = catchAsyncErrors(
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

// endpoint: /api/admin/departments/:id
// method: PATCH
// description: khóa/mở khóa khoa
export const updateStatusDepartmentHandler = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;

    department.isActive = req.body.isActive;

    const savedDepartment = await department.save();
    // handle disable account user
    const newStrStatus = savedDepartment.isActive ? 'Mở khóa' : 'Khóa';

    res.json({
      success: true,
      message: newStrStatus + ' thành công',
      code: 2020,
    });
  }
);

// endpoint: /api/admin/staffs
// method: POST
// description: thêm nhân sự vào hệ thống (COUNSELLOR/SUPERVISOR)
// nếu là tự vấn viên mã khoa là tùy chọn
export const addStaffHandler = catchAsyncErrors(async (req, res, next) => {
  const {
    fullName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    departmentId,
    role,
  } = req.body;

  // check department Id
  let department;

  if (departmentId && role !== 'SUPERVISOR') {
    department = await Department.findById(departmentId);
    if (!department) {
      return next(new ErrorHandler(404, 'Không tìm thấy khoa', 4030));
    }
    if (!department.isActive) {
      return next(
        new ErrorHandler(
          400,
          'Khoa đang bị khóa. Vui lòng mở khóa trước khi thực hiện các thao tác liên quan',
          4074
        )
      );
    }
  }

  const mergePassword = JSON.stringify({ password, confirmPassword });
  // handle add User

  let userInput = {
    fullName,
    email,
    phoneNumber,
    password: mergePassword,
    role,
  };

  if (department && role !== 'SUPERVISOR') {
    userInput = { ...userInput, 'counsellor.department': department };
  }

  const user = await User.create(userInput);

  let roleStr = 'tư vấn viên';
  if (user.role === 'SUPERVISOR') {
    roleStr = 'giám sát viên';
  }
  // res
  res.status(201).json({
    success: true,
    message: `Thêm ${roleStr} thành công`,
    code: 2012,
  });
});

// Endpoint (POST): /api/admin/counsellor
// endpoint: /api/admin/counsellor
// method: POST
// description: thêm tư vấn viên chưa có khoa vào 1 khoa cụ thể
export const addCounsellorToDepartmentHandler = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.foundUser;

    if (user.counsellor.department) {
      return next(
        new ErrorHandler(
          400,
          'Tư vấn viên đã được thêm vào khoa trước đó',
          4031
        )
      );
    }
    const department = req.foundDepartment;

    user.counsellor.department = department;
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Thêm tư vấn viên vào khoa thành công',
      code: 2013,
    });
  }
);
