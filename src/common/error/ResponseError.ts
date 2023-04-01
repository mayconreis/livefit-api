export default class ResponseError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);

    this.code = code;
    this.name = 'ResponseError';
    Object.setPrototypeOf(this, ResponseError.prototype);
  }

  get response() {
    return { message: this.message, code: this.code };
  }
}
