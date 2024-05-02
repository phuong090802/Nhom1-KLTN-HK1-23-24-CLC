import attribute from '../../constants/mapper/attribute.js';
import ErrorHandler from '../../util/error/socket-io-error-handler.js';

// handle error if occurred when handler executing
const catchAsyncErrors = (handler) => (io, socket, payload, callback) => {
  Promise.resolve(handler(io, socket, payload, callback)).catch((err) => {
    err.message = err.message || 'Internal Server Error';
    err.code = err.code || 5000;
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
      console.log(err);
      callback({
        success: false,
        error: err,
        errorMessage: err.message,
        stack: err.stack,
      });
    }
    if (process.env.NODE_ENV === 'PRODUCTION') {
      let error = err;
      // console.log(err);
      // Wrong Mongoose Object ID Error
      if (err.name === 'CastError') {
        const message = 'Không tìm thấy tài nguyên với mã được truyền vào';
        error = new ErrorHandler(message, 4089);
      }
      // Handling Mongoose duplicate key errors
      if (err.name === 'MongoServerError' && err.code === 11000) {
        const keys = Object.keys(err.keyValue);
        const message =
          keys.map((key) => `'${attribute[key]}' đã được sử dụng`) + '';
        error = new ErrorHandler(message, 4090);
      }
      // Handling Mongoose Validation Error
      if (err.name === 'ValidationError') {
        const message =
          Object.values(err.errors).map(
            (error) =>
              `Giá trị '${error.value}' không hợp lệ cho trường '${error.path}'. Yêu cầu kiểu dữ liệu: '${error.kind}'`
          ) + '';
        error = new ErrorHandler(message, 4091);
      }
      callback({
        success: false,
        message: error.message,
        code: error.code,
      });
    }
  });
};

export default catchAsyncErrors;
