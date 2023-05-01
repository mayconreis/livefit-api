import { Controller, IController } from '@src/common';
import { NextFunction, Request, Response } from 'express';
import environment from '@src/config/environment';
import { OK } from 'http-status';
import { IGetRoutinesService } from '../interfaces';

export default class GetRoutinesController extends Controller implements IController {
  private service: IGetRoutinesService;

  constructor(service: IGetRoutinesService) {
    super();
    this.service = service;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const routines = await this.handleWithTimeout(this.service.execute(), environment.api.requestTimeout);
      this.render(res, routines, OK);
    } catch (err) {
      next(err);
    }
  }
}
