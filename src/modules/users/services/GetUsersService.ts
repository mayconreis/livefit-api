import { InternalError, Service } from '@src/common';
import { IGetUsersService, IUserFilter, IUserResponse } from '../interfaces';
import { IUserRepository, Users } from '../sequelize';
import { FindOptions } from 'sequelize';
import { profile } from 'winston';
import { ErrorHelper } from '@src/helpers';
import { usersSerializable } from '@src/modules/users/userSerializable';

export default class GetUsersService extends Service implements IGetUsersService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    super();
    this.userRepository = userRepository;
  }

  async execute(filter: IUserFilter): Promise<IUserResponse[]> {
    const filters = this.buildFilter({ ...filter });

    const conditions: FindOptions = {};
    conditions.where = { ...filters };

    if (filter?.profile) {
      conditions.where.profile = filter.profile;
    }

    let users: Users[];

    try {
      users = await this.userRepository.findAll(conditions);
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to find record into database', error);
    }

    return usersSerializable(users);
  }
}
