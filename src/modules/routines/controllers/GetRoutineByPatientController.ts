import { Controller, IController } from '@src/common';
import { IGetRoutineService, IRoutineFilter } from '@src/modules/routines/interfaces';
import { NextFunction, Request, Response } from 'express';
import environment from '@src/config/environment';
import { OK } from 'http-status';

export default class GetRoutineByPatientController extends Controller implements IController {
  private service: IGetRoutineService;

  constructor(service: IGetRoutineService) {
    super();
    this.service = service;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const patientId = Number(req.params.id);
    const filter = req.query.filter as IRoutineFilter;

    const filters = {
      ...filter,
      patientId,
    };

    try {
      const routine = await this.handleWithTimeout(
        this.service.execute({ ...filters }),
        environment.api.requestTimeout
      );
      this.render(res, routine, OK);
    } catch (err) {
      next(err);
    }
  }
}
