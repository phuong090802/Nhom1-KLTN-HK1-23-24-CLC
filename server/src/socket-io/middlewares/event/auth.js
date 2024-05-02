import rolesMapper from '../../../constants/mapper/roles.js';
import ErrorHandler from '../../../util/error/socket-io-error-handler.js';

export const handleAuthorization = (socket, ...roles) => {
  const role = socket.user.role;
  if (!roles.includes(role)) {
    const msg = `${rolesMapper[role]} không được phép truy cập vào tài nguyên này`;
    throw new ErrorHandler(msg, 4087);
  }
};
