import { Controller, IController } from '@src/common';
import { NextFunction, Request, Response } from 'express';
import { OK } from 'http-status';
import environment from '@src/config/environment';
import { ICreateRoutineDto, ICreateRoutineService } from '../interfaces';

export default class CreateRoutineController extends Controller implements IController {
  private service: ICreateRoutineService;

  constructor(service: ICreateRoutineService) {
    super();
    this.service = service;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = Number(req.userId);
    const body = req.body as ICreateRoutineDto;

    try {
      const routine = await this.handleWithTimeout(this.service.execute(userId, body), environment.api.requestTimeout);
      this.render(res, routine, OK);
    } catch (err) {
      next(err);
    }
  }
}
