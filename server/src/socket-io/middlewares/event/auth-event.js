import ErrorHandler from '../../../util/error/socket-io-error-handler.js';

export const authorizeRolesHandler = (socket, ...roles) => {
  const role = socket.user.role;
  // console.log(role);
  if (!roles.includes(role)) {
    throw new ErrorHandler(
      `Role ${role} không được phép truy cập vào tài nguyên này`,
      4087
    );
  }
};
