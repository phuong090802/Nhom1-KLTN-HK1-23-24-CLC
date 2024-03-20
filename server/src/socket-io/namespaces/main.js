import {
  validateEmailForForgotPassword,
  validateEmailForRegister,
  validatePhoneNumberForRegister,
  verifyOTP,
} from '../controllers/auth.js';

export default function main(io) {
  io.of('/').on('connection', (socket) => {
    socket.on('register:validate-email', (payload, callback) =>
      validateEmailForRegister(socket, payload, callback)
    );

    socket.on('register:validate-phone-number', (payload, callback) =>
      validatePhoneNumberForRegister(socket, payload, callback)
    );

    socket.on('forgot-password:validate-email', (payload, callback) =>
      validateEmailForForgotPassword(socket, payload, callback)
    );

    socket.on('verify-otp', (payload, callback) =>
      verifyOTP(socket, payload, callback)
    );
  });
}
