import { ILoggerError, ILoggerRequest, ILoggerResponse } from '@src/interfaces';
import { Request, Response } from 'express';
import { Logger } from '@src/helpers';

export const requestLogger = (req: Request) => {
  const log = <ILoggerRequest>{
    method: req.method,
    hostname: req.hostname,
    originalUrl: req.originalUrl,
    route: req.baseUrl,
    query: req.query,
    body: req.body as object,
    params: req.params,
  };
  Logger.Debug(`Request`, log);
};

export const errorLogger = (
  code: number,
  stack: string,
  message: string,
  req: Request,
  cause?: object
) => {
  const log = <ILoggerError>{
    code,
    stack,
    message,
    cause,
    content: <ILoggerRequest>{
      method: req.method,
      hostname: req.hostname,
      originalUrl: req.originalUrl,
      route: req.baseUrl,
      query: req.query,
      body: req.body as object,
      params: req.params,
    },
  };
  Logger.Error(`Error`, log);
};

export const responseLogger = (resp: Response, data: object | object[]) => {
  const log = <ILoggerResponse>{
    statusCode: resp.statusCode,
    statusMessage: resp.statusMessage,
    request: <ILoggerRequest>{
      method: resp.req.method,
      hostname: resp.req.hostname,
      originalUrl: resp.req.originalUrl,
      route: resp.req.baseUrl,
      query: resp.req.query,
      body: resp.req.body as object,
      params: resp.req.params,
    },
    response: data,
  };
  Logger.Debug(`Response`, log);
};
