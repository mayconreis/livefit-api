import BaseRepository from '@src/common/BaseRepository';
import { Meals } from '../entities/Meals';

export type IMealRepository = BaseRepository<Meals>;

export class MealRepository extends BaseRepository<Meals> implements IMealRepository {
  constructor() {
    super(Meals);
  }
}
