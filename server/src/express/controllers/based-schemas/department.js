import { GET_ALL_STAFFS_IN_DEPARTMENT } from '../../../constants/actions/user.js';
import Department from '../../../models/department.js';
import Field from '../../../models/field.js';
import User from '../../../models/user.js';
import paginate from '../../../util/db/paginate.js';
import QueryAPI from '../../../util/db/query-api.js';
import queryFiltersLimit from '../../../util/db/query-filters-limit.js';
import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

// Endpoint: /api/departments/:id/staffs
// Method: GET
// Description: Lấy danh sách nhân sự của khoa bằng id
export const handleGetStaffsInDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const departmentId = req.query.filter?.['counsellor.department'];
    const department = await Department.findOne({
      _id: departmentId,
      isActive: true,
    });
    let filterDepartment = {};
    if (!department) {
      const departmentIds = await Department.find({ isActive: true }).select(
        '-departmentName -isActive -__v'
      );
      filterDepartment = {
        'counsellor.department': { $in: departmentIds },
      };
    } else {
      filterDepartment = {
        'counsellor.department': departmentId,
      };
    }
    const query = User.find()
      .populate({
        path: 'counsellor.department',
        select: '-_id departmentName',
      })
      .select('fullName avatar email phoneNumber role counsellor.department');
    // .lean();
    const reqFilterRole = req.query.filter?.role;
    const allowFilterRoles = ['COUNSELLOR', 'DEPARTMENT_HEAD'];
    let filterRolesValue = { $in: allowFilterRoles };
    if (reqFilterRole && allowFilterRoles.includes(reqFilterRole)) {
      filterRolesValue = { $eq: reqFilterRole };
    }
    const filterRoles = { role: filterRolesValue };
    const requestQuery = queryFiltersLimit(
      req.query,
      filterRoles,
      filterDepartment
    );
    const queryAPI = new QueryAPI(query, requestQuery).search().filter().sort();
    let staffRecords = await queryAPI.query;
    const numberOfStaffs = staffRecords.length;
    staffRecords = await queryAPI.pagination().query.clone();
    const {
      data: retStaffs,
      page,
      pages,
    } = paginate(numberOfStaffs, req.query.page, req.query.size, staffRecords);
    const staffs = retStaffs.map((staff) =>
      staff.getUserInformation(GET_ALL_STAFFS_IN_DEPARTMENT)
    );
    res.json({
      success: true,
      staffs,
      page,
      pages,
      code: 2064,
    });
  }
);

// Endpoint: /api/departments/:id/fields
// Method: GET
// Description: Lấy danh sách lĩnh vực của khoa bằng id
export const handleGetFieldsOfDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    const fields = await Field.find({ department, isActive: true })
      .select('fieldName')
      .lean();
    res.json({
      success: true,
      fields,
      code: 2039,
    });
  }
);

// Endpoint: /api/departments
// Method: GET
// Description: Lấy danh sách khoa
export const handleGetDepartments = catchAsyncErrors(async (req, res, next) => {
  const departments = await Department.find({ isActive: true })
    .select('departmentName')
    .lean();
  res.json({
    success: true,
    departments,
    code: 2038,
  });
});
