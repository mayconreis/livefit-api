import { Controller, IController } from '@src/common';
import { NextFunction, Request, Response } from 'express';
import environment from '@src/config/environment';
import { OK } from 'http-status';
import { IGetUserService } from '../interfaces';

export default class GetProfileController extends Controller implements IController {
  private service: IGetUserService;

  constructor(service: IGetUserService) {
    super();
    this.service = service;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = Number(req.userId);
    try {
      const user = await this.handleWithTimeout(this.service.execute(userId), environment.api.requestTimeout);
      this.render(res, user, OK);
    } catch (err) {
      next(err);
    }
  }
}
