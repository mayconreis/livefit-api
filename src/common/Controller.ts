import { NextFunction, Request, Response } from 'express';
import { TimeoutError } from '@src/common';
import { responseLogger } from '@src/http/error/logger';
import { NO_CONTENT } from 'http-status';

export interface IController {
  handle(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export abstract class Controller implements IController {
  abstract handle(req: Request, res: Response, next: NextFunction): Promise<void>;

  protected handleWithTimeout<T>(promiseArg: T, timeoutMs = 60000): Promise<T> {
    let timeout: NodeJS.Timeout;
    const timeoutPromise = new Promise<never>((resolve, reject) => {
      timeout = setTimeout(
        () =>
          reject(new TimeoutError(`Ops, o tempo limite da solicitação foi atingido, tente novamente em instantes.`)),
        timeoutMs
      );
    });

    return Promise.race([promiseArg, timeoutPromise]).finally(() => clearTimeout(timeout));
  }

  protected render(res: Response, document: object | object[], status: number): void {
    if (!document) {
      responseLogger(res, {});
      res.status(NO_CONTENT).json();
    }
    responseLogger(res, document);
    res.status(status).json(document);
  }
}
