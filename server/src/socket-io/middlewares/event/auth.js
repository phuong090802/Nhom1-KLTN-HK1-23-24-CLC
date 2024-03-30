import ErrorHandler from '../../../utils/error/socket-io-error-handler.js';
import rolesMapper from '../../../constants/mapper/roles.js';

export const handleAuthorization = (socket, ...roles) => {
  const role = socket.user.role;
  // console.log(role);

  if (!roles.includes(role)) {
    const msg = `${rolesMapper[role]} không được phép truy cập vào tài nguyên này`;
    throw new ErrorHandler(msg, 4087);
  }
};
