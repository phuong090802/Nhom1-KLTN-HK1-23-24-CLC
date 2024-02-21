import { adminDepartmentHandler } from './controllers/admin.js';
import { authHandler } from './controllers/auth.js';

export default function socket(io) {
  const authNamespace = io.of('/auth', (socket) => {
    authHandler(authNamespace, socket);
  });
  const adminDepartmentNamespace = io.of('/admin/departments', (socket) => {
    adminDepartmentHandler(adminDepartmentNamespace, socket);
  });
}
