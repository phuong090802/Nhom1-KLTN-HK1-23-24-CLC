import {
  handleValidateEmailForForgotPassword,
  handleValidateEmailForRegister,
  handleValidatePhoneNumberForRegister,
  handleVerifyOTP,
} from '../controllers/auth.js';

export default function main(io) {
  io.of('/').on('connection', (socket) => {
    socket.on('register:validate-email', (payload, callback) =>
      handleValidateEmailForRegister(socket, payload, callback)
    );

    socket.on('register:validate-phone-number', (payload, callback) =>
      handleValidatePhoneNumberForRegister(socket, payload, callback)
    );

    socket.on('forgot-password:validate-email', (payload, callback) =>
      handleValidateEmailForForgotPassword(socket, payload, callback)
    );

    socket.on('verify-otp', (payload, callback) =>
      handleVerifyOTP(socket, payload, callback)
    );
  });
}
