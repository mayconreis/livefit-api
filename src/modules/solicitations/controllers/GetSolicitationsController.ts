import { Controller, IController } from '@src/common';
import { NextFunction, Request, Response } from 'express';
import { OK } from 'http-status';
import environment from '@src/config/environment';
import { IGetSolicitationsService, ISolicitationFilter } from '../interfaces';

export default class GetSolicitationsController extends Controller implements IController {
  private service: IGetSolicitationsService;

  constructor(service: IGetSolicitationsService) {
    super();
    this.service = service;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const filter = req.query.filter as ISolicitationFilter;
    const include = req.query.include as string;
    try {
      const solicitations = await this.handleWithTimeout(
        this.service.execute({ ...filter }, include),
        environment.api.requestTimeout
      );
      this.render(res, solicitations, OK);
    } catch (err) {
      next(err);
    }
  }
}
