import { IBaseRepository } from '@src/interfaces';
import BaseRepository from '@src/common/BaseRepository';
import { Routines } from '../entities/Routines';

export type IRoutineRepository = IBaseRepository<Routines>;

export class RoutineRepository extends BaseRepository<Routines> implements IRoutineRepository {
  constructor() {
    super(Routines);
  }
}
