import { isAuthenticatedHandler } from '../../middlewares/auth.js';

import { createConversation } from '../../controllers/based-roles/counsellor.js';

import { createMessage } from '../../controllers/based-roles/user.js';

export default function message(io) {
  io.of('/messages')
    .use(isAuthenticatedHandler)
    .on('connection', (socket) => {
      socket.on('conversation:create', (payload, callback) =>
        createConversation(socket, payload, callback)
      );

      socket.on('message:create', (payload, callback) =>
        createMessage(socket, payload, callback)
      );
    });
}
