export default class TimeoutError extends Error {
  name: string;

  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';

    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}
