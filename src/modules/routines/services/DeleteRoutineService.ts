import { InternalError, Service } from '@src/common';
import { ErrorHelper } from '@src/helpers';
import { connection } from '@src/database/DatabaseSetup';
import { Transaction } from 'sequelize';
import { IMealItemsRepository, IMealOptionsRepository, IMealRepository, IRoutineRepository } from '../sequelize';
import { IDeleteRoutineService } from '../interfaces';

export default class DeleteRoutineService extends Service implements IDeleteRoutineService {
  private routineRepository: IRoutineRepository;

  private mealRepository: IMealRepository;

  private mealOptionsRepository: IMealOptionsRepository;

  private mealItemsRepository: IMealItemsRepository;

  constructor(
    routineRepository: IRoutineRepository,
    mealRepository: IMealRepository,
    mealOptionsRepository: IMealOptionsRepository,
    mealItemsRepository: IMealItemsRepository
  ) {
    super();
    this.routineRepository = routineRepository;
    this.mealItemsRepository = mealItemsRepository;
    this.mealRepository = mealRepository;
    this.mealOptionsRepository = mealOptionsRepository;
  }

  async execute(routineId: number): Promise<boolean> {
    let rowsDeleted = 0;

    try {
      await connection().transaction(async (transaction) => {
        rowsDeleted = await this.routineRepository.delete({ where: { id: routineId }, transaction });
      });
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to delete record into database', error);
    }

    return rowsDeleted > 0;
  }

  private async deleteMeal(routineId: number, transaction?: Transaction): Promise<void> {
    await this.mealRepository.delete({ where: { routineId }, transaction });
  }

  private async deleteMealOptions(mealId: number, transaction?: Transaction): Promise<void> {
    await this.mealOptionsRepository.delete({ where: { mealId }, transaction });
  }

  private async deleteMealItems(mealOptionId: number, transaction?: Transaction): Promise<void> {
    await this.mealItemsRepository.delete({ where: { mealOptionId }, transaction });
  }
}
