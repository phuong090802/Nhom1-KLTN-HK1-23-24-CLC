import * as authMiddleware from '../../middlewares/auth.js';
import * as departmentValidateMiddleware from '../../middlewares/validate/based-schemas/department.js';
import { handleCreateFeedback } from '../../controllers/based-roles/department-head/feedback.js';
import { handleCreateAnswer } from '../../controllers/based-roles/counsellor/answer.js';

export default function counsellor(io) {
  io.of('/counsellor')
    .use(authMiddleware.handleAuthentication)
    .use(authMiddleware.handleAuthorization('DEPARTMENT_HEAD', 'COUNSELLOR'))
    .use(departmentValidateMiddleware.handleValidateDepartment)
    .use(departmentValidateMiddleware.handleCheckStatusOfDepartment)
    .on('connection', (socket) => {
      socket.on('feedback:create', (payload, callback) =>
        handleCreateFeedback(socket, payload, callback)
      );

      socket.on('answer:create', (payload, callback) => {
        handleCreateAnswer(socket, payload, callback);
      });
    });
}
