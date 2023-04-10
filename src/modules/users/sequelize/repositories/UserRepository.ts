import { IBaseRepository } from '@src/interfaces';
import BaseRepository from '@src/common/BaseRepository';
import { Users } from '../entities/Users';

export type IUserRepository = IBaseRepository<Users>

export class UserRepository extends BaseRepository<Users> implements IUserRepository {
  constructor() {
    super(Users);
  }
}