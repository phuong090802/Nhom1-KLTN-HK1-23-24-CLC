import authHandlers from './handlers/auth.js';
import adminHandlers from './handlers/admin.js';
import {
  isAuthenticatedHandler,
  authorizeRolesHandler,
} from './middlewares/auth.js';

export default function socketIO(io) {
  const authNamespace = io.of('/auth');
  const adminNamespace = io.of('/admin');

  authNamespace.on('connection', authHandlers);

  adminNamespace.use(isAuthenticatedHandler);
  adminNamespace.use(authorizeRolesHandler('ADMIN'));
  adminNamespace.on('connection', adminHandlers);
}
