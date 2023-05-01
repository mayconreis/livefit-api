import { InternalError, Service } from '@src/common';
import { ErrorHelper } from '@src/helpers';
import { IGetRoutinesService, IRoutineResponse } from '../interfaces';
import { IRoutineRepository, MealItems, MealOptions, Meals, Routines } from '../sequelize';
import { routinesSerializable } from '../routineSerializable';

export default class GetRoutinesService extends Service implements IGetRoutinesService {
  private routineRepository: IRoutineRepository;

  constructor(routineRepository: IRoutineRepository) {
    super();
    this.routineRepository = routineRepository;
  }

  async execute(): Promise<IRoutineResponse[]> {
    let routines: Routines[] | null;

    try {
      routines = await this.routineRepository.findAll({
        include: [{ model: Meals, include: [{ model: MealOptions, include: [MealItems] }] }],
      });
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to find record into database', error);
    }

    return routinesSerializable(routines);
  }
}
