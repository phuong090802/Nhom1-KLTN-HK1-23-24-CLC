import { createServer } from 'http';
import { Server } from 'socket.io';
import 'dotenv/config.js';

import app from './express/app.js';
import connectDB from './config/db.js';
import socketInit from './socket-io/socket-init.js';
import { socketCorsOptions } from './config/cors.js';

connectDB();

const server = createServer(app);
const io = new Server(server, {
  cors: socketCorsOptions,
});

socketInit(io);

server.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// Handle Unhandled Promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  console.log('Shutting down the server due to Unhandled Promise rejection');
  server.close(() => {
    process.exit(1);
  });
});
