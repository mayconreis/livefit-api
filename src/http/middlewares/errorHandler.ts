import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, REQUEST_TIMEOUT } from 'http-status';
import { InternalError, ResponseError } from '@src/common';
import { TimeoutError } from 'sequelize';
import { errorLogger } from '@src/http/error/logger';

const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction) => {
  const stack = error.stack ?? '';
  let message = 'Ops, ocorreu um erro inesperado, por favor tente novamente em instantes.';
  let code: number = INTERNAL_SERVER_ERROR;
  let cause = '';

  if (error instanceof ResponseError) {
    code = error.code;
    message = error.message;
  }

  if (error instanceof TimeoutError) {
    code = REQUEST_TIMEOUT;
    message = error.message;
  }

  if (error instanceof InternalError) {
    cause = error.cause.message;
  }

  const { response } = new ResponseError(message, code);
  errorLogger(code, stack, message, req, cause);
  return res.status(response.code).json(response);
};

export default errorHandler;
