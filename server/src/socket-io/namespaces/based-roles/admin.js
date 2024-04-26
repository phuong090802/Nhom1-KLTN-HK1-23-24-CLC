import * as departmentController from '../../controllers/based-roles/admin/department.js';
import * as authMiddleware from '../../middlewares/auth.js';

export default function admin(io) {
  io.of('/admin')
    .use(authMiddleware.handleAuthentication)
    .use(authMiddleware.handleAuthorization('ADMIN'))
    .on('connection', (socket) => {
      socket.on(
        'department:validate-department-name:create',
        (payload, callback) => {
          departmentController.handleValidateDepartmentNameForCreate(
            io,
            socket,
            payload,
            callback
          );
        }
      );

      socket.on(
        'department:validate-department-name:update',
        (payload, callback) => {
          departmentController.handleValidateDepartmentNameForUpdate(
            socket,
            payload,
            callback
          );
        }
      );
    });
}
