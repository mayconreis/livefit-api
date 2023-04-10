import { InternalError, ResponseError, Service } from '@src/common';
import { ErrorHelper } from '@src/helpers';
import { NOT_FOUND } from 'http-status';
import { IUserRepository, Users } from '../sequelize';
import { userSerializable } from '../userSerializable';
import { IGetUserService, IUserResponse } from '../interfaces';

export default class GetUserService extends Service implements IGetUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    super();
    this.userRepository = userRepository;
  }

  async execute(userId: number): Promise<IUserResponse> {
    let user: Users | null;

    try {
      user = await this.userRepository.findOne({ where: { id: userId } });
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
