export default class InternalError extends Error {
  cause: Error;

  constructor(message: string, cause: Error) {
    super(message);
    this.message = message;
    this.name = 'InternalError';
    this.cause = cause;

    Object.setPrototypeOf(this, InternalError.prototype);
  }
}
