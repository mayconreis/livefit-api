import { Controller, IController } from '@src/common';
import { NextFunction, Request, Response } from 'express';
import { ICreateSolicitationDto, ICreateSolicitationService } from '../interfaces';
import environment from '@src/config/environment';
import { OK } from 'http-status';

export default class CreateSolicitationController extends Controller implements IController {
  private service: ICreateSolicitationService;

  constructor(service: ICreateSolicitationService) {
    super();
    this.service = service;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const body = req.body as ICreateSolicitationDto;
    try {
      const solicitation = await this.handleWithTimeout(
        this.service.execute({ ...body }),
        environment.api.requestTimeout
      );
      this.render(res, solicitation, OK);
    } catch (err) {
      next(err);
    }
  }
}
