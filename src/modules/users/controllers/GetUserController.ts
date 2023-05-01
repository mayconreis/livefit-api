import { Controller, IController } from '@src/common';
import { NextFunction, Request, Response } from 'express';
import { OK } from 'http-status';
import { IGetUserService } from '../interfaces';

export default class GetUserController extends Controller implements IController {
  private service: IGetUserService;

  constructor(service: IGetUserService) {
    super();
    this.service = service;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = Number(req.params.id);
    try {
      const user = await this.handleWithTimeout(this.service.execute({ id: userId }));
      this.render(res, user, OK);
    } catch (err) {
      next(err);
    }
  }
}
