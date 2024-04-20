import catchAsyncErrors from '../catch-async-errors.js';

// set default page and size for pagination
export const defaultPaginationParams = catchAsyncErrors((req, res, next) => {
  req.query.page = Number(req.query.page) || 1;
  req.query.size = Number(req.query.size) || 5;
  next();
});

// set default page and size for size and skip
export const defaultSizeAndSkip = catchAsyncErrors((req, res, next) => {
  req.query.size = Number(req.query.size) || 5;
  req.query.skip = Number(req.query.skip) || 0;
  next();
});
