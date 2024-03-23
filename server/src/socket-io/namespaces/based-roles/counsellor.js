import {
  authorizeRolesHandler,
  isAuthenticatedHandler,
} from '../../middlewares/auth.js';
import {
  validateDepartment,
  validateStatusDepartment,
} from '../../middlewares/validate.js';

import { createFeedback } from '../../controllers/based-roles/department-head.js';
import { createAnswer } from '../../controllers/based-roles/counsellor.js';

export default function counsellor(io) {
  io.of('/counsellor')
    .use(isAuthenticatedHandler)
    .use(authorizeRolesHandler('DEPARTMENT_HEAD', 'COUNSELLOR'))
    .use(validateDepartment)
    .use(validateStatusDepartment)
    .on('connection', (socket) => {
      socket.on('feedback:create', (payload, callback) =>
        createFeedback(socket, payload, callback)
      );

      socket.on('answer:create', (payload, callback) => {
        createAnswer(socket, payload, callback);
      });
    });
}
