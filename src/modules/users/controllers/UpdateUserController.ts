import { Controller, IController } from '@src/common';
import { NextFunction, Request, Response } from 'express';
import environment from '@src/config/environment';
import { OK } from 'http-status';
import { IUpdateUserDto, IUpdateUserService } from '../interfaces';

export default class UpdateUserController extends Controller implements IController {
  private service: IUpdateUserService;

  constructor(service: IUpdateUserService) {
    super();
    this.service = service;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = Number(req.params.id);
    const data = req.body as IUpdateUserDto;
    try {
      const user = await this.handleWithTimeout(
        this.service.execute(userId, { ...data }),
        environment.api.requestTimeout
      );
      this.render(res, user, OK);
    } catch (err) {
      next(err);
    }
  }
}
