import { Controller, IController } from '@src/common';
import { NextFunction, Request, Response } from 'express';
import environment from '@src/config/environment';
import { OK } from 'http-status';
import { ICreateUserDto, ICreateUserService } from '../interfaces';

export default class CreateUserController extends Controller implements IController {
  private service: ICreateUserService;

  constructor(service: ICreateUserService) {
    super();
    this.service = service;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const body = req.body as ICreateUserDto;
    try {
      const user = await this.handleWithTimeout(this.service.execute({ ...body }), environment.api.requestTimeout);
      this.render(res, user, OK);
    } catch (err) {
      next(err);
    }
  }
}
