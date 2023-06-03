import { InternalError, ResponseError, Service } from '@src/common';
import { ErrorHelper } from '@src/helpers';
import { BAD_REQUEST, NOT_FOUND } from 'http-status';
import { Transaction } from 'sequelize';
import { connection } from '@src/database/DatabaseSetup';
import {
  IMealItemsRepository,
  IMealOptionsRepository,
  IMealRepository,
  IRoutineRepository,
  MealItems,
  MealOptions,
  Meals,
  Routines,
} from '../sequelize';
import {
  IRoutineResponse,
  IUpdateMealDto,
  IUpdateMealItemDto,
  IUpdateRoutineDto,
  IUpdateRoutineService,
} from '../interfaces';
import { routineSerializable } from '@src/modules/routines/routineSerializable';

export default class UpdateRoutineService extends Service implements IUpdateRoutineService {
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
    this.mealRepository = mealRepository;
    this.mealOptionsRepository = mealOptionsRepository;
    this.mealItemsRepository = mealItemsRepository;
  }

  async execute(routineId: number, body: IUpdateRoutineDto): Promise<IRoutineResponse> {
    const { meals } = body;

    let routineExists = false;

    try {
      routineExists = await this.routineRepository.exists({ where: { id: routineId } });
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to find record into database', error);
    }

    if (!routineExists) {
      throw new ResponseError('Rotina não foi encontrada.', NOT_FOUND);
    }

    try {
      await connection().transaction(async (transaction) =>
        Promise.all(
          meals.map((meal) => {
            const { mealItems } = meal;
            mealItems.map((mealItem) => this.updateMealItem(mealItem, transaction));
            return this.updateMeal(meal, transaction);
          })
        )
      );
    } catch (err) {
      if (err instanceof ResponseError) {
        throw err;
      }
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Ocorreu um erro ao alterar a rotina de alimentação.', error);
    }

    const routineUpdated = await this.routineRepository.findOne({
      where: { id: routineId },
      include: [{ model: Meals, include: [{ model: MealOptions, include: [MealItems] }] }],
    });

    return routineSerializable(routineUpdated as Routines);
  }

  private async updateMeal(body: IUpdateMealDto, transaction?: Transaction) {
    const { period, time, id } = body;

    let mealExists: Meals | null;

    try {
      mealExists = await this.mealRepository.findOne({ where: { id } });
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to find record into database', error);
    }

    if (!mealExists) {
      throw new ResponseError('Não foi possível alterar a refeição. Refeição não foi encontrada', BAD_REQUEST);
    }

    mealExists.time = time;
    mealExists.period = period;

    try {
      await mealExists.save({ transaction });
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to update record into database', error);
    }
  }

  private async updateMealItem(body: IUpdateMealItemDto, transaction?: Transaction) {
    const { id, item, quantity } = body;

    let mealItemExists: MealItems | null;

    try {
      mealItemExists = await this.mealItemsRepository.findOne({ where: { id } });
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to find record into database', error);
    }

    if (!mealItemExists) {
      throw new ResponseError('Não foi possível alterar o item. Item não foi encontrado', BAD_REQUEST);
    }

    mealItemExists.item = item;
    mealItemExists.quantity = quantity;

    try {
      await mealItemExists.save({ transaction });
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to update record into database', error);
    }
  }
}
