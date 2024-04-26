import * as fieldController from '../../controllers/based-roles/department-head/field.js';
import * as authMiddleware from '../../middlewares/auth.js';
import * as departmentValidateMiddleware from '../../middlewares/validate/based-schemas/department.js';

export default function departmentHead(io) {
  io.of('/department-head')
    .use(authMiddleware.handleAuthentication)
    .use(authMiddleware.handleAuthorization('DEPARTMENT_HEAD'))
    .use(departmentValidateMiddleware.handleValidateDepartment)
    .use(departmentValidateMiddleware.handleCheckStatusOfDepartment)
    .on('connection', (socket) => {
      socket.on('field:validate-field-name:create', (payload, callback) =>
        fieldController.handleValidateFieldNameCreate(io, socket, payload, callback)
      );

      socket.on('field:validate-field-name:update', (payload, callback) =>
        fieldController.handleValidateFieldNameUpdate(io, socket, payload, callback)
      );
    });
}
