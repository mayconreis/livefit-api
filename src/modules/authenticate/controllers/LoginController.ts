import { Controller, IController } from '@src/common';
import { NextFunction, Request, Response } from 'express';
import environment from '@src/config/environment';
import { OK } from 'http-status';
import { ILoginDto, ILoginService } from '../interfaces';

export default class LoginController extends Controller implements IController {
  private service: ILoginService;

  constructor(service: ILoginService) {
    super();
    this.service = service;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const body = req.body as ILoginDto;
    try {
      const token = await this.handleWithTimeout(this.service.execute({ ...body }), environment.api.requestTimeout);
      this.render(res, token, OK);
    } catch (err) {
      next(err);
    }
  }
}
