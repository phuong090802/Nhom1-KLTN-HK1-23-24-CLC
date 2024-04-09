// blue print error (socket)
export default class ErrorHandler extends Error {
  constructor(message, code) {
    super(message);
    this.message = message;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}
