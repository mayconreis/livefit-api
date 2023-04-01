import { ILoggerRequest } from './ILoggerRequest';

export interface ILoggerError {
  code: number;
  stack: string;
  message: string;
  cause?: object;
  content: ILoggerRequest;
}
