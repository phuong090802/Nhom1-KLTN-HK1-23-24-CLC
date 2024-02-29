import Counsellor from '../../models/counsellor.js';
import Department from '../../models/department.js';
import User from '../../models/user.js';
import ErrorHandler from '../../utils/ErrorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import QueryAPI from '../../utils/QueryAPI.js';
import paginateResults from '../../utils/pagination.js';

export const updateDepartmentHeadHandler = catchAsyncErrors(
  async (req, res, next) => {
    const { departmentId, userId } = req.body;
    const department = await Department.findById(departmentId);

    // check department <> truthy -> end or continue

    // find user

    // check user <> truthy -> end or continue

    // update role old department -> clear token
    // update role new department
    // response
    
    console.log(departmentId, userId);
    res.end();
  }
);

export const counsellorsInDepartmentHandler = catchAsyncErrors(
  async (req, res, next) => {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return next(new ErrorHandler(404, 'Không tìm thấy khoa', 4034));
    }

    const userIsCounsellors = await Counsellor.find({ department }).select(
      '-_id user'
    );

    const userIsCounsellorIds = userIsCounsellors.map(
      (counsellor) => counsellor.user
    );

    const queryAPI = new QueryAPI(
      User.find({ _id: { $in: userIsCounsellorIds } }),
      req.query
    )
      .search()
      .filter()
      .sort();

    let counsellorRecords = await queryAPI.query;
    const numberOfCounsellors = counsellorRecords.length;
    counsellorRecords = await queryAPI.pagination().query.clone();

    const counsellorInfoRecords = await Promise.all(
      counsellorRecords.map((user) => user.adminGetCounsellorInfo())
    ).catch((reason) => {
      console.log(reason);
      return next(
        new ErrorHandler(500, `Lỗi ${reason} khi lấy thông tin nhân sự`, 4036)
      );
    });

    const {
      data: counsellors,
      page,
      pages,
    } = paginateResults(
      numberOfCounsellors,
      req.query.page,
      req.query.size,
      counsellorInfoRecords
    );

    res.json({ counsellors, page, pages });
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

  res.json({ departments, page, pages });
});

export const addDepartmentHandler = catchAsyncErrors(async (req, res, next) => {
  const { departmentName } = req.body;
  await Department.create({ departmentName });

  res.status(201).json({
    success: true,
    message: 'Thêm khoa thành công',
    code: 2001,
  });
});

export const updateDepartmentHandler = catchAsyncErrors(
  async (req, res, next) => {
    const department = await Department.findById(req.params.id);
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
    const department = await Department.findById(req.params.id);
    department.isActive = req.body.isActive;
    const savedDepartment = await department.save();

    const newStrStatus = savedDepartment.isActive ? 'Mở khóa' : 'Khóa';

    res.json({
      success: true,
      message: newStrStatus + ' thành công',
      code: 2011,
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

  //  in alowListRoles
  const allowRoles = ['COUNSELLOR', 'SUPERVISOR'];

  if (!allowRoles.includes(role)) {
    return next(new ErrorHandler(400, `${role} không được hổ trợ`, 4029));
  }
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
  const user = await User.create({
    fullName,
    email,
    phoneNumber,
    password: mergePassword,
    role,
  });

  let dataCreateCounsellor = { user };

  if (department) {
    dataCreateCounsellor = { ...dataCreateCounsellor, department };
  }

  if (user.role === 'COUNSELLOR') {
    await Counsellor.create(dataCreateCounsellor);
  }

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
    const { userId, departmentId } = req.body;
    const user = await User.findOne({ _id: userId, role: 'COUNSELLOR' });

    if (!user) {
      return next(new ErrorHandler(404, 'Không tìm thấy tư vấn viên', 4032));
    }

    const counsellor = await Counsellor.findOne({ user });

    if (counsellor.department) {
      return next(
        new ErrorHandler(
          400,
          'Tư vấn viên đã được thêm vào khoa trước đó',
          4031
        )
      );
    }
    const department = await Department.findById(departmentId);
    if (!department) {
      return next(new ErrorHandler(404, `Không tìm thấy khoa`, 4033));
    }

    counsellor.department = department;
    await counsellor.save();

    res.json({
      success: true,
      message: `Thêm tư vấn viên vào khoa thành công`,
      code: 2013,
    });
  }
);
