import { Controller, IController } from '@src/common';
import { NextFunction, Request, Response } from 'express';
import environment from '@src/config/environment';
import { OK } from 'http-status';
import { ILogoutService } from '../interfaces';

export default class LogoutController extends Controller implements IController {
  private service: ILogoutService;

  constructor(service: ILogoutService) {
    super();
    this.service = service;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = Number(req.userId);
    try {
      const result = await this.handleWithTimeout(this.service.execute(userId), environment.api.requestTimeout);
      this.render(res, result, OK);
    } catch (err) {
      next(err);
    }
  }
}
