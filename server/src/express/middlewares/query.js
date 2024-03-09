import catchAsyncErrors from './catch-async-errors.js';

// set default page and size for pagination
export const defaultPaginationParams = catchAsyncErrors((req, res, next) => {
  req.query.page = Number(req.query.page) || 1;
  req.query.size = Number(req.query.size) || 5;
  next();
});

// giới hạn role trưởng khoa có thể lọc
export const departmentHeadLimitFilterRole = catchAsyncErrors(
  (req, res, next) => {
    const filter = req.query.filter;
    // if filter null or undefined right ?? will be return
    const modifiedFilter = { ...filter, role: 'COUNSELLOR' } ?? {
      role: 'COUNSELLOR',
    };
    req.query.filter = modifiedFilter;
    next();
  }
);

// for not error in test.js
// export const setUserSearchFieldsParams = catchAsyncErrors((req, res, next) => {
//   req.query.fields = ['fullName', 'email', 'phoneNumber'];
//   next();
// });

// export const setAdminManagementDepartments = (req, res, next) => {
//   req.query.page = 1;
//   req.query.size = 5;
//   // req.query.search = ['departmentName'];
//   next();
// };
