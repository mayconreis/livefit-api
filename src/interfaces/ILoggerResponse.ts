import { ILoggerRequest } from './ILoggerRequest';

export interface ILoggerResponse {
  statusCode: number;
  statusMessage: string;
  request: ILoggerRequest;
  response: object;
}
