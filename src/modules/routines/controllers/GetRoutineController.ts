import { Controller, IController } from '@src/common';
import { NextFunction, Request, Response } from 'express';
import environment from '@src/config/environment';
import { OK } from 'http-status';
import { IGetRoutineService } from '../interfaces';

export default class GetRoutineController extends Controller implements IController {
  private service: IGetRoutineService;

  constructor(service: IGetRoutineService) {
    super();
    this.service = service;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const routineId = Number(req.params.id);
    try {
      const routine = await this.handleWithTimeout(
        this.service.execute({ id: routineId }),
        environment.api.requestTimeout
      );
      this.render(res, routine, OK);
    } catch (err) {
      next(err);
    }
  }
}
