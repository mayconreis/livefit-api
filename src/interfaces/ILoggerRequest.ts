export interface ILoggerRequest {
  method: string;
  hostname: string;
  originalUrl: string;
  route: string;
  query: object;
  params: object;
  body: object;
}
