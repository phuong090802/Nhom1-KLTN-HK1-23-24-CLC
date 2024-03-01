import authHandlers from './handlers/auth.js';
import adminHandlers from './handlers/admin.js';
import {
  isAuthenticatedHandler,
  authorizeRolesHandler,
} from './middlewares/auth.js';
import departmentHeadHandlers from './handlers/department-head.js';

export default function socketIO(io) {
  const authNamespace = io.of('/auth');
  const adminNamespace = io.of('/admin');
  const departmentHeadNamespace = io.of('/department-head');

  authNamespace.on('connection', authHandlers);

  adminNamespace.use(isAuthenticatedHandler);
  adminNamespace.use(authorizeRolesHandler('ADMIN'));
  adminNamespace.on('connection', adminHandlers);

  departmentHeadNamespace.use(isAuthenticatedHandler);
  departmentHeadNamespace.use(authorizeRolesHandler('DEPARTMENT_HEAD'));
  departmentHeadNamespace.on('connection', departmentHeadHandlers);
}
