import { InternalError, Service } from '@src/common';
import { FindOptions } from 'sequelize';
import { ErrorHelper } from '@src/helpers';
import { ISolicitationRepository, Solicitations } from '../sequelize';
import { IGetSolicitationsService, ISolicitationFilter, ISolicitationResponse } from '../interfaces';
import { solicitationsSerializable } from '../solicitationSerializable';

export default class GetSolicitationsService extends Service implements IGetSolicitationsService {
  private solicitationRepository: ISolicitationRepository;

  constructor(solicitationRepository: ISolicitationRepository) {
    super();
    this.solicitationRepository = solicitationRepository;
  }

  async execute(filter: ISolicitationFilter, include: string): Promise<ISolicitationResponse[]> {
    const filters = this.buildFilter({ ...filter });

    const modelAssociations = this.solicitationRepository.getAssociations();

    const includes = this.buildIncludes(include, modelAssociations);

    const conditions: FindOptions = {};
    conditions.where = { ...filters };
    conditions.include = includes;

    if (filter?.solicitationType) {
      conditions.where.solicitationType = filter.solicitationType;
    }

    if (filter?.userId) {
      conditions.where.userId = filter.userId;
    }

    if (filter?.nutritionistId) {
      conditions.where.nutritionistId = filter.nutritionistId;
    }

    if (filter?.finished) {
      conditions.where.finished = filter.finished;
    }

    let solicitations: Solicitations[];

    try {
      solicitations = await this.solicitationRepository.findAll(conditions);
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to find record into database', error);
    }

    return solicitationsSerializable(solicitations);
  }
}
