import catchAsyncErrors from './catch-async-errors.js';

export const setDefaultPaginationParams = catchAsyncErrors((req, res, next) => {
  console.log('Before:', req.query.page, req.query.size);
  req.query.page = Number(req.query.page) || 1;
  req.query.size = Number(req.query.size) || 5;
  // for tess
  console.log('After:', req.query.page, req.query.size);
  next();
});

// for not error in test.js
export const setUserSearchFieldsParams = catchAsyncErrors((req, res, next) => {
  req.query.fields = ['fullName', 'email', 'phoneNumber'];
  next();
});

// export const setAdminManagementDepartments = (req, res, next) => {
//   req.query.page = 1;
//   req.query.size = 5;
//   // req.query.search = ['departmentName'];
//   next();
// };
