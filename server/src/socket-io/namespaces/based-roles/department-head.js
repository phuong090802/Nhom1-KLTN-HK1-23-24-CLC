import {
  authorizeRolesHandler,
  isAuthenticatedHandler,
} from '../../middlewares/auth.js';

import {
  validateFieldNameCreate,
  validateFieldNameUpdate,
} from '../../controllers/based-roles/department-head.js';

import {
  validateDepartment,
  validateStatusDepartment,
} from '../../middlewares/validate.js';

export default function departmentHead(io) {
  io.of('/department-head')
    .use(isAuthenticatedHandler)
    .use(authorizeRolesHandler('DEPARTMENT_HEAD'))
    .use(validateDepartment)
    .use(validateStatusDepartment)
    .on('connection', (socket) => {
      socket.on('field:validate-field-name:create', (payload, callback) =>
        validateFieldNameCreate(socket, payload, callback)
      );

      socket.on('field:validate-field-name:update', (payload, callback) =>
        validateFieldNameUpdate(socket, payload, callback)
      );
    });
}
