import { InternalError, ResponseError, Service } from '@src/common';
import { FindOptions } from 'sequelize';
import { ErrorHelper } from '@src/helpers';
import { NOT_FOUND } from 'http-status';
import { routineSerializable } from '../routineSerializable';
import { IGetRoutineService, IRoutineFilter, IRoutineResponse } from '../interfaces';
import { IRoutineRepository, MealItems, MealOptions, Meals, Routines } from '../sequelize';

export default class GetRoutineService extends Service implements IGetRoutineService {
  private routineRepository: IRoutineRepository;

  constructor(routineRepository: IRoutineRepository) {
    super();
    this.routineRepository = routineRepository;
  }

  async execute(filter: IRoutineFilter): Promise<IRoutineResponse> {
    const filters = this.buildFilter(filter);

    const conditions: FindOptions = {};
    conditions.where = {
      ...filters,
    };

    if (filter?.patientId) {
      conditions.where.patientId = filter.patientId;
    }

    if (filter?.nutritionistId) {
      conditions.where.nutritionistId = filter.nutritionistId;
    }

    conditions.include = [{ model: Meals, include: [{ model: MealOptions, include: [MealItems] }] }];

    let routine: Routines | null;

    try {
      routine = await this.routineRepository.findOne(conditions);
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to find record into database', error);
    }

    if (!routine) {
      throw new ResponseError('Rotina de alimentação não foi encontrada.', NOT_FOUND);
    }

    return routineSerializable(routine);
  }
}
