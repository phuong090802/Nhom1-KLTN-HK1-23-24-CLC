import {
  authorizeRolesHandler,
  isAuthenticatedHandler,
} from '../../middlewares/auth.js';
import {
  validateDepartmentOfCounsellor,
  validateStatusDepartmentOfCounsellor,
} from '../../middlewares/validate.js';

import { createFeedback } from '../../controllers/based-roles/department-head.js';

export default function counsellor(io) {
  io.of('/counsellor')
    .use(isAuthenticatedHandler)
    .use(authorizeRolesHandler('DEPARTMENT_HEAD', 'COUNSELLOR'))
    .use(validateDepartmentOfCounsellor)
    .use(validateStatusDepartmentOfCounsellor)
    .on('connection', (socket) => {
      socket.on('feedback:create', (payload, callback) =>
        createFeedback(socket, payload, callback)
      );
    });
}
