import { createServer } from 'http';
import { Server } from 'socket.io';
// import './configs/env.js';
import 'dotenv/config.js';
import app from './api/app.js';
import connectDB from './configs/db.js';
import socketIO from './socket/socket-io.js';
import { socketCorsOptions } from './configs/cors.js';

connectDB();

const server = createServer(app);
const io = new Server(server, {
  cors: socketCorsOptions,
});

socketIO(io);

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
