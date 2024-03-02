import catchAsyncErrors from './catch-async-errors.js';
import Department from '../../models/department.js';
import User from '../../models/user.js';
import ErrorHandler from '../../utils/error-handler.js';
import Field from '../../models/field.js';

export const validateDepartmentIdInBody = catchAsyncErrors(
  async (req, res, next) => {
    const { departmentId } = req.body;
    const department = await Department.findById(departmentId);
    if (!department) {
      return next(new ErrorHandler(404, 'Không tìm thấy khoa', 4033));
    }
    req.departmentInBody = department;
    next();
  }
);

export const validateDepartmentIdInParams = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
      return next(new ErrorHandler(404, 'Không tìm thấy khoa', 4034));
    }
    req.departmentInParams = department;
    next();
  }
);

export const validateRoleInBody = (role) => {
  return catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId, role });
    if (!user) {
      return next(
        new ErrorHandler(
          404,
          `Không tìm thấy tài khoản với vai trò ${role}`,
          4032
        )
      );
    }
    req.userInBody = user;
    next();
  });
};

export const validateRoles = (...roles) => {
  return catchAsyncErrors((req, res, next) => {
    const role = req.body.role;
    if (!roles.includes(role)) {
      return next(new ErrorHandler(400, `${role} không được hổ trợ`, 4029));
    }
    next();
  });
};

export const validateRoleIdInParam = (role) => {
  return catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id, role });
    if (!user) {
      return next(
        new ErrorHandler(
          404,
          `Không tìm thấy tài khoản với vai trò ${role}`,
          4036
        )
      );
    }
    req.userInParams = user;
    next();
  });
};

export const validateUserIdInParams = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorHandler(404, 'Không tìm thấy tài khoản', 4037));
    }
    req.userInParams = user;
    next();
  }
);

export const validateDepartmentOfDepartmentHead = catchAsyncErrors(
  async (req, res, next) => {
    const department = await Department.findById(
      req.user.counsellor.department
    );
    if (!department) {
      return next(new ErrorHandler(404, 'Không tìm thấy khoa', 4038));
    }
    req.foundDepartment = department;
    next();
  }
);

export const validateFieldIdInParams = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const department = req.foundDepartment;
    const field = await Field.findOne({ _id: id, department });
    if (!field) {
      return next(new ErrorHandler(404, 'Không tìm lĩnh vực thuộc khoa', 4047));
    }
    req.fieldInParams = field;
    next();
  }
);

export const validateFieldIdInBody = catchAsyncErrors(
  async (req, res, next) => {
    const { fieldId } = req.body;
    const field = await Field.findById(fieldId);
    if (!field) {
      return next(new ErrorHandler(404, 'Không tìm lĩnh vực', 4049));
    }
    req.fieldInBody = field;
    next();
  }
);
