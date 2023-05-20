import { IBaseRepository } from '@src/interfaces';
import BaseRepository from '@src/common/BaseRepository';
import { Solicitations } from '../entities/Solicitations';

export type ISolicitationRepository = IBaseRepository<Solicitations>;

export class SolicitationRepository extends BaseRepository<Solicitations> implements ISolicitationRepository {
  constructor() {
    super(Solicitations);
  }
}
