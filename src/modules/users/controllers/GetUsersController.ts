import { Controller, IController } from '@src/common';
import { NextFunction, Request, Response } from 'express';
import environment from '@src/config/environment';
import { OK } from 'http-status';
import { IGetUsersService, IUserFilter } from '../interfaces';

export default class GetUsersController extends Controller implements IController {
  private service: IGetUsersService;

  constructor(service: IGetUsersService) {
    super();
    this.service = service;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const filter = req.query.filter as IUserFilter;
    try {
      const users = await this.handleWithTimeout(this.service.execute({ ...filter }), environment.api.requestTimeout);
      this.render(res, users, OK);
    } catch (err) {
      next(err);
    }
  }
}
