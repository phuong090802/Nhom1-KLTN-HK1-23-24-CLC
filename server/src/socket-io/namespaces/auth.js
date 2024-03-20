import { isAuthenticatedHandler } from '../middlewares/auth.js';

import { validateEmail, verifyEmail } from '../controllers/auth.js';

export default function auth(io) {
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
}
