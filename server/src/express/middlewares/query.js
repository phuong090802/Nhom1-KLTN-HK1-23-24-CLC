import catchAsyncErrors from './catch-async-errors.js';

// set default page and size for pagination
export const defaultPaginationParams = catchAsyncErrors((req, res, next) => {
  req.query.page = Number(req.query.page) || 1;
  req.query.size = Number(req.query.size) || 5;
  next();
});

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
