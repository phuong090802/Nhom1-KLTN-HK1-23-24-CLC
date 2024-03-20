import {
  authorizeRolesHandler,
  isAuthenticatedHandler,
} from '../../middlewares/auth.js';

import {
  validateDepartmentNameForCreate,
  validateDepartmentNameForUpdate,
} from '../../controllers/based-roles/admin.js';

export default function admin(io) {
  io.of('/admin')
    .use(isAuthenticatedHandler)
    .use(authorizeRolesHandler('ADMIN'))
    .on('connection', (socket) => {
      socket.on(
        'department:validate-department-name:create',
        (payload, callback) => {
          validateDepartmentNameForCreate(socket, payload, callback);
        }
      );
      socket.on(
        'department:validate-department-name:update',
        (payload, callback) => {
          validateDepartmentNameForUpdate(socket, payload, callback);
        }
      );
    });
}
