import BaseRepository from '@src/common/BaseRepository';
import { MealItems } from '../entities/MealItems';

export type IMealItemsRepository = BaseRepository<MealItems>;

export class MealItemsRepository extends BaseRepository<MealItems> implements IMealItemsRepository {
  constructor() {
    super(MealItems);
  }
}
