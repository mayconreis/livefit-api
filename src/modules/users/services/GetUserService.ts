import { InternalError, ResponseError, Service } from '@src/common';
import { ErrorHelper } from '@src/helpers';
import { NOT_FOUND } from 'http-status';
import { FindOptions } from 'sequelize';
import { IUserRepository, Users } from '../sequelize';
import { userSerializable } from '../userSerializable';
import { IGetUserService, IUserFilter, IUserResponse } from '../interfaces';
import { profile } from 'winston';

export default class GetUserService extends Service implements IGetUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    super();
    this.userRepository = userRepository;
  }

  async execute(filter: IUserFilter): Promise<IUserResponse> {
    const filters = this.buildFilter(filter);

    const conditions: FindOptions = {};
    conditions.where = {
      ...filters,
    };

    if (filter?.profile) {
      conditions.where.profile = filter.profile;
    }

    let user: Users | null;

    try {
      user = await this.userRepository.findOne(conditions);
    } catch (err) {
      const error = ErrorHelper.ensureError(err);
      throw new InternalError('Unable to find record into database', error);
    }

    if (!user) {
      throw new ResponseError('Usuário não encontrado', NOT_FOUND);
    }

    return userSerializable(user);
  }
}
