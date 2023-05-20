import { Controller, IController } from '@src/common';
import { NextFunction, Request, Response } from 'express';
import environment from '@src/config/environment';
import { OK } from 'http-status';
import { IDeleteRoutineService } from '../interfaces';

export default class DeleteRoutineController extends Controller implements IController {
  private service: IDeleteRoutineService;

  constructor(service: IDeleteRoutineService) {
    super();
    this.service = service;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const routineId = Number(req.params.id);
    try {
      const isDeleted = await this.handleWithTimeout(this.service.execute(routineId), environment.api.requestTimeout);
      this.render(res, { isDeleted }, OK);
    } catch (err) {
      next(err);
    }
  }
}
