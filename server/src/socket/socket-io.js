import {
  validateDepartmentNameForCreate,
  validateDepartmentNameForUpdate,
} from './controllers/admin.js';
import {
  validateEmail,
  validateEmailForForgotPassword,
  validateEmailForRegister,
  validatePhoneNumberForRegister,
  verifyEmail,
  verifyOTP,
} from './controllers/auth.js';
import { createAnswer } from './controllers/counsellor.js';
import {
  approveAnswer,
  validateFieldNameCreate,
  validateFieldNameUpdate,
} from './controllers/department-head.js';
import { getAllQuestions } from './controllers/user.js';
import {
  authorizeRolesHandler,
  isAuthenticatedHandler,
} from './middlewares/auth.js';

export default function socketIO(io) {
  io.of('/').on('connection', (socket) => {
    socket.on('register:validate-email', validateEmailForRegister);
    socket.on('register:validate-phone-number', validatePhoneNumberForRegister);
    socket.on('forgot-password:validate-email', validateEmailForForgotPassword);
    socket.on('verify-otp', verifyOTP);
  });

  io.of('/auth')
    .use(isAuthenticatedHandler)
    .on('connection', (socket) => {
      socket.on('validate-email', (payload, callback) =>
        validateEmail(socket, payload, callback)
      );

      socket.on('verify-email', (payload, callback) => {
        verifyEmail(socket, payload, callback);
      });
    });

  io.of('/admin')
    .use(isAuthenticatedHandler)
    .use(authorizeRolesHandler('ADMIN'))
    .on('connection', (socket) => {
      socket.on(
        'department:validate-department-name:create',
        validateDepartmentNameForCreate
      );
      socket.on(
        'department:validate-department-name:update',
        validateDepartmentNameForUpdate
      );
    });

  io.of('department-head')
    .use(isAuthenticatedHandler)
    .use(authorizeRolesHandler('DEPARTMENT_HEAD'))
    .on('connection', (socket) => {
      socket.on('fields:validate-field-name:create', (payload, callback) =>
        validateFieldNameCreate(socket, payload, callback)
      );

      socket.on('field:validate-field-name:update', (payload, callback) =>
        validateFieldNameUpdate(socket, payload, callback)
      );

      socket.on('answer:approve', async (payload, callback) => {
        approveAnswer(io, payload, callback);
      });
    });

  io.of('/counsellor')
    .use(isAuthenticatedHandler)
    .use(authorizeRolesHandler('COUNSELLOR', 'DEPARTMENT_HEAD'))
    .on('connection', (socket) => {
      socket.on('answer:create', (payload, callback) => {
        createAnswer(io, socket, payload, callback);
      });
    });

  io.of('/questions').on('connection', (socket) => {
    socket.on('get-all-questions', (payload) => {
      getAllQuestions(socket, payload);
    });
  });
}
