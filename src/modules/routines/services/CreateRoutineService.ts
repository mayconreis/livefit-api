import { InternalError, ResponseError, Service } from '@src/common';
import { ErrorHelper } from '@src/helpers';
import { connection } from '@src/database/DatabaseSetup';
import { Transaction } from 'sequelize';
import {
  ICreateMealDto,
  ICreateMealItemDto,
  ICreateRoutineDto,
  ICreateRoutineService,
  IRoutineResponse,
} from '../interfaces';
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
import { routineSerializable } from '../routineSerializable';
import { IUserRepository } from '@src/modules/users/sequelize';
import { EUserProfile } from '@src/shared/enums';
import { BAD_REQUEST } from 'http-status';

export default class CreateRoutineService extends Service implements ICreateRoutineService {
  private routineRepository: IRoutineRepository;

  private mealRepository: IMealRepository;

  private mealOptionsRepository: IMealOptionsRepository;

  private mealItemsRepository: IMealItemsRepository;

  private userRepository: IUserRepository;

  constructor(
    routineRepository: IRoutineRepository,
    mealRepository: IMealRepository,
    mealOptionsRepository: IMealOptionsRepository,
    mealItemsRepository: IMealItemsRepository,
    userRepository: IUserRepository
  ) {
    super();
    this.routineRepository = routineRepository;
    this.mealRepository = mealRepository;
    this.mealOptionsRepository = mealOptionsRepository;
    this.mealItemsRepository = mealItemsRepository;
    this.userRepository = userRepository;
  }

  async execute(userId: number, body: ICreateRoutineDto): Promise<IRoutineResponse> {
    const { patientId, meals } = body;

    let routine: Routines;

    const userAlreadyHaveRoutine = await this.routineRepository.exists({
      where: { patientId, nutritionistId: userId },
    });

    if (userAlreadyHaveRoutine) {
      throw new ResponseError('Usuário já possui rotina cadastrada com esse nutricionista', BAD_REQUEST);
    }

    const userIsNutritionist = await this.userRepository.exists({
      where: {
        id: userId,
        profile: EUserProfile.NUTRITIONIST,
      },
    });

    if (!userIsNutritionist) {
      throw new ResponseError(
        'Usuário não tem perfil de nutricionista para criar uma rotina de alimentação',
        BAD_REQUEST
      );
    }

    const userIsYourPatient = await this.userRepository.exists({ where: { id: patientId, nutritionistId: userId } });

    if (!userIsYourPatient) {
      throw new ResponseError('Usuário não é paciente desse nutricionista', BAD_REQUEST);
    }

    try {
      routine = await connection().transaction(async (transaction) => {
        const createdRoutine = await this.routineRepository.create(
          {
            patientId,
            nutritionistId: userId,
          } as Routines,
          { transaction }
        );

        await Promise.all(
          meals.map(async (meal) => {
            const createdMeal = await this.createMeal(createdRoutine.id, meal, transaction);

            await Promise.all(
              meal.mealOptions.map(async (mealOption) => {
                const createdMealOption = await this.createMealOption(createdMeal.id, transaction);
                await this.createMealItems(createdMealOption.id, mealOption.items, transaction);
              })
            );
          })
        );

        return createdRoutine;
      });
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to create record into database', error);
    }

    return routineSerializable(routine);
  }

  private async createMeal(routineId: number, meal: ICreateMealDto, transaction?: Transaction): Promise<Meals> {
    const { period, time } = meal;
    let createdMeal: Meals;

    try {
      createdMeal = await this.mealRepository.create(
        {
          routineId,
          time,
          period,
        } as Meals,
        { transaction }
      );
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to insert record into database', error);
    }

    return createdMeal;
  }

  private async createMealOption(mealId: number, transaction?: Transaction) {
    let mealOption: MealOptions;

    try {
      mealOption = await this.mealOptionsRepository.create(
        {
          mealId,
        } as MealOptions,
        { transaction }
      );
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to inser record into database', error);
    }

    return mealOption;
  }

  private async createMealItems(
    mealOptionId: number,
    mealItems: ICreateMealItemDto[],
    transaction?: Transaction
  ): Promise<MealItems[]> {
    let createdMealItems: MealItems[];

    try {
      createdMealItems = await this.mealItemsRepository.bulkCreate(
        mealItems.map(
          (mealItem) =>
            ({
              mealOptionId,
              item: mealItem.item,
              quantity: mealItem.quantity,
            } as MealItems)
        ),
        { transaction }
      );
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to insert record into database', error);
    }

    return createdMealItems;
  }
}
