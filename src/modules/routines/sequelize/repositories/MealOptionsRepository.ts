import BaseRepository from '@src/common/BaseRepository';
import { MealOptions } from '../entities/MealOptions';

export type IMealOptionsRepository = BaseRepository<MealOptions>;

export class MealOptionsRepository extends BaseRepository<MealOptions> implements IMealOptionsRepository {
  constructor() {
    super(MealOptions);
  }
}
