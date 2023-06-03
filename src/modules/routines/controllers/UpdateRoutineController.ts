import { Controller, IController } from '@src/common';
import { NextFunction, Request, Response } from 'express';
import { IUpdateRoutineDto, IUpdateRoutineService } from '../interfaces';
import environment from '@src/config/environment';
import { OK } from 'http-status';

export default class UpdateRoutineController extends Controller implements IController {
  private service: IUpdateRoutineService;

  constructor(service: IUpdateRoutineService) {
    super();
    this.service = service;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const routineId = Number(req.params.id);
    const body = req.body as IUpdateRoutineDto;
    try {
      const routine = await this.handleWithTimeout(
        this.service.execute(routineId, body),
        environment.api.requestTimeout
      );
      this.render(res, routine, OK);
    } catch (err) {
      next(err);
    }
  }
}
