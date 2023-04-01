export default class ErrorHelper {
  static convertErrorToJson(err: Error): object {
    return <object>JSON.parse(JSON.stringify(err));
  }

  static ensureError(value: unknown): Error {
    let stringified: string;

    if (value instanceof Error) {
      return value;
    }

    try {
      stringified = JSON.stringify(value);
    } catch {
      stringified = '[Unable to stringify the thrown value]';
    }

    return new Error(stringified);
  }
}
