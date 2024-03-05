import Department from '../../models/department.js';
import User from '../../models/user.js';
import ErrorHandler from '../../utils/error-handler.js';
import catchAsyncErrors from '../middlewares/catch-async-errors.js';
import QueryAPI from '../../utils/query-api.js';
import paginateResults from '../../utils/pagination.js';

export const userHandler = catchAsyncErrors(async (req, res, next) => {
  const user = await req.userInParams.adminGetUserInfo();
  res.json({
    success: true,
    user,
    code: 2016,
  });
});

export const updateEnabledUserHandler = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.userInParams;
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

export const updateDepartmentHeadHandler = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.departmentInBody;

    // new department head
    const user = req.userInBody;

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

export const counsellorsInDepartmentHandler = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.departmentInParams;

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

export const addDepartmentHandler = catchAsyncErrors(async (req, res, next) => {
  const { departmentName } = req.body;
  await Department.create({ departmentName });

  res.status(201).json({
    success: true,
    message: 'Thêm khoa thành công',
    code: 2019,
  });
});

export const updateDepartmentHandler = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.departmentInParams;
    department.departmentName = req.body.departmentName;
    await department.save();

    res.json({
      success: true,
      message: 'Cập nhật khoa thành công',
      code: 2011,
    });
  }
);

export const updateStatusDepartmentHandler = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.departmentInParams;
    department.isActive = req.body.isActive;
    const savedDepartment = await department.save();
    const newStrStatus = savedDepartment.isActive ? 'Mở khóa' : 'Khóa';
    res.json({
      success: true,
      message: newStrStatus + ' thành công',
      code: 2020,
    });
  }
);

// create new staff

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
  if (departmentId) {
    department = await Department.findById(departmentId);
    if (!department) {
      return next(new ErrorHandler(404, `Không tìm thấy khoa`, 4030));
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

  if (department) {
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

// endpoint (POST): /counsellor not in any department
// add counsellor (COUNSELLOR) to department

export const addCounsellorToDepartmentHandler = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.userInBody;

    if (user.counsellor.department) {
      return next(
        new ErrorHandler(
          400,
          'Tư vấn viên đã được thêm vào khoa trước đó',
          4031
        )
      );
    }
    const department = req.departmentInBody;

    user.counsellor.department = department;
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Thêm tư vấn viên vào khoa thành công',
      code: 2013,
    });
  }
);
